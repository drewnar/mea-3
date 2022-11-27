setTimeout(function () {
  document.getElementById('preloader').remove();
},7000)

Fancybox.bind('.module-gallery a', {
  animated: false,
  dragToClose: false,

  showClass: false,
  hideClass: false,

  closeButton: "top",
  click: "null",

  Image: {
    click: "null",
    wheel: "null",
    zoom: false,
  },

  Thumbs: false,
  Toolbar: false,
});

$(document).ready(function () {
  console.log('ready')

  $('.main-screen__btn').click(function (e) {
    e.preventDefault();
    $('.main-screen__block').slideDown(250);
    $('.main-screen').fadeOut(250, function () {
      $('.header-menu').slideDown(250);
      $('.nav').slideDown(250);
    });
  });
  $('.header-menu__link-back').click(function (e) {
    e.preventDefault();
    $('.header-menu').slideUp(250, function () {
      $('.nav').slideUp(250, function () {
        $('.main-screen').fadeIn(250);
        $('.main-screen__block').fadeIn(250);
      });
    });
  });
  $('.header-menu__link-pdf').click(function (e) {
    e.preventDefault();
    $('.main-pdf').show();
  })
  $('.modal__close-main').click(function (e) {
    e.preventDefault();
    $('.main-pdf').hide();
  })

  $('.js-modal-open').click(function (e) {
    e.preventDefault();
    var modalName = "." + $(this).attr('href').substring(1);
    $('.module__wrapper').css('display', 'none');
    $('.header').hide();
    if ($(this).hasClass('spline-modal')) {
      $(this).closest('.module').find(modalName).addClass('active');
    } else {
      $(this).closest('.module').find(modalName).show();
    }
  });
  $('.js-modal-close').click(function () {
    $('.header').show();
    $('.module__wrapper').css('display', 'flex');
    if ($(this).hasClass('spline-modal')) {
      $(this).closest('.modal').removeClass('active');
    } else {
      $(this).closest('.modal').hide();
    }
  });

  // form and thanks

  var fTarget;
  $('.module-form-submit').click(function (e) {
    e.preventDefault();
    fTarget = $(this).closest('section').attr('id');
    var formTarget = $(this).closest('.module-form__inner');
    var name = formTarget.find('.js-name').val();
    var plz = formTarget.find('.js-plz').val();
    var email = formTarget.find('.js-email').val();
    console.log(formTarget.serialize())
    if (name === "" || plz === "" || email === ""){
      alert('Fill the form fields')
    }else{
      $.ajax({
        type: "POST",
        url: 'kontakt.php',
        data: formTarget.serialize(),
        success: function(data) {
          console.log(data)
          if (data === 'sended'){
            $('.thanks').show();
            formTarget.get(0).reset();
          }
        }
      });
    }
  })
  $('.js-thanks').click(function (e) {
    e.preventDefault();
    $('section#'+fTarget).find('.module-form').find('.js-modal-close').trigger('click');
    $('.thanks').hide();
  })

  // video

  var back = $(".module-nav__back"),
    index_image = $("#index"),
    group_current,
    group_obj,
    can_click = true,
    interval;

  back.click(function (e) {
    e.preventDefault();
    go_video_out();
    group_current = undefined;
  });

  $(window).resize(function () {
    window_width = Math.round($(window).width());
    window_height = Math.round($(window).height());
  }).resize();

  $(".nav__list li").click(function (e) {
    e.preventDefault();
    var self = $(this),
      goto_group = self.index(".nav__list li");
    go_group(goto_group);
  });

  var videos,
    video_in,
    video_out,
    video_obj,
    videos_reverse,
    video_width = 1920,
    video_height = 1080,
    video_q = video_height / video_width;

  function videos_init() {
    videos = $("#videos").find("video");
    videos_reverse = $("#videos-reverse").find("video").hide();

    videos.bind('ended', on_video_in_ended);
    videos_reverse.bind('ended', on_video_out_ended);

    $(window).resize(videos_resize).resize();
  }

  function videos_resize() {
    var w = window_width,
      h = window_width * video_q,
      css;

    if (h < window_height) {
      h = window_height;
      w = h / video_q;
    }

    css = {
      width: w,
      height: h,
      left: -(w - window_width) / 2,
      top: -(h - window_height) / 2
    };

    videos.css(css);
    videos_reverse.css(css);
    index_image.find("img").css(css);
  }

  function go_group(goto_group) {
    if (typeof group_current != "undefined") {
      go_video_out(goto_group);
    } else {
      go_video_in(goto_group);
    }
  }

  function go_video_out(goto_group) {
    can_click = false;

    video_out = videos_reverse.eq(group_current);
    video_obj = video_out.get(0);
    video_out.show();

    group_current = goto_group;

    if (typeof goto_group != "undefined") {
      videos.eq(goto_group).show();
    }

    $(".module:visible").stop(true).fadeOut(1000, function () {
      video_obj.play();
    });
  }

  function on_video_out_ended() {
    index_image.stop(true).fadeIn("fast", function () {
      can_click = true;

      video_obj = video_out.get(0);
      video_obj.currentTime = .1;

      interval = setInterval(function () {
        if (video_obj.currentTime.toFixed(1) == .1) {
          can_click = true;

          video_out.hide();
          video_obj.pause();

          if (typeof group_current != "undefined") {
            go_video_in(group_current);
          }

          clearInterval(interval);
        }
      }, 100);

      $('.header-menu').fadeIn(250);
      $('.nav').slideDown(250);
    });
  }

  function go_video_in(goto_group) {
    can_click = false;

    video_in = videos.eq(goto_group);
    video_obj = video_in.get(0);

    videos.not(goto_group).hide();
    video_in.show();

    setTimeout(function () {
      index_image.stop(true).fadeOut("fast", function () {
        video_obj.play();
      });
    }, 300);

    group_current = goto_group;

    $('.header-menu').fadeOut(250);
    $('.nav').slideUp(250);
  }

  function on_video_in_ended() {
    video_obj = this;
    group_obj = $(".module:eq(" + group_current + ")");

    $(".module:not(:eq(" + group_current + "))").removeClass('active');

    group_obj.stop(true).addClass('active').fadeIn(1000, function () {
      videos_reverse.not(group_current).hide();
      videos_reverse.eq(group_current).show();

      video_obj.currentTime = .1;

      interval = setInterval(function () {
        if (video_obj.currentTime.toFixed(1) == .1) {
          can_click = true;

          video_in.hide();
          video_obj.pause();

          clearInterval(interval);
        }
      }, 100);
    });
  }

  videos_init();

})
