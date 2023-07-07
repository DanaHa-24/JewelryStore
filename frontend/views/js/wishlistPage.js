$(document).ready(function () {
    // Create wishlist section
    const wishlist = $('<div class="wishlist-page-header-container"></div>');
    wishlist.append($('<h1>Wishlist</h1>').addClass('wishlist-page-header'));
    $('body').append(wishlist);
  
    const wishlistContainer = $('<div>').addClass('container').attr('id', 'items-page-jewelry-cards-container');
  
    const wishlistArray = JSON.parse(localStorage.getItem('wishlist'));
  
    if (wishlistArray.length === 0) {
      wishlistContainer.text('ריק פה, בטוח יש דברים יפים שראיתם 🖤');
    } else {
      wishlistArray.forEach((item) => {
        wishlistContainer.append(ProductCard(item));
      });
    }
  
    $('body').append(wishlistContainer);
  });
  