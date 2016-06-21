<?php
session_start();
$con = mysqli_connect("localhost","zan","123","webpage");
if(!$con)
{
	die('Povezava ni uspela: ' .mysqli_connect_error());
}
if(isset($_GET["a"]) && $_GET["a"] === "akt")
{
	if(isset($_GET["st"]))
	{
		$st = $_GET["st"];
		$query = mysqli_query($con,"SELECT * FROM uporabniki WHERE st='$st'");
		$row = mysqli_fetch_array($query);
		if($row['st'] == $st)
		{
			mysqli_query($con,"UPDATE uporabniki SET dostop='1' WHERE st='$st'");
			mysqli_close($con);
			$_SESSION['uporabnik'] = $_row['upime'];
            $_SESSION['error'] = 0;
            header('location: ../local_movies.php');

		}
	}
}

if(isset($_GET["upime"]))
	$upime=$_GET["upime"];
if(isset($_GET["pw"]))
	$geslo = $_POST["pw"];
if(isset($_GET["a"]) && $_GET["a"] === "login")
{
	$upIme = $_POST["upime"];
	$geslo = $_POST["pw"];
	$upIme = mysqli_real_escape_string($con,$upIme);
	$geslo = mysqli_real_escape_string($con,$geslo);
	$result = mysqli_query($con,"SELECT * FROM uporabniki WHERE upime='$_POST[upime]'");
	$row = mysqli_fetch_array($result);
    $stElementov = count($row);
    if($stElementov != 0)
    {
        if($row['dostop'] == 1)
        {
            $hashedPW = hash("md5", $geslo);
            if($hashedPW == $row['hash'])
            {
                if($upIme === $row['upime'])
                {
                    $_SESSION['error'] = 0;
                    $_SESSION['uporabnik'] = $upIme;
                    
                    //echo $_SESSION['cookie_'];
                    if(isset($_POST['flipswitch']))
                    {
                        $cookie_name = "Loged_on";
                        $cookie_value = $row['upime'];
                        
                        setcookie($cookie_name,$cookie_value,time() + (86400 * 30), "/");
                        //echo "Value is: " . $_COOKIE[$cookie_name];
                    }
                    mysqli_close($con);
                    header('location: ../local_movies.php');

                }
                else
                {
                    $_SESSION['error'] = 1;
                    mysqli_close($con);
                    header('location: ../index.php');


                }
            }
            else
            {
                    $_SESSION['error'] = 1;
                    mysqli_close($con);
                    header('location: ../index.php');
            }
        }
        else
        {
            $preverbaGeslo = hash("md5", $geslo);
            if($preverbaGeslo == $row["hash"])
            { 
                //validacija uporabnika ob prvem vpisu
                
                $query = mysqli_query($con,"SELECT * FROM uporabniki WHERE upime='$_POST[upime]'");
                $row = mysqli_fetch_array($query);
                if($row['st'] !== null)
                {
                    mysqli_query($con,"UPDATE uporabniki SET dostop='1' WHERE st='$row[st]'");
                }
                //dodajanje uporabniku pravo geslo
                //mysqli_query($con,"UPDATE uporabniki SET geslo='$geslo' WHERE upime='$upIme'");
                mysqli_close($con);
                $_SESSION['uporabnik'] = $upIme;
                //echo $preverbaGeslo;
                header('location: ../local_movies.php');

            }
            else
            {
                mysqli_close($con);
                $_SESSION['error'] = 3;
                header('location: ../index.php');
            }
        }
    }
    /*else if($row['dostop'] === 0 || $upIme === $row['upime'] && $geslo === $row['geslo'] )
    {

        $row = mysqli_query($con,"SELECT * FROM uporabniki WHERE upime='$upIme'");
        mysqli_close($con);
        $row = mysqli_fetch_array($row);
        $to = $row['email'];
        echo "<head>";
        echo "</head>";
        echo "<body>";
        echo  "Email: $to <br>";
        echo  "Naziv : Aktivacija računa <br>";
        echo  "Spodaj imate link za aktiviranje vašega računa <br> <a href=\"index.php?a=akt&amp;st=".$row['st']."\">Aktivacija računa</a> <br>";
        echo  "From: administrator@test.com <br>";
        echo "</body>";
    }*/
    else if($row['upime'] != $upIme || $upIme == "")
    {
        mysqli_close($con);
        $_SESSION['error']=1;
        header('location: ../index.php');
    }
    

}