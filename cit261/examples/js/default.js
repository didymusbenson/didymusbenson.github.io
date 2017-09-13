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
if (sauce) {
    var sourcejs = "./js/" + document.location.href.split("examples/")[1].split(".")[0] + ".js";
    var jsclient = new XMLHttpRequest();
    jsclient.open('GET', sourcejs);
    jsclient.onreadystatechange = function () {
        sauce.innerHTML = jsclient.responseText;
    }
    jsclient.send();
}
var css_sauce = document.getElementById("css_sauce");
if (css_sauce) {
    var sourcecss = "./css/" + document.location.href.split("examples/")[1].split(".")[0] + ".css";
    var cssclient = new XMLHttpRequest();
    cssclient.open('GET', sourcecss);
    cssclient.onreadystatechange = function () {
        css_sauce.innerHTML = cssclient.responseText;
    }
    cssclient.send();
}


/************* Something Fun *******************/
if ( window.addEventListener ) {
    var konami_keys = [], konami_code = "38,38,40,40,37,39,37,39,66,65";
    window.addEventListener("keydown", function(e){
        konami_keys.push( e.keyCode );
        if ( konami_keys.toString().indexOf( konami_code ) >= 0 ){
        	awwwwyeeeeee();
          konami_keys = [];
            }
    }, true);
}

function awwwwyeeeeee(){
    var easter_egg_basket = document.getElementsByClassName("tool")[0];
    easter_egg_basket.innerHTML = "<script></script><div class='hue'><audio id='mysound' src='https://upload.wikimedia.org/wikipedia/en/3/3f/Darude_-_Sandstorm.ogg'></audio><div class='bassdrop' onmouseover=\"document.getElementById('mysound').play()\" onmouseout=\"document.getElementById('mysound').pause()\"><img src='./img/hue.PNG'/></div></div><div class='rainbow'><h1 class='ooer'>OH THE HUE-MANATEE!</h1></div>";
}
