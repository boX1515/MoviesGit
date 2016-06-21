window.onload = function(){
    
    MovieInfo = JSON.parse(localStorage.MovieInfo);
    //console.log(MovieInfo);
    document.querySelector("#movie > source").src = "http://213.143.88.177:1515" +  MovieInfo.ServerLocation;
    var video = document.getElementsByTagName('video')[0];
    var video_ = document.getElementById("movie");
    //console.log(video_);
    var poster = video_.attributes.getNamedItem("poster");
    poster.value ="https://image.tmdb.org/t/p/w300" + MovieInfo.DBposter;
    video_.load();
}

var MovieInfo;


