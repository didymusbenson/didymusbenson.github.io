// Build the array of movie objects
function make_movies() {
    var movies = [{
    name: "dayofresurrection",
        title:"Day of Resurrection",
    poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMGU2NzI0Y2UtZmY0NS00NTgxLWJmZGQtM2YyNmVjMzY0YzU1XkEyXkFqcGdeQXVyNDYzNTI2ODc@._V1_SY1000_CR0,0,650,1000_AL_.jpg",
    video: "https://ia800501.us.archive.org/27/items/VirusFukkatsuNoHi1980/Virus_Fukkatsu_no_hi.mp4",
    genre: "SciFi",
    id: "tt0080768"
}, {
    name: "phantomfromspace",
    title:"Phantom From Space",
    poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUyMDU0Nzc1NF5BMl5BanBnXkFtZTgwMzc3MDQ1MjE@._V1_.jpg",
    video:"https://ia802308.us.archive.org/10/items/Phantom_From_Space/Phantom_From_Space_512kb.mp4",
    genre: "SciFi",
    id: "tt0046186"
}, {
    name: "werewolfofwashington",
    title:"Werewolf of Washington",
    poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BYWMzM2U3NDItNzQ5Yy00NjgxLThiNTEtZWU1OTgwYzdjNDZmXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_CR0,0,666,1000_AL_.jpg",
   genre:"blaxploitation",
 video:"https://ia800300.us.archive.org/18/items/Werewolf_of_Washington/Werewolf_of_Washington_512kb.mp4",
    id: "tt0070908"
}];
    return movies;
}

// Add the movies to the page for browsing
function make_ui(movies) {
    // Add a card for every movie
    movies.forEach(function (movie) {
        var stringified_movie = JSON.stringify(movie).replace(/\"/g, "'");
        console.log(stringified_movie);
        console.log(movie.genre);
        var cards = document.querySelector("." + movie.genre );
        cards.innerHTML += "<div class='card'><div class='card-img'><img src='" + movie.poster + "'></div><div class='card-title'><h3>" + movie.title + "</h3></div><div class='card-display'><p data-movie='" + movie.id + "' data-action='learn'><a href='#popup'>?</a></p><p data-movie=\"" + stringified_movie + "\" data-action='watch'>▶</p><p data-movie='" + movie.id + "' data-favorited='false'>☆</p></div></div>";
    });

    /****************************************************************************************
     *    <div class="card">
     *        <div class="card-img">
     *            <img src="movie.poster">
     *        </div>
     *        <div class="card-title">
     *            <h3>movie.title</h3>
     *        </div>
     *        <div class="card-display">
     *            <p data-movie="movie.id" data-action="learn"><a href="#popup">?</a></p>
     *            <p data-movie="STRINGIFIED MOVIE" data-action="watch">▶</p>
     *            <p data-movie="movie.id" data-action="favorite" data-favorited="false">☆</p>
     *        </div>
     *    </div>
     ********************************************************************************************/
    // MAYBE: add tabs for genres and a tab for favorites.
    // MAYBE: add sorting (if not tabs) and a way to quickly grab favorites
    make_listeners();
}



// Create click listeners for the "watch", "learn", and "play" buttons.
function make_listeners() {
    // get buttons
    var learnbuttons = document.querySelectorAll("p[data-action='learn']");
    var watchbuttons = document.querySelectorAll("p[data-action='watch']");
    var favoritebuttons = document.querySelectorAll("p[data-action='favorite']");
    //set up learn buttons
    for (var i = 0; i < learnbuttons.length; i++) {
        if (!learnbuttons[i].dataset.listener) {
            learnbuttons[i].addEventListener('click', function (event) {
                learn(this.dataset.movie);
            }, false);
            learnbuttons[i].dataset.listener = true;
        }
    }
    //set up watch buttons
    for (var i = 0; i < watchbuttons.length; i++) {
        if (!watchbuttons[i].dataset.listener) {
            watchbuttons[i].addEventListener('click', function (event) {
                play_movie(this.dataset.movie); //stringified movie object
            }, false);
            watchbuttons[i].dataset.listener = true;
        }
    }
    //set up favorite buttons (tricky logic)
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
}

// Let users mark a film as a "favorite"
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
    //    console.log("favorite", movie);
}


// MAke an API call to get details about a movie - show a popup with those details
function learn(movie) {
    // Reset the popup and tell user to be patient.
    var popup = document.querySelector("#popup");
    // Consider adding a loading animation?
    popup.querySelector("h2").innerHTML = "LOADING . . . ";
    popup.querySelector("#desc").innerHTML = "";
    popup.querySelector("#starring").innerHTML = "";

    // troubleshoot this?
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


// Add a movie to the theater element to be watched.
function play_movie(movie) {
    //clear the theater first
   var movie_obj = JSON.parse(movie.replace(/\'/g, '"'));
   var theatre = document.querySelector(".theatre");
   theatre.innerHTML = "<video width=\"100%\" controls type=\"video/mp4\"  data-movie=\"" + movie_obj.name + "\" src=\"" + movie_obj.video + "\"> Your browser does not support the video tag.  </video>";
    // Scroll to top of page to view movie.
//    window.scrollTo(0, 0);
    document.querySelector(".theatre").scrollIntoView();
    // Create video tag in theater
    /***********************************
     FORMAT:
     <video
        width="100%"
           controls
           type="video/mp4"
           data-movie="movie_obj.name"
           src="movie_obj.video">
              Your browser does not support the video tag.
       </video>
     *************************************/
}


// OLD PLAY MOVIE FUNCTION FIX THIS
/*function watch(movie) {
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
*/



var movies = make_movies();
make_ui(movies);
