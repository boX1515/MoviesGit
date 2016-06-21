

window.onload = function(){
    //IsMobile();
    GetGenres();
    
}


var genresJson;
var movieJson;


function GetGenres(){
    CallAPIGenres(function(data){
        genresJson = JSON.parse(data);
        console.log(genresJson);
        GetMovieData();
    });
}
function GetMovieData(){
    CallAPI(function(data){
        movieJson = JSON.parse(data);
        console.log(movieJson);
        var HtmlDOM = "";
        
        for(var i = 0; i < movieJson.data.length;i++)
            {
                var CurrentItemDOM = "";
                CurrentItemDOM += HTMLDomEdit(movieJson.data[i]);
                //console.log(CurrentItemDOM + "\n");
                HtmlDOM += CurrentItemDOM;
            }
        document.getElementById("wrap_movie_list").innerHTML = HtmlDOM;
         
    });
}

function HTMLDomEdit(movieInfo)
{
    
    var HTMLDom = "";
    var MovieGenre = "";
    var HTMLDivEndTag = "</div>";
    for(var i = 0; i < movieInfo.DBgenres.length;i++)
    {
        for(var x = 0; x < genresJson.genres.length;x++)
            {
                if(genresJson.genres[x].id == movieInfo.DBgenres[i])
                    {
                        if(genresJson.genres[x].name != undefined)
                            {
                                if(movieInfo.DBgenres.length == 1)
                                    {
                                        MovieGenre += genresJson.genres[x].name;
                                        break;
                                    }
                                else
                                    {
                                        if(i == 0)
                                            {
                                                MovieGenre += genresJson.genres[x].name + " / ";
                                                break;
                                            }
                                        else if( i > 0 && i < 2)
                                            {
                                                MovieGenre += genresJson.genres[x].name;
                                                break;
                                            }
                                    }
                            }
                    }
            }
    }     
    HTMLDom += "<div class='movie_info_div' onclick='displayInfo(this)'>";
        HTMLDom += "<div class='local_movie_wrap' alt='movie_'>";
            if(movieInfo.DBposter != undefined)
                {
                     HTMLDom += "<div class='local_movie_DBposter_wrap'><img class='local_movie_poster_img' src='https://image.tmdb.org/t/p/w300" + movieInfo.DBposter + "'/>";
                     HTMLDom += HTMLDivEndTag;
                }
            else
                {
                    HTMLDom += "<div class='local_movie_DBposter_wrap'><img class='local_movie_poster_img' src=''/>";
                    HTMLDom += HTMLDivEndTag;
                }
            HTMLDom += "<div class='local_movie_DBtitle_wrap'><a>"+ movieInfo.DBTitle +"</a>";
            HTMLDom += HTMLDivEndTag;
            HTMLDom += "<div class='local_movie_genre_wrap'><a>" + MovieGenre + "</a>";
            HTMLDom += HTMLDivEndTag;
            HTMLDom += "<div class='local_movie_DBid_hidden_wrap'><a>"+ movieInfo.DBid+ "</a>";
            HTMLDom += HTMLDivEndTag;
            HTMLDom += "<div class='local_movie_ServerLocation_hidden_wrap' alt='"+movieInfo.ServerLocation+"'>"; 
           HTMLDom += HTMLDivEndTag;
           
        HTMLDom += HTMLDivEndTag;
    HTMLDom += "</div>";
    return HTMLDom;
}
function CallAPI(callback)
    {
        var request = new XMLHttpRequest();

        request.open('GET', '\json\\data.json');

        request.setRequestHeader('Accept', 'application/json');

        request.onreadystatechange = function () {
          if (this.readyState === 4) {
            callback(request.responseText);
          }
        };

        request.send();

    }

function CallAPIGenres(callback)
    {
        var request = new XMLHttpRequest();

        request.open('GET', '\json\\genres.json');

        request.setRequestHeader('Accept', 'application/json');

        request.onreadystatechange = function () {
          if (this.readyState === 4) {
            callback(request.responseText);
          }
        };

        request.send();

    }

function displayInfo(x){
    var childItems = x.childNodes[0];
    //var item = childItems.childNodes[3].getAttribute("alt");
    var item = childItems.childNodes[3];
    for(var i = 0; i < movieJson.data.length;i++)
        {
            if(movieJson.data[i].DBid == item.innerText)
                {
                    console.log(movieJson.data[i]);
                    var jsonMovie = JSON.stringify(movieJson.data[i]);
                    if(localStorage.MovieInfo !== null)
                        {
                            localStorage.removeItem("MovieInfo");
                        }
                    localStorage.setItem("MovieInfo",jsonMovie);
                    window.location = "../iss/info.php";
                    //window.location = "../iss/movie_player.php";
                }
        }
    
    
    
}

