$(document).ready(async function () {
  const cartTable = $('#cart-tbody');
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  cartItems.forEach(async (item) => {
    cartTable.prepend(await CartItem(item));

    $('#minus-btn-' + item._id).on('click', function (event) {
      const itemIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);

      if (item.amountInStock > cartItems[itemIndex].quantity + 1) {
        $('#plus-btn-' + item._id).attr('disabled', false);
      }

      if (itemIndex > -1) {
        const updatedQuantity = cartItems[itemIndex].quantity - 1;
        cartItems[itemIndex].quantity = updatedQuantity;

        if (updatedQuantity === 0) {
          $('#cart-item-' + item._id).remove();
          cartItems.splice(itemIndex, 1);
          updateTotalPrice();
        } else {
          updateQuantityDisplay(item, updatedQuantity);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateTotalPrice();
      }
    });

    $('#plus-btn-' + item._id).on('click', function (event) {
      const itemIndex = cartItems.findIndex((cartItem) => cartItem._id === item._id);

      if (item.amountInStock < cartItems[itemIndex].quantity + 1) {
        alert('אין מספיק מלאי מהפריט הנבחר');
        return;
      }

      if (itemIndex > -1) {
        cartItems[itemIndex].quantity++;
        updateQuantityDisplay(item, cartItems[itemIndex].quantity);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateTotalPrice();
      }
    });
  });

  $('#total-price').text(() => calculateTotalPrice(cartItems) + '₪');

  $('#checkout-btn').on('click', function (event) {
    if (cartItems.length === 0) {
      alert('העגלה ריקה!');
      return;
    }
    window.location.href = '/checkout';
  });

  function updateQuantityDisplay(item, quantity) {
    $('#quantity-' + item._id).val(quantity);
    $('#total-to-pay-' + item._id).text(item.price * quantity + '₪');
  }

  function updateTotalPrice() {
    $('#total-price').text(calculateTotalPrice(cartItems) + '₪');
  }

  function calculateTotalPrice(cartItems) {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  }
});
