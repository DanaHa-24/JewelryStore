const categories = [
    {
      title: 'צמידים',
      english: 'Bracelet',
      image: '../images/home-page-bracelets.jpg',
    },
    {
      title: 'טבעות',
      english: 'Ring',
      image: '../images/home-page-rings.jpg',
    },
    {
      title: 'עגילים',
      english: 'Earring',
      image: '../images/home-page-earrings.jpg',
    },
    {
      title: 'שרשראות',
      english: 'Necklace',
      image: '../images/home-page-necklaces.jpg',
    },
  ];
  
  const cardsContainer = $('<section>').attr('id', 'home-page-categories-section').addClass('container');
  const slideshowContainer = $('<div>').attr('id', 'home-page-slideshow-container');
  const slideshowContent = $('<div>').attr('id', 'home-page-slideshow-content');
  const dotContainer = $('<div>').attr('id', 'home-page-dot-container');
  const favoritesPhrase = $('<h2>').attr('id', 'home-page-favorites-phrase').text(':התכשיטים המובילים שלנו');
  let slideIndex = 0;
  let slideshowInterval;
  
  $.each(categories, function (index, category) {
    let cardWrapper = $('<a>').attr('href', `items?type=${category.english}`).addClass('home-page-card-wrapper');
    let card = $('<div>')
      .css('background-image', 'url(' + category.image + ')')
      .addClass('home-page-category-card');
    let name = $('<div>').addClass('home-page-card-name').text(category.title);
  
    cardsContainer.append(cardWrapper.append(card.append(name)));
  });
  
  $('#home-content').append(cardsContainer, favoritesPhrase);
  
  slideshowContainer.append(slideshowContent, dotContainer);
  
  // getting all items sorted by most to least favorite
  // showing the items in a slider and changing slide every 3.5 seconds
  $.ajax({
    url: 'item',
    method: 'GET',
    data: {
      sort: 0, // the service function would refer to it as sorting by favorites
    },
    success: function (response) {
      const favoriteItems = response;
      createSlides(favoriteItems);
      showSlides(slideIndex);
      slideshowInterval = setInterval(function () {
        plusSlides(1);
      }, 3500);
    },
    error: function (error) {
      console.error('Error retrieving all items:', error);
    },
  });
  
  // creating a slider with the 20 most favorite items
  function createSlides(favoriteItems) {
    for (let i = 0; i < 20; i++) {
      let item = favoriteItems[i];
      let slide = $('<div>').addClass('home-page-slide home-page-fade');
      let slideImage = $('<img>').attr('src', item.image).addClass('home-page-image');
      slideshowContent.append(slide.append(slideImage));
      dotContainer.append(
        $('<span>')
          .addClass('home-page-dot')
          .click(function () {
            clearInterval(slideshowInterval); // Clear the current interval
            currentSlide(i);
            slideshowInterval = setInterval(function () {
              plusSlides(1);
            }, 3500); // Start a new interval
          })
      );
    }
  
    let prev = $('<a>')
      .addClass('home-page-prev-slide fas fa-chevron-left')
      .click(function () {
        clearInterval(slideshowInterval); // Clear the current interval
        plusSlides(-1);
        slideshowInterval = setInterval(function () {
          plusSlides(1);
        }, 3500); // Start a new interval
      });
  
    let next = $('<a>')
      .addClass('home-page-next-slide fas fa-chevron-right')
      .click(function () {
        clearInterval(slideshowInterval); // Clear the current interval
        plusSlides(1);
        slideshowInterval = setInterval(function () {
          plusSlides(1);
        }, 3500); // Start a new interval
      });
  
    slideshowContent.append(prev, next);
    $('#home-content').append(slideshowContainer);
  }
  
  function plusSlides(n) {
    showSlides((slideIndex += n));
  }
  
  function currentSlide(n) {
    showSlides((slideIndex = n));
  }
  
  function showSlides(n) {
    let slides = $('.home-page-slide');
    let dots = $('.home-page-dot');
  
    if (n > slides.length - 1) {
      slideIndex = 0;
    } else if (n < 0) {
      slideIndex = slides.length - 1;
    }
  
    // Hide all slides
    slides.hide();
    // Remove "home-page-active" class from all dots
    dots.removeClass('home-page-active');
    // Show the current slide
    slides.eq(slideIndex).show();
    // Add "home-page-active" class to the current dot
    dots.eq(slideIndex).addClass('home-page-active');
  }
  