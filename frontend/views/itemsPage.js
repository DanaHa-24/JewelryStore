// const sortingArray = {
//     "מיין לפי" : ['החדשים ביותר', 'הכי פופולרי', 'מהגבוה לנמוך', 'מהנמוך לגבוה']
// };

// const categoriesBar = $("<nav>").attr("id", "items-page-categories-bar").addClass("navbar navbar-expand-lg sticky-top");
// const categoriesList = $("<ul>").attr("id", "items-page-categories-list").addClass("navbar-nav");
// const sortingList = $("<ul>").attr("id", "items-page-sorting-list").addClass("navbar-nav");
// const cardsContainer = $("<div>").attr("id", "items-page-jewelry-cards-container").addClass("container");
// const pageNumRow = $("<div>").attr("id", "items-page-page-num-row");
// const previousPage = $("<button>").attr("id", "items-page-previous-page-button").addClass("fas fa-chevron-left");
// const pageNum = $("<label>").attr("id", "items-page-page-num-label");
// const nextPage = $("<button>").attr("id", "items-page-next-page-button").addClass("fas fa-chevron-right");
// let currentPage = 1;
// let maxPage = 1;

// pageNumRow.append(previousPage, pageNum, nextPage);

// $.each(sortingArray, function(category, items){
//     let dropdown = $("<div>").addClass("dropdown row");
//     let dropdownButton = $('<button>').addClass('btn dropdown-toggle dropdownMenuButton').attr('type', 'button').attr('data-toggle', 'dropdown').attr('aria-haspopup', 'true').attr('aria-expanded', 'false').text(category);
//     let dropdownContent = $('<div>').addClass('dropdown-menu');

//     $.each(items, function(index, item){
//         let itemLink = $("<a>").attr("href", "#").addClass("dropdown-item").text(item);
//         dropdownContent.append(itemLink);
//     })
//     dropdown.append(dropdownButton, dropdownContent);
//     sortingList.append($("<li>").append(dropdown));
// });




// function getDataFromItemSchema() {
//     return new Promise(function(resolve, reject) {
//         $.ajax({
//         url: 'http://localhost:5000/Item',
//         method: 'GET',
//         success: function(response) {
//             resolve(response);
//         },
//         error: function(error) {
//             reject(error);
//         }
//         });
//     });
// }

// getDataFromItemSchema()
//     .then(function(response) {
//         const Item = response;
//         // const changeStream = Item.watch();
//         console.log(Item);

//         Item.find({}, function (err, items) {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
            
//             // creating the categories list
//             $.each(items, function (index, item) {
//             let dropdown = $("<div>").addClass("dropdown row");
//             let dropdownButton = $('<button>').addClass('btn dropdown-toggle dropdownMenuButton').attr('type', 'button').attr('data-toggle', 'dropdown').attr('aria-haspopup', 'true').attr('aria-expanded', 'false').text(category);
//             let dropdownContent = $('<div>').addClass('dropdown-menu');
            
//             // Retrieve the properties from the item object
//             let colors = item.color;
//             let sizes = item.size;
//             let materials = item.material;
//             let types = item.type;
            
//             // Add the colors
//             $.each(colors, function (index, color) {
//                 let itemLink = $("<a>").attr("href", "#").addClass("dropdown-item").text(color);
//                 dropdownContent.append(itemLink);
//             });
            
//             // Add the sizes
//             $.each(sizes, function (index, size) {
//                 let itemLink = $("<a>").attr("href", "#").addClass("dropdown-item").text(size);
//                 dropdownContent.append(itemLink);
//             });
            
//             // Add the materials
//             $.each(materials, function (index, material) {
//                 let itemLink = $("<a>").attr("href", "#").addClass("dropdown-item").text(material);
//                 dropdownContent.append(itemLink);
//             });
            
//             // Add the types
//             $.each(types, function (index, type) {
//                 let itemLink = $("<a>").attr("href", "#").addClass("dropdown-item").text(type);
//                 dropdownContent.append(itemLink);
//             });
            
//             dropdown.append(dropdownButton, dropdownContent);
//             categoriesList.append($("<li>").append(dropdown));
//             });
//         });

//         categoriesBar.append(sortingList, categoriesList);

//         Item.find({}, function (err, items) {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
        
//             items.forEach(function (item) {
//                 let cardWrapper = $("<a>").attr("href", "#").addClass("cardWrapper");
//                 let card = $("<div>").attr("id", "items-page" + item.id);
//                 let cardimage = $("<img>").attr("src", item.image).addClass("card-img-top");
//                 let cardBody = $("<div>").addClass("card-body");
//                 let heart = $("<button>").addClass("far fa-heart cardHollowHeart");
//                 let name = $("<h3>").attr("id", "items-page-jewel-name").text(item.name);
//                 let price = $("<p>").attr("id", "items-page-jewel-price").text(`₪${item.price}`);
//                 let numCards = cardsContainer.children().length;
                
//                 cardBody.append(name, price);
//                 card.addClass("card").append(heart, cardimage, cardBody);
//                 cardsContainer.append(cardWrapper.append(card));
//                 $("body").append(categoriesBar, cardsContainer, pageNumRow);
                
//                 if (numCards % 40 == 1 && numCards != 1) {
//                     maxPage++;
//                     pageNum.text(`${currentPage}/${maxPage}`);
//                 }
//                 showPage(currentPage);
//             });
//         });

//         changeStream.on('change', function (change) {
//             // if an item has been deleted from the schema
//             if (change.operationType === 'delete') {
//                 // Get the ID of the deleted item
//                 const deletedItemId = change.documentKey.id;
            
//                 // Find and remove the corresponding card from cardsContainer
//                 cardsContainer.find(`#${deletedItemId}`).remove();
            
//                 let numCards = cardsContainer.children().length;
//                 // Checking if maxPage needs to change
//                 if (numCards % 40 == 0 && numCards != 0) {
//                     maxPage--;
//                     currentPage = currentPage > maxPage ? maxPage : currentPage;
//                 }
//             }
//             showPage(currentPage);
//         });
//     })
//     .catch(function(error) {
//     console.error('Error retrieving Item:', error);
// });

// $(document).on("click", ".dropdownMenuButton", function(event) {
//     let flag = $(event.target).hasClass('is-active');
//     $('.dropdownMenuButton').removeClass('is-active');
//     if(!flag){
//         $(event.target).addClass('is-active');
//     }
// });

// $(document).on("click", function(event) {
//     if (!$(event.target).closest('.dropdownMenuButton').length) {
//         $('.dropdownMenuButton').removeClass('is-active');
//     }
// });

// $(document).on("click", ".cardHollowHeart", function(event) {
//     event.stopPropagation();
//     event.preventDefault();
//     $(event.target).removeClass("far cardHollowHeart").addClass("fas cardFullHeart");
// });

// $(document).on("click", ".cardFullHeart", function(event) {
//     event.stopPropagation();
//     event.preventDefault();
//     $(event.target).removeClass("fas cardFullHeart").addClass("far cardHollowHeart");
// });

// previousPage.click(function(){
//     if (currentPage > 1) {
//         currentPage--;

//         showPage(currentPage);

//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     }
// });

// nextPage.click(function(){
//     if (currentPage < maxPage) {
//         currentPage++;

//         showPage(currentPage);

//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     }
// });

// showPage(currentPage);

// function showPage(pageNumber) {
//     let numCards = cardsContainer.children().length;
//     let startIndex = (pageNumber - 1) * 40;
//     let endIndex = Math.min(startIndex + 40, numCards);
//     let items = cardsContainer.children();
    
//     for (let i = 0, j = 1; i < items.length; i++) {
//         if (i >= startIndex && i < endIndex) {
//             items.eq(i).css("display", "list-item");
//             items.eq(i).attr("value", startIndex + j++);
//         } else {
//             items.eq(i).css("display", "none");
//         }
//     }
//     pageNum.text(`${pageNumber}/${maxPage}`);
// }













const sortingArray = {
    "מיין לפי" : ['החדשים ביותר', 'הכי פופולרי', 'מהגבוה לנמוך', 'מהנמוך לגבוה']
};

const categoriesArray = {
    'צבע': ['אדום', 'כחול', 'שחור', 'לבן'],
    'מידה': ['44', '46', '48', '50'],
    'מתכת': ['יהלום', 'זהב', 'כסף'],
    'סוג': ["טבעות"]
};

const categoriesBar = $("<nav>").attr("id", "items-page-categories-bar").addClass("navbar navbar-expand-lg sticky-top");
const categoriesList = $("<ul>").attr("id", "items-page-categories-list").addClass("navbar-nav");
const sortingList = $("<ul>").attr("id", "items-page-sorting-list").addClass("navbar-nav");
const cardsContainer = $("<div>").attr("id", "items-page-jewelry-cards-container").addClass("container");
const pageNumRow = $("<div>").attr("id", "items-page-page-num-row");
const previousPage = $("<button>").attr("id", "items-page-previous-page-button").addClass("fas fa-chevron-left");
const pageNum = $("<label>").attr("id", "items-page-page-num-label");
const nextPage = $("<button>").attr("id", "items-page-next-page-button").addClass("fas fa-chevron-right");
let currentPage = 1;
let maxPage = 1;

pageNumRow.append(previousPage, pageNum, nextPage);

$.each(sortingArray, function(category, items){
    let dropdown = $("<div>").addClass("dropdown row");
    let dropdownButton = $('<button class="btn dropdown-toggle dropdownMenuButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">').text(category);
    let dropdownContent = $('<div>').addClass('dropdown-menu');
    $.each(items, function(index, item){
        let itemLink = $("<a>").attr("href", "#").addClass("dropdown-item").text(item);
        dropdownContent.append(itemLink);
    })
    dropdown.append(dropdownButton, dropdownContent);
    sortingList.append($("<li>").append(dropdown));
});

$.each(categoriesArray, function(category, items){
    // <div class="form-check">
    //     <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
    //     <label class="form-check-label" for="flexCheckDefault">
    //         Default checkbox
    //     </label>
    // </div>


    let dropdown = $("<div>").addClass("dropdown row");
    let dropdownButton = $('<button class="btn dropdown-toggle dropdownMenuButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">').text(category);

    let dropdownContent = $('<div>').addClass('dropdown-menu');
    $.each(items, function(index, item){
        let checkbox = $('<input>').attr("type", "checkbox").addClass("category-check-input");
        let categoryLabel = $("<label>").addClass("category-label").text(item);
        let itemLink = $("<a>").attr("href", "#").addClass("dropdown-item");
        dropdownContent.append(itemLink.append(categoryLabel, checkbox));
    });
    dropdown.append(dropdownButton, dropdownContent);
    categoriesList.append($("<li>").append(dropdown));
});

categoriesBar.append(sortingList, categoriesList);

for (let i = 0; i < 85; i++) {
    let cardWrapper = $("<a>").attr("href", "#").addClass("cardWrapper");
    let card = $("<div>");
    let cardimage = $("<img>").attr("src", "../images/BU.png").addClass("card-img-top");
    let cardBody = $("<div>").addClass("card-body");
    let heart = $("<button>").addClass("far fa-heart cardHollowHeart");
    let name = $("<h3>").attr("id", "items-page-jewel-name").text("שם התכשיט");    
    let price = $("<p>").attr("id", "items-page-jewel-price").text("₪מחיר");
    let numCards = cardsContainer.children().length;
    
    cardBody.append(name, price);
    card.addClass("card").append(heart, cardimage, cardBody);
    cardsContainer.append(cardWrapper.append(card));
    $("body").append(categoriesBar, cardsContainer, pageNumRow);

    if (numCards % 40 == 1 && numCards != 1) {
        maxPage++;
        pageNum.text(`${currentPage}/${maxPage}`);
    }
    showPage(currentPage);
}

$(document).on("click", ".dropdownMenuButton", function(event) {
    let flag = $(event.target).hasClass('is-active');
    $('.dropdownMenuButton').removeClass('is-active');
    if(!flag){
        $(event.target).addClass('is-active');
    }
});

$(document).on("click", function(event) {
    if (!$(event.target).closest('.dropdownMenuButton').length) {
        $('.dropdownMenuButton').removeClass('is-active');
    }
});

$(document).on("click", ".cardHollowHeart", function(event) {
    event.stopPropagation();
    event.preventDefault();
    $(event.target).removeClass("far cardHollowHeart").addClass("fas cardFullHeart");
});

$(document).on("click", ".cardFullHeart", function(event) {
    event.stopPropagation();
    event.preventDefault();
    $(event.target).removeClass("fas cardFullHeart").addClass("far cardHollowHeart");
});

previousPage.click(function(){
    if (currentPage > 1) {
        currentPage--;

        showPage(currentPage);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

nextPage.click(function(){
    if (currentPage < maxPage) {
        currentPage++;

        showPage(currentPage);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

showPage(currentPage);

function showPage(pageNumber) {
    let numCards = cardsContainer.children().length;
    let startIndex = (pageNumber - 1) * 40;
    let endIndex = Math.min(startIndex + 40, numCards);
    let items = cardsContainer.children();
    
    for (let i = 0, j = 1; i < items.length; i++) {
        if (i >= startIndex && i < endIndex) {
            items.eq(i).css("display", "list-item");
            items.eq(i).attr("value", startIndex + j++);
        } else {
            items.eq(i).css("display", "none");
        }
    }
    pageNum.text(`${pageNumber}/${maxPage}`);
}