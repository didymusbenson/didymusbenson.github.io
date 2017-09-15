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


var slides = document.getElementsByTagName("section");
for (var i = 0;i < slides.length; i++){
    var button = document.createElement("div");
    button.classList.add("control_button");
    button.dataset.slide = i;
    button.addEventListener("click", change_slides);
    document.getElementById("control_buttons").appendChild(button);
}

var buttons = document.getElementsByClassName("control_button");
buttons[0].classList.add("active");

function change_slides(){
    console.log(this.dataset.slide);
}
