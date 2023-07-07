const addToWishlist = (item) => {
  $.ajax({
    url: 'item',
    method: 'POST',
    data: item,
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      console.log(error);
    },
  });
};

const ProductCard = (item) => {
  let cardWrapper = $('<a>').attr('href', '#').addClass('cardWrapper');
  let card = $('<div>').attr('id', 'items-page' + item.id);
  let cardImage = $('<img>').attr('src', item.image).addClass('card-img-top');
  let cardBody = $('<div>').addClass('card-body');
  let name = $('<h3>').attr('id', 'items-page-jewel-name').text(item.name);
  let price = $('<p>').attr('id', 'items-page-jewel-price').text(`₪${item.price}`);

  let heart = $('<button>').addClass('far fa-heart cardHollowHeart').css('background-color', 'transparent');
  heart.click(function (event) {
    console.log(item);
    if ($(event.target).hasClass('cardHollowHeart')) {
      $(event.target).removeClass('far cardHollowHeart').addClass('fas cardFullHeart');
      const wishlist = JSON.parse(localStorage.getItem('wishlist'));
      const isInArray = wishlist.some((jewel) => jewel.id === item.id);
      if (!isInArray) {
        wishlist.push(item);
      }
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } else {
      $(event.target).removeClass('fas cardFullHeart').addClass('far cardHollowHeart');
      const wishlist = JSON.parse(localStorage.getItem('wishlist'));
      const filteredWishlist = wishlist.filter((jewel) => jewel.id !== item.id);
      localStorage.setItem('wishlist', JSON.stringify(filteredWishlist));
    }
  });

  cardWrapper.click(function (event) {
    event.preventDefault;
    event.stopPropagation;
    if (event.target.classList.contains('cardHollowHeart') || event.target.classList.contains('cardFullHeart')) return;
    window.location.href = `product/${item.id}`;
  });

  cardBody.append(name, price);
  card.addClass('card').append(heart, cardImage, cardBody);
  cardWrapper.append(card);

  return cardWrapper;
};
