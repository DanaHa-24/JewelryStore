const ProductCard = (item, wishlist) => {
  const cardWrapper = $('<a>').attr('href', '#').addClass('cardWrapper');
  const card = $('<div>').attr('id', `items-page${item.id}`).addClass('card');
  const cardImage = $('<img>').attr('src', item.image).addClass('card-img-top');
  const cardBody = $('<div>').addClass('card-body');
  const name = $('<h3>').attr('id', 'items-page-jewel-name').text(item.name);
  const price = $('<p>').attr('id', 'items-page-jewel-price').text(`₪${item.price}`);

  const isItemInWishlist = wishlist.items.find((wishlistItem) => wishlistItem._id === item._id);
  const heartClass = isItemInWishlist ? 'fas fa-heart cardFullHeart' : 'far fa-heart cardHollowHeart';
  const heart = $('<button>').addClass(heartClass).css('background-color', 'transparent');

  heart.click(async function (event) {
    const isUserLoggedIn = localStorage.getItem('token') !== null;
    if (!isUserLoggedIn) {
      alert('עליך להתחבר כדי להוסיף פריטים לרשימת המשאלות');
      return;
    }
    const isHollowHeart = $(event.target).hasClass('cardHollowHeart');
    $(event.target)
      .removeClass(isHollowHeart ? 'far cardHollowHeart' : 'fas cardFullHeart')
      .addClass(isHollowHeart ? 'fas cardFullHeart' : 'far cardHollowHeart');

    const requestUrl = `api/wishlist/${item._id}`;
    const requestMethod = isHollowHeart ? 'POST' : 'DELETE';
    const requestData = isHollowHeart ? null : item.id;

    const isSuccess = await ajaxRequest(requestUrl, requestMethod, requestData);
    if (isSuccess) {
      const alertMessage = isHollowHeart ? 'Item added to wishlist' : 'Item removed from wishlist';
      alert(alertMessage);
    }
  });

  if (item.amountInStock === 0) {
    const soldOut = $('<p>').attr('id', 'items-page-jewel-sold-out').text('אזל מהמלאי');
    card.append(soldOut);
  }

  cardWrapper.click(function (event) {
    event.preventDefault();
    event.stopPropagation();
    const targetClassList = event.target.classList;
    if (targetClassList.contains('cardHollowHeart') || targetClassList.contains('cardFullHeart')) return;
    window.location.href = `product/${item._id}`;
  });

  cardBody.append(name, price);
  card.append(heart, cardImage, cardBody);
  cardWrapper.append(card);

  return cardWrapper;
};
