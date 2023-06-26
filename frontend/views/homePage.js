const categories = [
    { 
        title: 'צמידים',
        english: 'Bracelet',
        image: '../images/home-page-bracelets.jpg'
    },
    { 
        title: 'טבעות',
        english: 'Ring',
        image: '../images/home-page-rings.jpg'
    },    
    { 
        title: 'עגילים',
        english: 'Earring',
        image: '../images/home-page-earrings.jpg'
    },
    { 
        title: 'שרשראות',
        english: 'Necklace',
        image: '../images/home-page-necklaces.jpg'
    }
];

const cardsContainer = $("<section>").attr("id", "home-page-categories-section").addClass("container");

$.each(categories, function(index, category){
    let cardWrapper = $("<a>").attr("href", `itemsPage.html?type=${category.english}`).addClass("home-page-card-wrapper");
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

$.ajax({
    url: `api/item/allItems`,
    method: 'GET',
    data: {
        sort: 0 // Index of the sorting option in the sortingArray (0 for howManySold: -1)
      },
    success: function(response) {
        const favoriteItems = response.items;
        createSlides(favoriteItems);
        showSlides(slideIndex);
        setInterval(function() {
            plusSlides(1);
        }, 3500);
    },
    error: function(error) {
      console.error('Error retrieving all items:', error);
    }
});

function createSlides(favoriteItems){
    for (let i = 0; i < 20; i++) {
        let item = favoriteItems[i];
        let slide = $("<div>").addClass("home-page-slide home-page-fade");
        let slideImage = $("<img>").attr("src", "../images/BU.png").addClass("home-page-image");
        slideshowContent.append(slide.append(slideImage));
        dotContainer.append($("<span>").addClass("home-page-dot").click(function(){ currentSlide(i) }));
    }
    let prev = $("<a>").addClass("home-page-prev-slide fas fa-chevron-left").click(function(){ plusSlides(-1) });
    let next = $("<a>").addClass("home-page-next-slide fas fa-chevron-right").click(function(){ plusSlides(1) });
    slideshowContent.append(prev, next);
    $("body").append(slideshowContainer);
}

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

    // Hide all slides
    slides.hide(); 
    // Remove "home-page-active" class from all dots
    dots.removeClass("home-page-active");
    // Show the current slide
    slides.eq(slideIndex - 1).show();
    // Add "home-page-active" class to the current dot
    dots.eq(slideIndex).addClass("home-page-active");
}