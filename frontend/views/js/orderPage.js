$(document).ready(function () {
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  $('#total-price').text(`${totalPrice} ₪ `);

  let isDelivery = $('#delivery').val() === 'משלוח';
  $('#address-field').css('display', isDelivery ? 'block' : 'none');

  $('#delivery').change(function () {
    isDelivery = $('#delivery').val() === 'משלוח';
    $('#address-field').css('display', isDelivery ? 'block' : 'none');
  });

  const orderItems = cartItems.map((item) => {
    return {
      item: item._id,
      quantity: item.quantity,
    };
  });

  $('#myForm').submit(async function (event) {
    event.preventDefault();

    const newOrder = {
      orderItems,
      totalPrice,
      deliveryMethod: $('#delivery').val(),
      paymentMethod: $('#paymentMethod').val(),
      address: isDelivery ? $('#address').val() : '',
    };

    const resOrder = await ajaxRequest('/api/orders', 'POST', newOrder);
    const alertMessage = resOrder ? 'Order created successfully' : 'Order creation failed';
    alert(alertMessage);
    localStorage.removeItem('cartItems');
    window.location.href = `/end/${resOrder._id}`;

    $('#myForm')[0].reset();
  });
});
