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
                CallAPIGetByString(function(value){
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

    function CallAPIGetByString(callback)
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

function CloseSearch()
{
    document.getElementById("movie_search_list").innerHTML = "";
}

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