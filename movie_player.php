<?php
session_start();

$user = "";
if(isset($_SESSION['uporabnik']) && $_SESSION['uporabnik'] != "")
{
    $user = $_SESSION['uporabnik'];
}
else
{
    $_SESSION['error'] = 2;
    header('location:index.php');
}
?>
<!DOCTYPE html>
<html>
    <head>
        <title> Home </title>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ek+Mukta">
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.7.min.js"></script>
        <script type="text/javascript" src="js/video.js"></script>
        <script type="text/javascript" src="js/search.js"></script>
    </head>
    <body>
        <?php
            function odjava()
            {
                session_destroy();
                header('location:index.php');
            }
            function profil()
            {
                header('location:profil.php');
            }
            if(isset($_GET["odj"]))
            {
               odjava();
            }
           
        ?>
        
        <div>
            <div class="nav-container-top f-nav">
               <div class="logo">
                    <img class="logo_img" src="assets/logo.png"/>
                    <a href="local_movies.php" class="logo_text">TheMovieDatabase</a>
                </div>
                <div id="wrap">
                  <form id="form_search" action="" autocomplete="off">
                     <input id="search" class="search2" onkeyup="getSearchedItem()" name="search" type="text" placeholder="Vnesite naslov filma..">
                      <input id="search_submit" class="search_submit" value="Rechercher" type="submit">
                  </form>
                  <div id="movie_search_list"></div>
                </div>
               
                <div class="nav">
                    <ul>
                        <li><a href="local_movies.php" class="links">DOMOV</a></li>
                        <li><a href="movie_player.php?odj=true" class="links">ODJAVA</a></li>
                        <!--<li><a href="local_movies.php" class="links">LOCAL DB</a></li>-->
                    </ul>
                    <!--Clear floating div -->
                    <div class="clear"></div> 
                </div>
            </div>
        </div>
        <div class="video_wrap">
            <div class="video_info_wrap">
                <div class="video_info_title_wrap">

                </div>
            </div>
            <div class="video_div"> 
                <video id="movie" controls=true poster="">
                    <source src="" type="video/mp4"></source>
                Your browser does not support the video tag.
                </video>
            </div>
        </div>
    </body>
        
    <footer>
        <div>
            <a class="downloads" href="downloads/android/movieDb.apk">Android APK</a>
        </div>
        <a class="zan">@boX</a>
        <a class="logedOn">Pozdravljen: <?php echo $user;?></a>
    </footer>
</html>