$(document).ready(function() {
    // Create cart section
    const cart = $('<div class="cart-page-header-container"></div>');
    cart.append(($('<h1>סל קניות</h1>').addClass('cart-page-header')));
    $('body').append(cart);
    
    // Create cart container for data
    const cartContainer = $('<div>').addClass('cart-page-container');
    $('body').append(cartContainer);

    // after AJAX ask what is the length of mycart array => if it is 0 than
    $('.cart-page-container').text('ריק פה, בטוח יש דברים יפים שראיתם 🖤');

});