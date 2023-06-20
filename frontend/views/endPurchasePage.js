$(document).ready(function() {
    // Create the container div
    let container = $('<div class="container"></div>').attr("id","EP-page-container");

    // Create the h1 element for the heading
    let heading = $('<h1 class="mt-4">תודה על הרכישה שלך !</h1>').attr("id","EP-page-h1");

    // Create the paragraph for purchase details
    let purchaseDetails = $('<p>להלן פרטי הרכישה שלך :</p>').attr("id","EP-page-p");

    // Create the card for order summary
    let orderSummaryCard = $('<div class="card"></div>').attr("id","EP-page-card");
    let orderSummaryCardHeader = $('<div class="card-header"><h2>סיכום ההזמנה</h2></div>').attr("id","EP-page-card-header");
    let orderSummaryCardBody = $('<div class="card-body"></div>').attr("id","EP-page-card-body");
    let orderNumber = $('<p><strong>מספר הזמנה:</strong> #123456</p>').attr("id","EP-page-p");
    let orderTotal = $('<p><strong>סכום כולל:</strong> 500.00 ₪</p>').attr("id","EP-page-p");
    orderSummaryCardBody.append(orderNumber, orderTotal);
    orderSummaryCard.append(orderSummaryCardHeader, orderSummaryCardBody);

    // Create the card for shipping details
    let shippingDetailsCard = $('<div class="card"></div>').attr("id","EP-page-card");
    let shippingDetailsCardHeader = $('<div class="card-header"><h2>פרטי משלוח</h2></div>').attr("id","EP-page-card-header");
    let shippingDetailsCardBody = $('<div class="card-body"></div>').attr("id","EP-page-card-body");
    let shippingAddress = $('<p><strong>כתובת למשלוח:</strong>, רחוב , עיר, מיקוד</p>').attr("id","EP-page-p");
    let shippingMethod = $('<p><strong>שיטת משלוח:</strong> משלוח רגיל</p>').attr("id","EP-page-p");
    shippingDetailsCardBody.append(shippingAddress, shippingMethod);
    shippingDetailsCard.append(shippingDetailsCardHeader, shippingDetailsCardBody);

    // Create the card for payment details
    let paymentDetailsCard = $('<div class="card"></div>').attr("id","EP-page-card");
    let paymentDetailsCardHeader = $('<div class="card-header"><h2>פרטי תשלום</h2></div>').attr("id","EP-page-card-header");
    let paymentDetailsCardBody = $('<div class="card-body"></div>').attr("id","EP-page-card-body");
    let paymentMethod = $('<p><strong>אמצעי תשלום:</strong> כרטיס אשראי</p>').attr("id","EP-page-p");
    paymentDetailsCardBody.append(paymentMethod);
    paymentDetailsCard.append(paymentDetailsCardHeader, paymentDetailsCardBody);

    // Create the thank you message
    let thankYouMessage = $('<p>תודה שקנית אצלנו!</p>').attr("id","EP-page-p");

    // Create the "Back to Homepage" button
    let homeButton = $('<div class="text-center mt-4"><a href="#" class="btn">חזור לדף הבית</a></div>');

    // Append all the created elements to the container div
    container.append(
      heading,
      purchaseDetails,
      orderSummaryCard,
      shippingDetailsCard,
      paymentDetailsCard,
      thankYouMessage,
      homeButton
    );

    // Append the container to the body of the document
    $('body').append(container);
  });