const categories = [
    { 
        title: 'צמידים',
        image: '../images/home-page-bracelets.jpg'
    },
    { 
        title: 'טבעות',
        image: '../images/home-page-rings.jpg'
    },    
    { 
        title: 'עגילים',
        image: '../images/home-page-earrings.jpg'
    },
    { 
        title: 'שרשראות',
        image: '../images/home-page-necklaces.jpg'
    },
];

const cardsContainer = $("<section>").attr("id", "home-page-categories-section").addClass("container");

$.each(categories, function(index, category){
    let cardWrapper = $("<a>").attr("href", "#").addClass("home-page-card-wrapper");
    let card = $("<div>").css("background-image", "url(" + category.image + ")").addClass("home-page-category-card");
    let name = $("<div>").addClass("home-page-card-name").text(category.title);    
    
    cardsContainer.append(cardWrapper.append(card.append(name)));
});

$("body").append(cardsContainer);


let slideIndex = 1;
let slideshowContainer = $("<div>").attr("id", "home-page-slideshow-container");
let slideshowContent = $("<div>").attr("id", "home-page-slideshow-content");
let dotContainer = $("<div>").attr("id", "home-page-dot-container");

slideshowContainer.append(slideshowContent, dotContainer);

$.each(categories, function(index, category){
    let slide = $("<div>").addClass("home-page-slide home-page-fade");
    let slideImage = $("<img>").attr("src", category.image).addClass("home-page-image");
    slideshowContent.append(slide.append(slideImage));
});

let prev = $("<a>").addClass("home-page-prev-slide fas fa-chevron-left").click(function(){ plusSlides(-1) });
let next = $("<a>").addClass("home-page-next-slide fas fa-chevron-right").click(function(){ plusSlides(1) });
slideshowContent.append(prev, next);

for (let i = 1; i < 5; i++) {
    dotContainer.append($("<span>").addClass("home-page-dot").click(function(){ currentSlide(i) }));
}

$("body").append(slideshowContainer);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = $(".home-page-slide");
    let dots = $(".home-page-dot");
    
    if (n > slides.length) {
        slideIndex = 1;
    }    
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    slides.hide(); // Hide all slides
    dots.removeClass("home-page-active"); // Remove "home-page-active" class from all dots
    
    slides.eq(slideIndex - 1).show(); // Show the current slide
    dots.eq(slideIndex - 1).addClass("home-page-active"); // Add "home-page-active" class to the current dot
}

showSlides(slideIndex);

setInterval(function() {
    plusSlides(1);
}, 3500);