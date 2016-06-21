
window.onload = function(){
    GetItemsFromApi();
}

function CloseSearch()
{
    document.getElementById("movie_search_list").innerHTML = "";
}

//get popular movies
function CallAPI(callback)
{
    var request = new XMLHttpRequest();

    request.open('GET', 'http://api.themoviedb.org/3/movie/popular?api_key=76a03d63be888eba4556bdfa733b4003');

    request.setRequestHeader('Accept', 'application/json');

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        callback(request.responseText);
      }
    };

    request.send();
    
}
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

function GetItemsFromApi()
{ 
    CallAPI(function(data){
        //console.log(data);
		var jsonData = JSON.parse(data);
		
		//console.log(jsonData);
        
        var titles = "<div id='movie/popular'>"
		titles += "<table class='table_popular_movies'>";
		var data = "";
        
        var titles2 = "<div id='movie/popular'>"
		titles2 += "<table class='table_first_five'>";
        var data2 = "";
        
        var stVrstic = 0;
        var background_image = "https://image.tmdb.org/t/p/w1920";
        //document.getElementById("background_image_movies").style.backgroundImage = "url(assets/bckgrd_top.jpg)";
		for(var i = 0; i < jsonData.results.length;i++)
		{
            
			//console.log(jsonData.results[i].title);
            if(i == 0){
                background_image += jsonData.results[i].backdrop_path;
                //console.log(background_image);
                //$("#background_image_movies").attr("src", background_image);
                document.getElementById("background_image_movies").style.backgroundImage = " url("+background_image+")";   
            }
            if(i <= 5) // get first 5 movies and returns them in a special box!
            {
                //var direction = x < 200 ? 1 : -1;
                /*var first = stVrstic === 0 ? "<tr>" : "";
                data2 += first;*/
                    
                if(stVrstic === 0) 
                {
                    data2 += "<tr>";
                }
                data2 += "<td>";
                    data2 += "<div class='movie_five_info' onclick='displayInfo(this)' id='movie_information'>";
                        data2 += "<div class='movie_id_hidden' id='movie_id' alt='"+jsonData.results[i].id+"'>" + jsonData.results[i].id + "</div>";
                        data2 += "<div class='poster_five_info' id='poster'>";
                            data2 += "<img class='movie_five_poster_img' src='";
                            data2 += "https://image.tmdb.org/t/p/w300";
                            data2 += jsonData.results[i].poster_path;
                            data2 += "'></img>";
                        data2 += "</div>";
                        data2 += "<div class='movie_five_title' id='title'>";

                        if(jsonData.results[i].title.length > 10){
                            data2 +="<div class='less'>"
                            data2 += jsonData.results[i].title;
                            data2 += "</div>";
                        }
                        else
                        {
                            data2 += jsonData.results[i].title;
                        }

                        data2 += "</div>";
                        data2 += "<div class='date_big' id='date_of_movie'>";
                        //console.log(jsonData.results[i].release_date);
                        var date = new Date(jsonData.results[i].release_date);
                        //console.log(date);
                        data2 += date.getFullYear();
                        data2 += "</div>";
                   
                data2 += "</td>";

                if(stVrstic == 4)
                {
                    data2 += "</tr>";
                    data2 += "</table>";
                    data2 += "</div>";
                    titles2 += data2;
                    document.getElementById("first_five").innerHTML = titles2;
                    stVrstic = 0;
                }
                else if(stVrstic != 4){
                    stVrstic++;
                }
                 
              
            }
            
            else if(i > 5)
            {
                if(i == 5)
                {
                    stVrstic = 0;
                }
                
                if(stVrstic === 0)
                {
                    stVrstic++;
                    data += "<tr>";
                }
            
            
                data += "<td>";

                data += "<div class='movie_info' onclick='displayInfo(this)' id='movie_information'>";
                data += "<div class='movie_id_hidden' id='movie_id' alt='"+jsonData.results[i].id+"'>" + jsonData.results[i].id + "</div>";
                data += "<div class='poster_info' id='poster'>";
                data += "<img class='movie_poster_img' src='";

                data += "https://image.tmdb.org/t/p/w150";
                data += jsonData.results[i].poster_path;
                data += "'></img>";
                data += "</div>";
                data += "<div class='movie_title' id='title'>";

                if(jsonData.results[i].title.length > 10){
                    data +="<div class='less'>"
                    data += jsonData.results[i].title;
                    data += "</div>";
                }
                else
                {
                    data += jsonData.results[i].title;
                }

                data += "</div>";
                data += "<div class='date_small' id='date_of_movie'>";
                var date = new Date(jsonData.results[i].release_date);
                //console.log(date.getFullYear);
                data += date.getFullYear();
                data += "</div>";
                data += "</td>";

                if(stVrstic === 4)
                    {
                        //console.log(stVrstic);
                        data += "</tr>";
                        stVrstic = 0;
                    }
                else if(stVrstic != 4)
                    {
                        stVrstic++;
                        
                    }

                //console.log(i);
                if(i == jsonData.results.length-1)
                {
                    data += "</div>";
                    data += "</table>";
                    data += "</div>";
                    titles += data;
                }
            }
            
            
		}
        titles += "</table>";
		document.getElementById("elements").innerHTML = titles;
        document.getElementById("pages").innerHTML = "<a class='currentPage'>" +jsonData.page + "</a><a class='divider'> / </a><a class='allPages'>"+ jsonData.total_pages + "</a>"; 
	});
}

var search_movie_id = "";

function displayInfo(x){
    //console.log(x)
    search_movie_id = x.childNodes[0].getAttribute("alt");
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






