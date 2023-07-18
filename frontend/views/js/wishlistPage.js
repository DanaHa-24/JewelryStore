$(document).ready(async function () {
  // Create wishlist section
  const wishlist = $('<div class="wishlist-page-header-container"></div>');
  wishlist.append($('<h1>Wishlist</h1>').addClass('wishlist-page-header'));
  $('body').append(wishlist);

  const wishlistContainer = $('<div>').addClass('container').attr('id', 'items-page-jewelry-cards-container');
  const wishlistArray = await ajaxRequest('/api/wishlist', 'GET');

  if (wishlistArray.items.length === 0) {
    $('body').append('<p style="text-align: center;"> ריק פה, בטוח יש דברים יפים שראיתם 🖤</p>');
  } else {
    wishlistArray.items.forEach((item) => {
      wishlistContainer.append(ProductCard(item, wishlistArray));
      $('body').append(wishlistContainer);
    });
  }
});
