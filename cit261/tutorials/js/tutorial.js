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
for (var i = 0; i < slides.length; i++) {
    var button = document.createElement("div");
    button.classList.add("control_button");
    button.dataset.slide = i;
    button.addEventListener("click", change_slides);
    button_wrapper.appendChild(button);
}

var buttons = document.getElementsByClassName("control_button");
buttons[0].classList.add("active");

/**********************************************************************/
function change_slides() {
    console.log(this, this.dataset.slide);
    activate_slide(this, slides[this.dataset.slide]);
}

function activate_slide(button, slide) {
    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active")
        slides[i].classList.add("inactive")
        buttons[i].classList.remove("active");
    }
    slide.classList.remove("inactive");
    slide.classList.add("active");
    button.classList.add("active");
}

function forward() {
    var index = 0;
    var cur_slide = document.querySelector("section.active");
    var slides = document.querySelectorAll("section");
    var buttons = document.querySelectorAll(".control_button");
    for (var i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains("active")) {
            index = i;
            i = slides.length;
        }
    }
    if (index + 1 == buttons.length) {
        index = 0;
    } else {
        index++;
    }
    eventFire(buttons[index], 'click');
}

function back() {
    var index = 0;
    var cur_slide = document.querySelector("section.active");
    var slides = document.querySelectorAll("section");
    var buttons = document.querySelectorAll(".control_button");
    for (var i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains("active")) {
            index = i;
            i = slides.length;
        }
    }
    if (index == 0) {
        index = buttons.length - 1;
    } else {
        index--;
    }
    eventFire(buttons[index], 'click');
}
/***********************************************
** Nifty little method to click buttons for me.
** I already put click events on my nav buttons,
** so why bother re-writing that code for my
** slides? Better to just have this click my
** buttons for me :P
***********************************************/
function eventFire(e, eventType) {
    if (e.fireEvent) {
        e.fireEvent('on' + eventType);
    } else {
        var eventObject = document.createEvent('Events');
        eventObject.initEvent(eventType, true, false);
        e.dispatchEvent(eventObject);
    }
}
