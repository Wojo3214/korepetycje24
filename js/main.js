"use strict";

//nav
function openNav(){
    console.log("clicked");
    document.querySelector(".nav-items").style.right="0px";
}

function closeNav(){
    console.log("clicked");
    document.querySelector(".nav-items").style.right="-4000px";
}

//copyrights year
let date = new Date();
let currectYear = date.getFullYear();

console.log(currectYear);
document.querySelector(".rights").innerHTML = `<p>Wszelkie prawa zastrzeżone ${currectYear}</p>`;



//Getting posts

let _testimonials = [];

async function getTestimonials(){
    let data = await fetch(`http://matma.wojciechdzwonczyk.com/wordpress/wp-json/wp/v2/posts?_embed&categories=4`).then(response => response.json());

    console.log(data);
    _testimonials = data;

    appendTestimonials(_testimonials);
}

getTestimonials();

function appendTestimonials(testimonials){
    let htmlTemplate ="";
    for (const testimonial of testimonials) {
        htmlTemplate += `
        <div>
            <div class="testimonials-message">
               
                <h4 class="testimonials-user-name">${testimonial.acf.name}</h4>
                ${testimonial.content.rendered}
            </div>
        </div>
        `;
    }
    document.querySelector(".slide-opinion").innerHTML += htmlTemplate;
    init();
}

let _aboutMe = [];

async function getAboutMe(){
    let data = await fetch(`http://matma.wojciechdzwonczyk.com/wordpress/wp-json/wp/v2/posts?_embed&categories=3`).then(response => response.json());

    console.log(data);
    _aboutMe = data;

    appendAboutMe(_aboutMe);
}

getAboutMe();

function appendAboutMe(myInfo){
    let htmlTemplate = "";
    for (const my of myInfo) {
        htmlTemplate = `
        <h2>${my.title.rendered}</h2>
                <img src="img/marta2.jpg" alt="Marta Krzymińska">

                ${my.content.rendered}
        `;
    }
    document.querySelector(".container-about-me").innerHTML = htmlTemplate;
}
        
function init(){


//Testimonials slider
$(document).ready(function(){
    $('.slide-opinion').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 3000,
    });
});

//Extra Curricular Activity slider
let dotTitles = []
$('.curricular-content .extra_curricular_price').each(function(i) {
    dotTitles.push($(this).data('title'));
});

const paging = function(slick,index) {
    return '<span class="subject-name">' + dotTitles[index] + '</span>';
}

$(document).ready(function(){
    var slickOpts ={
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        customPaging: paging,
        arrows: false,
        autoplay: false,
        autoplaySpeed: 13000,
        appendDots: $('.subject'),  
    };
    
    $('.curricular-content').slick(slickOpts);       
});
}