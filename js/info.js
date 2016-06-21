window.onload = function () 
{
    document.getElementById("movie_info").innerHTML
    var data = JSON.parse(localStorage.MovieInfo);
    //console.log(data);
    innerHtmlOfMovieWrapper = document.getElementById("movie_info").innerHTML;
    movie_id = data.DBid;
    GetImages(function(movie){
        var movie_images = JSON.parse(movie);
        DisplayMovieInfo(data,movie_images);
    });
    
    
}
var innerHtmlOfMovieWrapper;
function CloseSearch()
{
    document.getElementById("movie_search_list").innerHTML = "";
}
function DisplayMovieInfo(data,images)
{
    
    var month = new Array();
        month[0] = "Januar";
        month[1] = "Februar";
        month[2] = "Marec";
        month[3] = "April";
        month[4] = "Maj";
        month[5] = "Junij";
        month[6] = "Julij";
        month[7] = "Avgust";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
    
    
    var date = new Date(data.Info.release_date);
                    var datum = date.getDay();
                    datum += " " + month[date.getMonth()];
                    datum += " " + date.getFullYear();
    
    function MinutesToHours_Minutes (m) {
        var minutes = m % 60;
        var hours = Math.floor(m / 60);

        minutes = (minutes < 10 ? '0' : '') + minutes;
        hours = (hours < 10 ? '' : '0') + hours;

        return hours + 'h ' + minutes + 'min';
    }
    
    function kFormatter(num) {
    return num > 999999 ? (num/1000000).toFixed(1) + 'M' : num
    }
    
    
    var HTMLDom = "";
    HTMLDom += "<div class='poster_wrapper_top'>";
        HTMLDom += "<div class='poster_wrapper_bottom'>";
            HTMLDom += "<img class='image_poster' src='";
            HTMLDom += "https://image.tmdb.org/t/p/w300";
            HTMLDom += data.Info.poster_path;
            HTMLDom += "'></img>";
        HTMLDom += "</div>";
        HTMLDom += "<div class='info_url'>";
            HTMLDom += "<div class='rating_star'>";
                HTMLDom += "<span class='star'>&#9733;</span>";
                HTMLDom += "<a class='vote_average'>" + data.Info.vote_average + "</a>";
                HTMLDom += "<a class='vote_max'>/10</a>";
            HTMLDom += "</div>";
            HTMLDom += "<div class='homepage_url' href='" + data.Info.homepage + "' >";
                HTMLDom += "<img class='url_image' src='../iss/assets/movie_urls/www.png' alt='Domača stran filma'></img>";
                HTMLDom += "<a href='" + data.Info.homepage + "'>Domača Stran</a>";
            HTMLDom += "</div>";
            HTMLDom += "<div class='IMDB_url'>";
                HTMLDom += "<img class='url_image' src='../iss/assets/movie_urls/imdb.png' alt='IMDb'></img>";
                HTMLDom += "<a href='http://www.imdb.com/title/" + data.Info.imdb_id + "'>IMDb</a>";
            HTMLDom += "</div>";
        HTMLDom += "</div>";
    HTMLDom += "</div>";
    HTMLDom += "<div class='title_wrapper_top'>";
        HTMLDom += "<div class='title_wrapper_bottom'>";
            HTMLDom += data.Info.title;
        HTMLDom += "</div>";
        HTMLDom += "<div class='tagline'>";
            HTMLDom += data.Info.tagline;
        HTMLDom += "</div>";
    HTMLDom += "</div>";
    HTMLDom += "<div class='info_wrapper'>";
        HTMLDom += "<div class='info_wrapper_top'>";
            HTMLDom += "<div class='info_wrapper_centered'>";
                HTMLDom += "<div class='info_wrapper_one'>";
                    HTMLDom += "<div class='movie_info_small'>Status: ";
                    HTMLDom += "</div>"
                    HTMLDom += "<div class='json_data'>";
                    HTMLDom += data.Info.status;
                    HTMLDom += "</div>";
                HTMLDom += "</div>";
                HTMLDom += "<div class='info_wrapper_one'>";
                    HTMLDom += "<div class='movie_info_small'>Jezik: ";
                    HTMLDom += "</div>"
                    HTMLDom += "<div class='json_data'>";
                    /*for(var x = 0; x < data.Info.spoken_languages.length;x++)
                        {
                            if(x == data.spoken_languages.length - 1)
                                {
                                    HTMLDom += data.spoken_languages[x].name;
                                }
                            else
                                {
                                    HTMLDom += data.spoken_languages[x].name + ", ";
                                }
                            
                        }*/
                    HTMLDom += "</div>";
                HTMLDom += "</div>";
                HTMLDom += "<div class='info_wrapper_one'>";
                    HTMLDom += "<div class='movie_info_small'>Datum izzida: ";
                    HTMLDom += "</div>"
                    HTMLDom += "<div class='json_data'>";
                    HTMLDom += datum;
                    HTMLDom += "</div>";
                HTMLDom += "</div>";
            HTMLDom += "</div>";
        HTMLDom += "</div>";
    HTMLDom += "<div class='info_wrapper_center'>";
        HTMLDom += "<div class='movie_description'>";
            HTMLDom += "<div class='movie_description_tag'>";
            HTMLDom += "OPIS";
            HTMLDom += "</div>";
            HTMLDom += "<div class='movie_description_info'>";
            HTMLDom += data.Info.overview;
            HTMLDom += "</div>";
        HTMLDom += "</div>";
    HTMLDom += "</div>";
    HTMLDom += "<div class='movie_picture_gallery'>";
        for(var i = 0; i < images.backdrops.length;i++)
        {
            if(i > 2 && i < 6)
            {
                if(images.backdrops[i].file_path == null)
                {
                     HTMLDom += "<img class='movie_info_picture' src='../iss/assets/no_image_available.png'></img>";
                }
                else{
                    HTMLDom += "<img class='movie_info_picture' src='https://image.tmdb.org/t/p/w1920";
                    HTMLDom += images.backdrops[i].file_path;
                    HTMLDom += "'></img>";
                }
                
            }
        }
    HTMLDom += "</div>";
    /*HTMLDom += "<div class='info_wrapper_bottom'>";
        HTMLDom += "<div class='movie_genres'>";
            HTMLDom += "<a>Filmski žanri: </a>";
            HTMLDom += "<a class='movie_genre_data'>";
            for(var i = 0; i < data.DBgenres.length;i++)
                {
                    if( i != data.genres.length -1)
                        {
                            HTMLDom += data.genres[i].name + ", ";
                        }
                    else
                        HTMLDom += data.genres[i].name + "</a>";
                }
        HTMLDom +="</div>";
        /*HTMLDom += "<div class='movie_length'>";
            HTMLDom += "<a>Dolžina filma: </a>";
            HTMLDom += "<a class='movie_length_data'>" + MinutesToHours_Minutes(data.runtime) + "</a>";
        HTMLDom += "</div>";  
    HTMLDom += "</div>";*/
    HTMLDom += "</div>";
    
    document.getElementById("movie_info").innerHTML = HTMLDom;
    document.getElementById("movie_info").innerHTML += innerHtmlOfMovieWrapper;
    var background_image = "https://image.tmdb.org/t/p/w1920";
    background_image += data.Info.backdrop_path;
    document.getElementById("background_movie").style.backgroundImage = "url("+background_image+")";
    
    document.querySelector("#movie > source").src = "http://213.143.88.177:1515" +  data.ServerLocation;
    var video = document.getElementsByTagName('video')[0];
    var video_ = document.getElementById("movie");
    var poster = video_.attributes.getNamedItem("poster");
    poster.value ="https://image.tmdb.org/t/p/w1920" + data.Info.backdrop_path;
    video_.load();
    
}
var movie_id;


function GetImages(callback){
 
    var request = new XMLHttpRequest();

    request.open('GET', 'http://api.themoviedb.org/3/movie/'+movie_id+'/images?api_key=76a03d63be888eba4556bdfa733b4003');

    request.setRequestHeader('Accept', 'application/json');

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        callback(request.responseText);
      }
    };

    request.send();
}

//Iskanje vnešenega filma v search box
function getSearchedItem()
{
    //Iskanje vnešenega filma v search box
    //setup before functions
    var typingTimer;                //timer identifier
    var doneTypingInterval = 1000;  //time in ms, 5 second for example

    //on keyup, start the countdown

    function debounce(fn, duration) {
      var timer;
      return function(){
        clearTimeout(timer);
        timer = setTimeout(fn, duration);
      }
    }

    $(function(){

      $('#search').on('keyup', debounce(function(){
          APISearchMovies();
      }, 500));

    });

    function APISearchMovies()
    {
       search_input_movie = document.getElementsByName("search")[0].value;
        if(search_input_movie != "")
            {
                CallAPIGetById(function(value){
                  var jsonData = JSON.parse(value);
                    //localStorage.setItem("search_items",value);
                    //console.log(jsonData.results.length);
                    var HTMLDomSearch = "<div class='search_list'><ul class='list_search'>";
                    var movie_info = new Array();
                  for(var i = 0; i < jsonData.results.length;i++)
                    {
                        if(i < 5)
                        {
                            HTMLDomSearch += "<li class='search_style_button' onclick='RedirectToInfoPage("+ jsonData.results[i].id+")'><div  class='search_movie_title'>";
                            HTMLDomSearch += jsonData.results[i].title;
                            HTMLDomSearch += "</div>";
                            HTMLDomSearch += "<img src='https://image.tmdb.org/t/p/w150";
                            HTMLDomSearch += jsonData.results[i].poster_path;
                            HTMLDomSearch += "'/>";
                            //HTMLDomSearch += "<div class='search_movie_image'></div>";
                            HTMLDomSearch += "</li>";
                        }

                    }
                    HTMLDomSearch += "<li class='search_exit_button' onclick='CloseSearch()'><a> Zapri</a> </li>";
                    HTMLDomSearch +="</ul></div>"

                    document.getElementById("movie_search_list").innerHTML = HTMLDomSearch;
                });
            }
    }

    var search_input_movie;

    function CallAPIGetById(callback)
    {

        var request = new XMLHttpRequest();

        var url = "http://api.themoviedb.org/3/search/movie?api_key=76a03d63be888eba4556bdfa733b4003&query="+ search_input_movie;
        var encUrl = encodeURI(url);
        //console.log(encUrl);
        request.open('GET', encUrl);

        request.setRequestHeader('Accept', 'application/json');

        request.onreadystatechange = function () {
          if (this.readyState === 4) {
            callback(request.responseText);
          }
        };

        request.send();
    }
}

var search_movie_id = "";
// get searched movie information
//get clicked movie details
function CallAPIGetById(callback)
{
    
    var request = new XMLHttpRequest();

    request.open('GET', 'http://api.themoviedb.org/3/movie/'+ search_movie_id +'?api_key=76a03d63be888eba4556bdfa733b4003');

    request.setRequestHeader('Accept', 'application/json');

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        callback(request.responseText);
      }
    };

    request.send();
}

function RedirectToInfoPage(x){
    //console.log(x)
    search_movie_id = x;
    //console.log(divData);
    
    CallAPIGetById(function(data){
        var jsonData = JSON.parse(data);
        console.log(jsonData);
        //error codes
        if(jsonData.status_code == "34")
            alert(jsonData.status_message);
        if(localStorage.movie_data !== null)
            localStorage.removeItem("movie_data");
        localStorage.setItem("movie_data",data);
        window.location = "../iss/info.php";
    });
    
}