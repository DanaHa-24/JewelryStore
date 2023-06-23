$(document).ready(function() {
    // Text content arrays
    const productTitle = ['שם המוצר'];
    const productPrice = ['מחיר: ₪1,000'];
    const productAvailability = ['יחידות אחרונות במלאי'];
    const productDescription = ['תיאור המוצר מפורט כאן ומספק מידע על המאפיינים המרכזיים של המוצר. ניתן לכתוב על החומרים, העיצוב, הגימור וכל פרטים נוספים שיהיו רלוונטיים ללקוח.'];

    // Create the product container
    const productContainer = $('<div>').addClass('container product-page-rtl');

    // Create the row element
    const row = $('<div>').addClass('row');

    // Create the product image column
    const imageColumn = $('<div>').addClass('col-md-6 product-page-rtl');
    const productImage = $('<img>').attr('src', 'path/to/product-image.jpg').addClass('img-fluid rounded').attr('alt', 'Product Image');
    imageColumn.append(productImage);

    // Create the product details column
    const detailsColumn = $('<div>').addClass('col-md-6 text-right product-page-rtl');
    detailsColumn.append($('<h1>').addClass('display-4 product-page-rtl').text(productTitle[0]));
    detailsColumn.append($('<p>').addClass('lead mb-3 product-page-rtl').text(productPrice[0]));
    detailsColumn.append($('<p>').addClass('text-muted product-page-rtl').text(productAvailability[0]));
    detailsColumn.append($('<hr>'));
    const descriptionHeading = $('<h2>').addClass('h4 product-page-rtl').text('תיאור המוצר:');
    descriptionHeading.css('margin-bottom', '10px');
    detailsColumn.append(descriptionHeading);
    detailsColumn.append($('<p>').addClass('text-muted product-page-rtl').text(productDescription[0]));
    detailsColumn.append($('<button>').addClass('btn btn-secondary btn-lg product-page-rtl').text('הוסף לרשימת המשאלות'));
    detailsColumn.append($('<button>').addClass('btn btn-primary btn-lg ml-4 product-page-rtl').text('הוסף לעגלת הקניות'));

    // Add a common class to both buttons
    detailsColumn.find('button').addClass('custom-button product-page-rtl');

    // Append the columns to the row
    row.append(imageColumn);
    row.append(detailsColumn);

    // Append the row to the product container
    productContainer.append(row);

    // Append the product container to the body
    $('body').append(productContainer);
});

