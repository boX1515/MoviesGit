<?php 
session_start();
/*header('Expires: Mon, 26 Jul 2017 05:00:00 GMT');
header('Content-Type: application/x-www-form-urlencoded');
header('Cache-Control: public, max-age=86400, stale-while-revalidate=604800');
header('Origin: http://localhost');
header_remove("Pragma");*/



$con = mysqli_connect("localhost","zan","123","webpage");
if(!$con)
{
	die('Povezava ni uspela: ' .mysqli_connect_error());
}
$_SESSION['error'] = 0;
if(isset($_GET["a"]))
{
    if($_GET["a"] == "user_add")
    {
        if($_POST["UporIme"] != null && $_POST["password"] != null && $_POST["email_naslov"] != null)
        {
            if(isset($_POST["Ime"]) && $_POST["Ime"] != "")
            {

                $ime = $_POST["Ime"];
                $ime = mysqli_real_escape_string($con,$ime);

            }
            else
            {
                $ime = "";

            }

            if(isset($_POST["Priimek"]) && $_POST["Priimek"] != "")
            {
                $priimek = $_POST["Priimek"];
                $priimek = mysqli_real_escape_string($con,$priimek);

            }
            else
            {
                $priimek = "";

            }
            if(isset($_POST["UporIme"]) && $_POST["UporIme"] != "")
            {
                $upime = $_POST["UporIme"];
                $upime = mysqli_real_escape_string($con,$upime);

            } 

            if(isset($_POST["password"]) && $_POST["password"] != "")
            {
                $geslo = $_POST["password"];
                if(strlen($geslo) >= 5)
                {
                    $geslo = mysqli_real_escape_string($con,$geslo);
                }
                else
                {
                    $_SESSION['error'] = 13;
                    mysqli_close($con);
                    die();
                    header('location: ../registracija.php');

                }
            }
            if(isset($_POST["email_naslov"]) && $_POST["email_naslov"] != "")
            {
                $email = $_POST["email_naslov"];
                if(strpos($email,'@') !== false)
                {
                    $email = mysqli_real_escape_string($con,$email);
                }

            }

            if($upime !== "" && $geslo !== "" && $email !== "")
            {
                if(isset($_SESSION['error']) && $_SESSION['error'] == 0)
                {
                    $result = mysqli_query($con,"SELECT * FROM uporabniki WHERE upime='$upime'");
                    $row = mysqli_fetch_array($result);
                    if($upime == $row['upime'] && $email == $row['email'])
                    {
                        //echo $row['upime'];
                        //echo $row['email'];
                        $_SESSION['error'] = 14;
                        $_SESSION['message'] = "Uporabnik z takšnim email naslovom že obstaja!";
                        header('location: ../registracija.php');
                        mysqli_close($con);
                        
                    }
                    $hashing = hash("md5", $geslo);
                    $st = "";
                    for($i = 0; $i < 10;$i++)
                    {
                        $st = $st . chr(rand(65,90));
                    }
                    /*echo $ime."<br/>";
                    echo $priimek."<br/>";
                    echo $upime."<br/>";
                    echo $geslo."<br/>";
                    echo $hashing."<br/>";
                    echo $email."<br/>";
                    echo $st."<br/>";*/
                    
                    mysqli_query($con,"INSERT INTO uporabniki (ime,priimek,upime,geslo,email,dostop,hash,st) VALUES ('$ime','$priimek','$upime','$hashing','$email',0,'$hashing','$st')");
                    //echo "INSERT INTO uporabniki (ime,priimek,upime,geslo,email,dostop,hash,st) VALUES ('$ime','$priimek','$upime','$geslo','$email',0,'$hashing','$st')";
                    $_SESSION['error'] = 4;
                    mysqli_close($con);
                    header('location: ../index.php');
                }
                else
                {
                    $_SESSION['error'] = 10;
                    header('location: ../registracija.php');
                }
            }
        }
        else
        {
            $_SESSION['error'] = 12;
            header('location: ../registracija.php');
        }
    }
}
else
{
    $_SESSION['error'] = 111;
    header('location: ../registracija.php');
}
