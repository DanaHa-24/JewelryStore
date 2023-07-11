$(document).ready(async function () {
  const product = await ajaxRequest(`/item/${window.location.pathname.split('/')[2]}`, 'GET');
  const wishlist = await ajaxRequest('/api/wishlist', 'GET');

  $('#product-img').attr('src', product.image);
  $('#product-name').text(product.name);
  $('#product-price').text(`מחיר: ₪${product.price}`);
  $('#product-amount').text(`יחידות במלאי: ${product.amountInStock}`);
  $('#product-type').text(product.type);
  $('#product-color').text(() => product.color.map((color) => `${color}`));
  $('#product-size').text(() => product.size.map((size) => `${size}`));
  $('#product-material').text(() => product.material.map((material) => `${material}`));
  $('#product-style').text(() => product.style.map((style) => `${style}`));

  const isItemInWishlist = wishlist?.items.find((wishlistItem) => wishlistItem._id === product._id);
  const wishlistBtnText = isItemInWishlist ? 'הסר מרשימת המשאלות' : 'הוסף לרשימת המשאלות';
  
  $('#product-wishlist-btn').text(wishlistBtnText);
  $('#product-wishlist-btn').click(async function (event) {
    const requestUrl = `/api/wishlist/${product._id}`;
    const requestMethod = isItemInWishlist ? 'DELETE' : 'POST';

    const isSuccess = await ajaxRequest(requestUrl, requestMethod);
    if (isSuccess) {
      const alertMessage = isItemInWishlist ? 'Item removed from wishlist' : 'Item added to wishlist';
      alert(alertMessage);
      window.location.reload();
    }
  });

  const isAvailable = product.amountInStock > 0;

  const cartBtnText = isAvailable ? 'הוסף לעגלת הקניות' : 'אזל מהמלאי';

  $('#product-cart-btn').text(cartBtnText).attr('disabled', !isAvailable);
});
