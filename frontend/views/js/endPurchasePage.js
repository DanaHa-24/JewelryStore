$(document).ready(async function () {
  const orderId = window.location.href.split('/').pop();
  const order = await ajaxRequest(`/api/orders/${orderId}`, 'GET');

  $('#order-number').text(order.orderNumber);
  $('#total-price').text(`${order.totalPrice} ₪ `);
  $('#address').text(order.address);
  $('#deliveryMethod').text(order.deliveryMethod);
  $('#paymentMethod').text(order.paymentMethod);
});
