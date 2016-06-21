<?php
session_start();
if(isset($_SESSION['error'])) 
{
    if($_SESSION['error'] === 10)
    {
        $message = "Napaka!Preglejte vnose in jih popravite!";
        echo "<script type='text/javascript'>alert('$message');</script>";
    }
    if($_SESSION['error'] === 11)
    {
        $message = "Uporabnik z takim uporabniškim imenom že obstaja!";
        echo "<script type='text/javascript'>alert('$message');</script>";
    }
    if($_SESSION['error'] === 12)
    {
         $message = "Pustili ste prazen vnos! Poskrbite da vnesete v vsa polja!";
        echo "<script type='text/javascript'>alert('$message');</script>";
    }
    if($_SESSION['error'] === 13)
    {
        $message = "Geslo je prekratko! Vsebovati mora vsaj 5 črk!";
        echo "<script type='text/javascript'>alert('$message');</script>";
    }
    if($_SESSION['error'] === 111)
    {
        $message = "Interna napaka! Obvestite administratorja!";
        echo "<script type='text/javascript'>alert('$message');</script>";
    }
    if($_SESSION['error'] === 14)
    {
        $message = $_SESSION['message'];
        echo "<script type='text/javascript'>alert('$message');</script>";
    }
    $_SESSION['error'] = 0;
}
else
{
    $_SESSION['error'] = 0;
}
?>
<!DOCTYPE html>
<html>
    <head>
        <title> Registracija </title>
        <meta charset="UTF-8">
        
        <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ek+Mukta"/>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-beta1/jquery.js"></script>
        <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css"/>
        <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.12.0/jquery.validate.min.js"
type="text/javascript"></script>
        <script type="text/javascript" src="js/reg_preverjanje.js"></script>
        <link rel="stylesheet" type="text/css" href="css/style.css"/>
        
    </head>
    <body>
        <div class="nav-container-top f-nav">
           <div class="logo">
                <img class="logo_img" src="assets/logo.png"/>
                <a href="index.php" class="logo_text">TheMovieDatabase</a>
            </div>
            <div class="nav">
                <div class="clear"></div> 
            </div>
        </div>
        <div id = "reg_user">
            <h2 style="color:white">Registracija<br>
            <h3 style="color:white">Vnesite vaše podatke:</h3>
            <form id="reg_form"action="php/reg_user.php?a=user_add" method="post" >
                <div id="upime">
                    <input id="upime_vnos" class="vnos" type="text"  name="UporIme" placeholder="Uporabniško Ime..." onclick="if(this.placeholder=='Uporabniško Ime...'){this.placeholder=''}" onblur="if(this.placeholder==''){this.placeholder='Uporabniško Ime...'}" type="text" onfocusout="checkUsername(value)"/>
                    <a class="notValid" >&#10003;</a>
                </div>
                <div id="form_reg_seperator">
                </div>
                <div id="email">
                    <input id="email_vnos" class="vnos" type="text"  name="email_naslov" placeholder="Email..." onclick="if(this.placeholder=='Email...'){this.placeholder=''}" onblur="if(this.placeholder==''){this.placeholder='Email...'}" onfocusout=""/>
                    
                </div>
                <div id="form_reg_seperator">
                </div>
                <div id="pw">
                    <input id="pw_vnos" class="vnos" name="password" placeholder="Geslo..." onclick="if(this.placeholder=='Geslo...'){this.placeholder=''}" onblur="if(this.placeholder==''){this.placeholder='Geslo...'}" type="password" onfocusout="isPwValid(value)"/><a class="notValid" >&#10003;</a>
                    
                </div>
                <div id="form_reg_seperator">
                </div>
                <div id="pw2">
                    <input id="pw2_vnos" class="vnos" name="check_password" placeholder="Potrditev gesla..." onclick="if(this.placeholder=='Potrditev gesla...'){this.placeholder=''}" onblur="if(this.placeholder==''){this.placeholder='Potrditev gesla...'}" type="password" onfocusout="checkPasswords(value)"/><a class="notValid" >&#10003;</a>
                    
                </div>
                
                <br>
                <input id="submit_reg"  class="submit_button_reg"  type="submit" value="Pošlji">
           </form>
        </div>
	</body>
<footer>
    <a class="zan">@boX</a>
</footer>
 </html>
