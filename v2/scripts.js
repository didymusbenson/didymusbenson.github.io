/* No checkbox hack today. */
var about = document.querySelector(".about");
about.addEventListener("click", toggleCollapse);
about.addEventListener("touchstart", toggleCollapse);
function toggleCollapse() {
    if (about.classList.contains("collapse")) {
        about.classList.remove("collapse");
    } else {
        about.classList.add("collapse");
    }
}
