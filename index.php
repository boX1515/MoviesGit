<?php 
session_start();
if(isset($_SESSION['error'])) 
{
    if($_SESSION['error'] === 1)
    {
        $message = "Napačno uporabniško ime / geslo , poskusite ponovno!";
        echo "<script type='text/javascript'>alert('$message');</script>";
    }
    if($_SESSION['error'] === 2)
    {
        $message = "Najprej se morate prijaviti!";
        //echo "<script type='text/javascript'>alert('$message');</script>";
    }
    if($_SESSION['error'] === 3)
    {
        $message = "Napaka pri preverjanju gesla! Kontaktirajte odgovornega!";
        echo "<script type='text/javascript'>alert('$message');</script>";
    }
    if($_SESSION['error'] === 4)
    {
        $message = "Sedaj se lahko prijavite"; /*nato se vam bo odprla stran za validacijo vašega računa!*/
        echo "<script type='text/javascript'>alert('$message');</script>";
    }
    $_SESSION['error'] = 0;
}
else
{
    $_SESSION['error'] = 0;
}
if(isset($_SESSION['uporabnik']))
{
    header('location:local_movies.php');
    //če hočemo da uporabnik ne hodi nazaj in da ga avtomatsko logina
}
?> 
<!DOCTYPE html>
<html>
    <head>
        <title> Prijava </title>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ek+Mukta">
        <!--username = admin , geslo = 123456789 -->
    </head>
    <body>
        <div class="nav-container-top f-nav">
           <div class="logo">
                <img  class="logo_img" src="assets/logo.png"/>
                <a href="index.php" class="logo_text">TheMovieDatabase</a>
            </div>
            <div class="nav">
                <div class="clear"></div> 
            </div>
        </div>
        <div id="main">
            <div id = "login">
                <h2 style="color:white">Pozdravljeni<br>
                    <h3 style="color:white">Za začetek vnesite vaše uporabniško ime in geslo:</h3>
                    <form action="php/login.php?a=login" method="post">
                         <input class="input_login" name="upime" placeholder="Uporabnik..."
                                       onclick="if(this.placeholder=='Uporabnik...'){this.placeholder=''}"
                                       onblur="if(this.placeholder==''){this.placeholder='Uporabnik...'}" type="text">
                            
                        <input class="input_login" type="password" placeholder="Geslo..." name="pw" onclick="if(this.placeholder=='Geslo...'){this.placeholder=''}"
                                       onblur="if(this.placeholder==''){this.placeholder='Geslo...'}">
                            
                        
                        <input id="gumb" class="submit_button" type="submit" value="Prijava">
                        <h3 style="color:white">Če želite da se naslednjič avtomatsko prijavite nastavite gumb na On</h3>
                        <div class="flipswitch">
                        <input type="checkbox" name="flipswitch" class="flipswitch-cb" id="fs">
                            <label class="flipswitch-label" for="fs">
                                <div class="flipswitch-inner"></div>
                                <div class="flipswitch-switch"></div>
                            </label>
                        </div>
                   </form>
                    
                </div>
                <hr class="ver-line"></hr>
                <div id="registration">
                    <div>
                        <h3 style="color:white">Še nimate računa? <br>Kliknite na gumb Registracija. </h3>
                        <button id="gumb" type="registracija" value="registracija" onclick="location.href='registracija.php'">Registracija</button>
                    </div>
                </div>
            
        </div>
	</body>
    <footer>
         <div>
            <a class="downloads" href="downloads/android/movieDb.apk">Android APK</a>
            <a class="zan">@boX</a>
        </div>
    </footer>
 </html>
