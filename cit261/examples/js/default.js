document.getElementById("fluency").addEventListener("click", activate);

function activate() {

    var e = document.getElementById("fluency");


    if (e.classList.contains('fluency-active')) {
       e.classList.remove('fluency-active');
        e.classList.add('fluency-inactive');
    } else {
        e.classList.remove('fluency-inactive');
        e.classList.add('fluency-active');
    }


}

var sauce = document.getElementById("sauce");
var sourcejs = "./js/" + document.location.href.split("examples/")[1].split(".")[0] + ".js";
var client = new XMLHttpRequest();
client.open('GET', sourcejs);
client.onreadystatechange = function() {
    sauce.innerHTML = client.responseText;
}
client.send();

/****
#fluency{
    position:fixed;
    top:15px;
    left: -700px;
    width:900px;
    max-width:calc(900px - 1.5em);
    transition: 0.2s ease-in-out;
}

#fluency:hover{
    cursor:pointer;
    left: -675px;
    transition: 0.2s ease-in-out;
}
***/
