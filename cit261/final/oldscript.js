var videos = document.querySelectorAll("video");
var learnbuttons = document.querySelectorAll("p[data-action='learn']");
var watchbuttons = document.querySelectorAll("p[data-action='watch']");
var favoritebuttons = document.querySelectorAll("p[data-action='favorite']");
var movies = [{
    name: "dayofresurrection",
    poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMGU2NzI0Y2UtZmY0NS00NTgxLWJmZGQtM2YyNmVjMzY0YzU1XkEyXkFqcGdeQXVyNDYzNTI2ODc@._V1_SY1000_CR0,0,650,1000_AL_.jpg",
    video: "https://ia800501.us.archive.org/27/items/VirusFukkatsuNoHi1980/Virus_Fukkatsu_no_hi.mp4",
    genre: "SciFi",
    id: "tt0080768"
}, {
    name: "phantomfromspace",
    poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUyMDU0Nzc1NF5BMl5BanBnXkFtZTgwMzc3MDQ1MjE@._V1_.jpg",
    video:"https://ia802308.us.archive.org/10/items/Phantom_From_Space/Phantom_From_Space_512kb.mp4",
    genre: "SciFi",
    id: "tt0046186"
}, {
    name: "werewolfofwashington",
    poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BYWMzM2U3NDItNzQ5Yy00NjgxLThiNTEtZWU1OTgwYzdjNDZmXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
   genre:"blaxploitation",
 video:"https://ia800300.us.archive.org/18/items/Werewolf_of_Washington/Werewolf_of_Washington_512kb.mp4",
    id: "tt0070908"
}];

for (var i = 0; i < learnbuttons.length; i++) {
    if (!learnbuttons[i].dataset.listener) {
        learnbuttons[i].addEventListener('click', function (event) {
            learn(this.dataset.movie);
        }, false);
        learnbuttons[i].dataset.listener = true;
    }
}
for (var i = 0; i < watchbuttons.length; i++) {
    if (!watchbuttons[i].dataset.listener) {
        watchbuttons[i].addEventListener('click', function (event) {
            watch(this.dataset.movie);
        }, false);
        watchbuttons[i].dataset.listener = true;
    }
}
for (var i = 0; i < favoritebuttons.length; i++) {
    var moviename = favoritebuttons[i].dataset.movie;
    if (localStorage.getItem(moviename) && typeof (Storage !== "undefined")) {
        console.log(localStorage.getItem(moviename))
        favoritebuttons[i].dataset.favorited = localStorage.getItem(moviename);
        if (favoritebuttons[i].dataset.favorited === "true") {
            favoritebuttons[i].innerHTML = "★";
        } else {
            favoritebuttons[i].innerHTML = "☆";
        }
    }

    if (!favoritebuttons[i].dataset.listener) {
        favoritebuttons[i].addEventListener('click', function (event) {
            favorite(this);
        }, false);
        favoritebuttons[i].dataset.listener = true;
    }
}

// Passes the element instead of the movie name, because I'm going to save
// some crap to local storage.
function favorite(el) {
    if (typeof (Storage) !== "undefined") {
        console.log(localStorage.getItem(el.dataset.movie));
    }

    var movie = el.dataset.movie;
    if (localStorage.getItem(el.dataset.movie) === "true") {
        console.log("it is true, turning to false");
        el.innerHTML = "☆";
        el.dataset.favorited = false;
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem(el.dataset.movie, false);
        }
    } else {
        el.innerHTML = "★";
        el.dataset.favorited = true;
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem(el.dataset.movie, true);
        }
    }

    // make or edit the cookie to mark that this movie is a favorite.

    console.log("favorite", movie);
}

function watch(movie) {
    // Loop through the movie list and unhide the movie you want to watch.
    for (var i = 0; i < videos.length; i++) {
        console.log(videos[i]);
        if (videos[i].dataset.movie == movie) {
            videos[i].classList.remove("hidden");
        } else {
            if (!videos[i].classList.contains("hidden")) {
                videos[i].classList.add("hidden");
            }
        }
    }
}

function learn(movie) {
    // Clear out the popup modal
    var popup = document.querySelector("#popup");
    popup.querySelector("h2").innerHTML = "LOADING . . . ";
    popup.querySelector("#desc").innerHTML = "";
    popup.querySelector("#starring").innerHTML = "";

    // Loop through the movies and when it makes a hit, do the API call
    // This isn't best practice, it's just a quick and easy way to do
    // it for the purposes of this assignment.
    for (var i = 0; i < movies.length; i++) {
        if (movie == movies[i].name) {
            movie = movies[i].id;
            var moviedata = "https://www.theimdbapi.org/api/movie?movie_id=" + movie;
            var movieclient = new XMLHttpRequest();
            movieclient.open('GET', moviedata);
            movieclient.onreadystatechange = function () {
               // Wait for the right state change.
                if (movieclient.readyState == 4 && movieclient.status == 200) {
                     // Fill up the popup with movie info.
                    var data = JSON.parse(movieclient.responseText);
                    popup.querySelector("h2").innerHTML = data.title;
                    popup.querySelector("#desc").innerHTML = "<em><strong>About: </em></strong>" + data.storyline;
                    popup.querySelector("#starring").innerHTML = "<em><strong>Starring: </em></strong>" + data.stars;
                }
            }
            movieclient.send();
        }
    }
}
