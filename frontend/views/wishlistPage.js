$(document).ready(function() {
    // Create wishlist section
    const wishlist = $('<div class="wishlist-page-header-container"></div>');
    wishlist.append(($('<h1>Wishlist</h1>').addClass('wishlist-page-header')));
    $('body').append(wishlist);
    
    // Create wishlist container for data
    const wishlistContainer = $('<div>').addClass('wishlist-page-container');
    $('body').append(wishlistContainer);

    // after AJAX ask what is the length of mywishlist array => if it is 0 than
    $('.wishlist-page-container').text('ריק פה, בטוח יש דברים יפים שראיתם 🖤');

});