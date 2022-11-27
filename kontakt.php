<?php
  
        if($_POST) {
      
						$AUFGELEGT = "";
						$Hakenschraube = "";
						$Hitzestaublech_2 = "";
						$Regalfachtrenner = "";      
            $AUFGELEGT_Firma = "";
            $AUFGELEGT_Name = "";
            $AUFGELEGT_Adresse = "";
            $AUFGELEGT_PLZOrt = "";
            $AUFGELEGT_Telefon = "";
            $AUFGELEGT_Email = "";
            $MEAMODUL ="";
            $REGALROSTE_Eingelegt ="";
            $MEASTEP_Treppenbausatz ="";
            $MEA_Dienstleistungen ="";
            $email_body = "<div>";
              
            if(isset($_POST['AUFGELEGT_Firma'])) {
                $AUFGELEGT_Firma = filter_var($_POST['AUFGELEGT_Firma'], FILTER_SANITIZE_STRING);
                $email_body .= "<div><label><b>Firma:</b></label>&nbsp;<span>".$AUFGELEGT_Firma."</span></div>";
            }
            if(isset($_POST['AUFGELEGT_Name'])) {
                $AUFGELEGT_Name = filter_var($_POST['AUFGELEGT_Name'], FILTER_SANITIZE_STRING);
                $email_body .= "<div><label><b>Name:</b></label>&nbsp;<span>".$AUFGELEGT_Name."</span></div>";
            }
            if(isset($_POST['AUFGELEGT_Adresse'])) {
                $AUFGELEGT_Adresse = filter_var($_POST['AUFGELEGT_Adresse'], FILTER_SANITIZE_STRING);
                $email_body .= "<div><label><b>Adresse:</b></label>&nbsp;<span>".$AUFGELEGT_Adresse."</span></div>";
            }
            if(isset($_POST['AUFGELEGT_PLZOrt'])) {
                $AUFGELEGT_PLZOrt = filter_var($_POST['AUFGELEGT_PLZOrt'], FILTER_SANITIZE_STRING);
                $email_body .= "<div><label><b>PLZ/Ort:</b></label>&nbsp;<span>".$AUFGELEGT_PLZOrt."</span></div>";
            }
            if(isset($_POST['AUFGELEGT_Telefon'])) {
                $AUFGELEGT_Telefon = filter_var($_POST['AUFGELEGT_Telefon'], FILTER_SANITIZE_STRING);
                $email_body .= "<div><label><b>Telefon:</b></label>&nbsp;<span>".$AUFGELEGT_Telefon."</span></div>";
            }
            if(isset($_POST['AUFGELEGT_Email'])) {
                $AUFGELEGT_Email = str_replace(array("\r", "\n", "%0a", "%0d"), '', $_POST['AUFGELEGT_Email']);
                $AUFGELEGT_Email = filter_var($AUFGELEGT_Email, FILTER_VALIDATE_EMAIL);
                $email_body .= "<div><label><b>E-Mail:</b></label>&nbsp;<span>".$AUFGELEGT_Email."</span></div>";
            }

                $email_body .= "<div><label><b><br>Bitte um Informationen zu</b></label></div>";
                $email_body .= "<div><span>REGALROSTE AUFGELEGT</span></div>";

            if(isset($_POST['Hakenschraube'])) {
                $email_body .= "<div><span>Hakenschraube</span></div>";
            }
            if(isset($_POST['Hitzestaublech_2'])) {
                $email_body .= "<div><span>Hitzestaublech</span></div>";
            }
            if(isset($_POST['Regalfachtrenner'])) {
                $email_body .= "<div><span>Regalfachtrenner</span></div>";
            }


            $email_body .= "<div><label><b><br>Bitte um weitere Informationen</b></label></div>";
     
            if(isset($_POST['MEAMODUL'])) {
                $email_body .= "<div><span>MEA-Modul</span></div>";
            }
            if(isset($_POST['REGALROSTE_Eingelegt'])) {
                $email_body .= "<div><span>Regalroste eingelegt</span></div>";
            }
            if(isset($_POST['MEASTEP_Treppenbausatz'])) {
                $email_body .= "<div><span>MEASTEP Treppenbausatz</span></div>";
            }
            if(isset($_POST['MEA_Dienstleistungen'])) {
                $email_body .= "<div><span>MEA-Dienstleistungen</span></div>";
            }
            
            
            $recipient ="mg@gz-media.de";       
            $email_title ="Info-Anforderung";     
            $email_body .= "</div>";
         
            $headers  = 'MIME-Version: 1.0' . "\r\n"
            .'Content-type: text/html; charset=utf-8' . "\r\n"
            .'From: ' . $AUFGELEGT_Email . "\r\n";
              
            if(mail($recipient, $email_title, $email_body, $headers)) {
                echo "sended";
            } else {
                echo 'failed';
            }
              
        } else {
            echo '<p>shit happens</p>';
        }
        ?>