document.getElementById("fluency").addEventListener("click", activate);
document.querySelector("#arrowleft").addEventListener("click", back);
document.querySelector("#arrowright").addEventListener("click", forward);

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


var slides = document.getElementsByTagName("section");
var button_wrapper = document.querySelector("#control_buttons");
for (var i = 0;i < slides.length; i++){
    var button = document.createElement("div");
    button.classList.add("control_button");
    button.dataset.slide = i;
    button.addEventListener("click", change_slides);
    button_wrapper.appendChild(button);
}

var buttons = document.getElementsByClassName("control_button");
buttons[0].classList.add("active");


function change_slides(){
    console.log(this, this.dataset.slide);
    activate_slide(this, slides[this.dataset.slide]);
}

function activate_slide(button, slide){
    for (var i = 0; i < slides.length; i++){
        slides[i].classList.remove("active")
        slides[i].classList.add("inactive")
        buttons[i].classList.remove("active");
    }
    slide.classList.remove("inactive");
    slide.classList.add("active");
    button.classList.add("active");
}
function forward(){
    console.log("forward")
}
function back(){
    console.log("back")
}
