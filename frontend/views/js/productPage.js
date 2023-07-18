$(document).ready(async function () {
  const product = await ajaxRequest(`/item/${window.location.pathname.split('/')[2]}`, 'GET');
  const isLogged = localStorage.getItem('token');
  const wishlist = isLogged ? await ajaxRequest('/api/wishlist', 'GET') : { items: [] };

  const currencySelect = $('#currency-select');
  async function fetchCurrencyRates() {
    const rates = await ajaxRequest('/currency', 'GET');
    updatePrice(rates);
  }

  function updatePrice(rates) {
    const selectedCurrency = currencySelect.val();
    const priceInILS = product.price;
    let price;
    if (selectedCurrency === 'ILS') {
      price = priceInILS.toFixed(2);
    } else {
      price = (priceInILS * rates[selectedCurrency]).toFixed(2);
    }
    console.log(price);
    const currencySign = selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : '₪';
    $('#product-price').text(`מחיר: ${price} ${currencySign}`);
  }
  // add event listener to the select element
  $('#currency-select').change(function () {
    fetchCurrencyRates();
  });
  fetchCurrencyRates();

  $('#product-img').attr('src', product.image);
  $('#product-name').text(product.name);
  $('#product-amount').text(`יחידות במלאי: ${product.amountInStock}`);
  $('#product-type').text(product.type);
  $('#product-color').text(() => product.color.map((color) => `${color}`));
  $('#product-size').text(() => product.size.map((size) => `${size}`));
  $('#product-material').text(() => product.material.map((material) => `${material}`));
  $('#product-style').text(() => product.style.map((style) => `${style}`));

  const isItemInWishlist = wishlist.items.find((wishlistItem) => wishlistItem._id === product._id);
  const wishlistBtnText = isItemInWishlist ? 'הסר מרשימת המשאלות' : 'הוסף לרשימת המשאלות';

  $('#product-wishlist-btn').text(wishlistBtnText);
  $('#product-wishlist-btn').click(async function (event) {
    if (!isLogged) {
      alert('Please login to add item to wishlist');
      return;
    }
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
  const isAlreadyInCart = JSON.parse(localStorage.getItem('cartItems'))?.find(
    (cartItem) => cartItem._id === product._id
  );
  if (isAlreadyInCart) {
    $('#product-cart-btn').text('כבר בעגלה').attr('disabled', true);
    return;
  }
  $('#product-cart-btn').text(cartBtnText).attr('disabled', !isAvailable);
  $('#product-cart-btn').click(async function (event) {
    if (!isLogged) {
      alert('Please login to add item to cart');
      return;
    }
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const isItemInCart = cartItems.find((cartItem) => cartItem._id === product._id);
    if (isItemInCart) {
      alert('Item already in cart');
      return;
    }
    cartItems.push({ ...product, quantity: 1 });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert('Item added to cart');
    window.location.reload();
  });
});
