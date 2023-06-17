const sortingArray = {
    "מיין לפי" : ['החדשים ביותר', 'הכי פופולרי', 'מהגבוה לנמוך', 'מהנמוך לגבוה']
};

const categoriesArray = {
    'צבע': ['אדום', 'כחול', 'שחור', 'לבן'],
    'מידה': ['44', '46', '48', '50'],
    'מתכת': ['יהלום', 'זהב', 'כסף'],
    'סוג': ["טבעות"]
};

const categoriesBar = $("<nav>").attr("id", "categoriesBar").addClass("navbar navbar-expand-lg");
const categoriesList = $("<ul>").attr("id", "categoriesList").addClass("navbar-nav");
const sortingList = $("<ul>").attr("id", "sortingList").addClass("navbar-nav");
const cardsContainer = $("<div>").attr("id", "jewelryCardsContainer").addClass("container");
const pageNumRow = $("<div>").attr("id", "pageNumRow");
const previousPage = $("<button>").attr("id", "previousPageButton").addClass("fas fa-chevron-left");
const pageNum = $("<label>").attr("id", "pageNumLabel");
const nextPage = $("<button>").attr("id", "nextPageButton").addClass("fas fa-chevron-right");
let currentPage = 1;
let maxPage = 1;

pageNumRow.append(previousPage, pageNum, nextPage);

$.each(sortingArray, function(category, items){
    let dropdown = $("<div>").addClass("dropdown row");
    let dropdownButton = $('<button class="btn dropdown-toggle dropdownMenuButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">').text(category);
    let dropdownContent = $('<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">');
    $.each(items, function(index, item){
        let itemLink = $("<a>").attr("href", "#").addClass("dropdown-item").text(item);
        dropdownContent.append(itemLink);
    })
    dropdown.append(dropdownButton, dropdownContent);
    sortingList.append($("<li>").append(dropdown));
});

$.each(categoriesArray, function(category, items){
    let dropdown = $("<div>").addClass("dropdown row");
    let dropdownButton = $('<button class="btn dropdown-toggle dropdownMenuButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">').text(category);
    let dropdownContent = $('<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">');
    $.each(items, function(index, item){
        let itemLink = $("<a>").attr("href", "#").addClass("dropdown-item").text(item);
        dropdownContent.append(itemLink);
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
    let name = $("<h3>").attr("id", "jewelName").text("שם התכשיט");    
    let price = $("<p>").attr("id", "jewelPrice").text("₪מחיר");
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