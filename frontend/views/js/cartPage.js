$(document).ready(async function () {
  const cartTable = $('#cart-tbody');
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.forEach(async (item) => {
    cartTable.prepend(await CartItem(item));
    $('#minus-btn-' + item._id).on('click', function (event) {
      const itemIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);
      if (itemIndex > -1) {
        cartItems[itemIndex].quantity--;
        if (cartItems[itemIndex].quantity === 0) {
          cartItems.splice(itemIndex, 1);
        }
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      location.reload();
    });
    $('#plus-btn-' + item._id).on('click', function (event) {
      const itemIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);
      if (itemIndex > -1) {
        cartItems[itemIndex].quantity++;
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      location.reload();
    });
  });
  const totalToPay = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  console.log(totalToPay);
  $('#total-to-pay').text(() => cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0) + '₪');
  $('#checkout-btn').on('click', function (event) {
    window.location.href = '/checkout';
  });
});
