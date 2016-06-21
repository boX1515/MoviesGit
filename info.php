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
        <link href="http://vjs.zencdn.net/5.9.2/video-js.css" rel="stylesheet">
        <script type="text/javascript" src="js/info.js"></script>
        
    </head>
    <body>
        <?php
            function odjava()
            {
                session_destroy();
                header('location:index.php');
            }
            if(isset($_GET["odj"]))
            {
               odjava();
            }
            /*if(isset($_GET['profil']))
            {
                profil();
            }*/
        ?>
        
        <div>
            <div class="nav-container-top f-nav">
               <div class="logo">
                    <img class="logo_img" src="assets/logo.png"/>
                    <a href="local_movies.php" class="logo_text">TheMovieDatabase</a>
                </div>
                <div id="wrap">
                  <form action="" autocomplete="off">
                     <input id="search" class="search2" name="search" onkeyup="getSearchedItem()" type="text" placeholder="Vnesite naslov filma" >
                      <input id="search_submit" class="search_submit" value="Rechercher" type="submit">
                  </form>
                    <div id="movie_search_list"></div>
                </div>
                <div class="nav">
                    <ul>
                        <li><a href="local_movies.php" class="links">DOMOV</a></li>
                        <li><a href="info.php?odj=true" class="links">ODJAVA</a></li>
                    </ul>
                    
                    <!--Clear floating div -->
                    <div class="clear"></div> 
                </div>
            </div>
        </div>
        
            <div class="background_movie_image" id="background_movie"> </div>
            <div id="movie_info" class="movie_top_wrapper">
                <div class="video_div" > 
                    <video id="movie" controls=true poster="" onclick="this.play();" data-setup="{}">
                        <source src="" type="video/mp4">
                    Your browser does not support the video tag.
                    </video>
                </div>
            </div>
    </body>
    <footer>
       <div>
            <a class="downloads" href="downloads/android/movieDb.apk">Android APK</a>
            <a class="zan">@boX</a>
            <a class="logedOn">Pozdravljen: <?php echo $user;?></a>
        </div>
    </footer>
</html>