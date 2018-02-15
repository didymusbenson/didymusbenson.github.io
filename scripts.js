/* No checkbox hack today. */
var about = document.querySelector(".about");
about.addEventListener("click", function(event) {
    if (about.classList.contains("collapse")) {
        about.classList.remove("collapse");
    } else {
        about.classList.add("collapse");
    }
    event.preventDefault();
}, false);
about.addEventListener("touchstart", function(event) {
    if (about.classList.contains("collapse")) {
        about.classList.remove("collapse");
    } else {
        about.classList.add("collapse");
    }
    event.preventDefault();
}, false);

