const sortingArray = [
    { sortBy: 'הכי פופולרי' },
    { sortBy: 'החדשים ביותר' },
    { sortBy: 'מהנמוך לגבוה' },
    { sortBy: 'מהגבוה לנמוך' }
];

const categoriesArray = [
    { 
        hebrew: 'צבע',
        english: 'color'
    },
    { 
        hebrew: 'מידה',
        english: 'size'
    },    
    { 
        hebrew: 'חומר',
        english: 'material'
    },
    { 
        hebrew: 'סטייל',
        english: 'style'
    },
];

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
categoriesBar.append(sortingList, categoriesList);

createSortingBar(sortingArray)

function queryItems(event){
    let query = "";
    
    if(event != null && event.data.sort != null){
        query += "sort=" + event.data.sort;
    }

    let filters = {};
    $.each($(categoriesList).find(".dropdown-menu"), function(index, category){
        let categoryId = $(category).attr("id");
        let categoryTitle = categoryId.substring(categoryId.lastIndexOf("-") + 1);
        // let checkedFilters = [];

        filters[categoryTitle] = [];
        $.each($(category).children(), function(index, child){
            if($(child).find("input").is(":checked")){
                // checkedFilters.push(child);
                filters[categoryTitle].push(child.text);
            }
        });
    });

    let serializedFilters = "";
    $.each(filters, function(key, value) {
        if (value.length > 0) {
            serializedFilters += `&${key}=${value}`;
        }
    });
    query += serializedFilters
    
    $.ajax({
        url: `api/item/allItems?${query}`,
        method: "GET",
        success: function(response) {
            const items = response.items;
            currentPage = 1;
            createCategoryBar(items, filters);
            createItemCards(items);
        },
        error: function(error) {
          console.error('Error retrieving all items:', error);
        }
      });
}

function createSortingBar(array){
    let dropdown = $("<div>").addClass("dropdown row");
    let dropdownButton = $('<button>').addClass('btn dropdown-toggle dropdownMenuButton').attr('type', 'button').attr('data-toggle', 'dropdown').attr('aria-haspopup', 'true').attr('aria-expanded', 'false').text("מיין לפי");
    let dropdownContent = $('<div>').addClass('dropdown-menu');
    
    $.each(array, function(sortOption, item){
        let itemLink = $("<a>").attr("href", "#").addClass("dropdown-item").text(item.sortBy);
        
        itemLink.click({sort: sortOption}, queryItems);
        dropdownContent.append(itemLink);
    });
    dropdown.append(dropdownButton, dropdownContent);
    sortingList.append($("<li>").append(dropdown));
}


$.each(categoriesArray, function(index, category){
    let dropdown = $("<div>").addClass("dropdown row");
    let dropdownButton = $("<button>").addClass("btn dropdown-toggle dropdownMenuButton").attr("type", "button").attr("data-toggle", "dropdown").attr("aria-haspopup", "true").attr("aria-expanded", "false").text(category.hebrew);
    let dropdownContent = $('<div>').attr("id", "items-page-category-" + category.english).addClass('dropdown-menu');

    dropdown.append(dropdownButton, dropdownContent);
    categoriesList.append($("<li>").append(dropdown));
});

categoriesBar.append(sortingList, categoriesList);
$("body").append(categoriesBar);

let emptyFilters = {
    color: [], 
    size: [],
    material: [],
    style: []
}

let queryStart = window.location.href.indexOf('?')
let queryString = "";
if(queryStart > 0){
    queryString = window.location.href.slice(window.location.href.indexOf('?'))
}

// if you were to manually navegate to itemsPage, i want you to see something
$.ajax({
    url: `api/item/allItems${queryString}`,
    method: 'GET',
    success: function(response) {
        const items = response.items;
        createCategoryBar(items, emptyFilters);
        createItemCards(items);
    },
    error: function(error) {
      console.error('Error retrieving all items:', error);
    }
});

function createCategoryBar(items, filters) {
    const uniqueColors = new Set();
    const uniqueSizes = new Set();
    const uniqueMaterials = new Set();
    const uniqueStyles = new Set();

    // adding all the unique data from the specific category
    items.forEach(function(item) {
        item.color.forEach(function(color) {
            uniqueColors.add(color);
        });
        item.size.forEach(function(size) {
            uniqueSizes.add(size);
        });
        item.material.forEach(function(material) {
            uniqueMaterials.add(material);
        });
        item.style.forEach(function(style) {
            uniqueStyles.add(style);
        });
    });
    console.log(filters["color"]);
    // appending all the data to the dropdowns
    appendUniqueItems(uniqueColors, "#items-page-category-color", filters["color"]);
    appendUniqueItems(uniqueSizes, "#items-page-category-size", filters["size"]);
    appendUniqueItems(uniqueMaterials, "#items-page-category-material", filters["material"]);
    appendUniqueItems(uniqueStyles, "#items-page-category-style", filters["style"]);
}

function appendUniqueItems(uniqueItems, containerSelector, appliedFilters) {
    const container = $(containerSelector).empty();
    // sorting the items numerically and alphabetically
    const sortedItems = Array.from(uniqueItems).sort((a, b) => {
        return String(a).localeCompare(b, undefined, { numeric: true });
    });

    // appending the sorted items to the relevant dropdown
    sortedItems.forEach(item => {
        let checkbox = $('<input>').attr("type", "checkbox").addClass("category-check-input");
        let itemLink = $("<a>").attr("href", "#").addClass("dropdown-item").text(item);
        console.log(item);
        console.log(appliedFilters);

        if(appliedFilters.includes(item)){
            checkbox.prop("checked", !checkbox.prop("checked"));
        }
        
        itemLink.click(function(event){
            event.preventDefault;
            event.stopPropagation;
            checkbox.prop("checked", !checkbox.prop("checked"));
            queryItems(null);
        });

        checkbox.click(function(event){
            event.preventDefault;
            event.stopPropagation;
            checkbox.prop("checked", !checkbox.prop("checked"));
        });
        container.append(itemLink.append(checkbox));
    });
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

        showPage(currentPage, cardsContainer);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

nextPage.click(function(){
    if (currentPage < maxPage) {
        currentPage++;

        showPage(currentPage, cardsContainer);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

function createItemCards(items){
    $(cardsContainer).empty(); // to remove duplicates after the first use of the function
    items.forEach(function (item) {
        let cardWrapper = $("<a>").attr("href", "#").addClass("cardWrapper");
        let card = $("<div>").attr("id", "items-page" + item.id);

        // let cardImage = $("<img>").attr("src", item.image).addClass("card-img-top");
        let cardImage = $("<img>").attr("src", item.image).addClass("card-img-top");

        let cardBody = $("<div>").addClass("card-body");
        let heart = $("<button>").addClass("far fa-heart cardHollowHeart").css("background-color", "transparent");
        let name = $("<h3>").attr("id", "items-page-jewel-name").text(item.name);
        let price = $("<p>").attr("id", "items-page-jewel-price").text(`₪${item.price}`);
        
        cardBody.append(name, price);
        card.addClass("card").append(heart, cardImage, cardBody);
        cardsContainer.append(cardWrapper.append(card));
    });
    // if the array is empty, set max page to 1 instead of 0
    // else, calculate how many 40's there are
    maxPage = (items.length != 0) ? Math.ceil(cardsContainer.children().length / 40) : 1;
    pageNum.text(`${currentPage}/${maxPage}`);
    $("body").append(cardsContainer, pageNumRow);
    showPage(currentPage, cardsContainer);
}

function showPage(pageNumber, element) {
    let items;
  
    if (Array.isArray(element)) {
      items = element;
    } else {
      items = element.children();
    }
    let numCards = items.length;
    let startIndex = (pageNumber - 1) * 40;
    let endIndex = Math.min(startIndex + 40, numCards);
  
    for (let i = 0; i < numCards; i++) { 
        if (i >= startIndex && i < endIndex) {
            $(items[i]).css("display", "block");
        } else {
            $(items[i]).css("display", "none");
        }
    }
    pageNum.text(`${pageNumber}/${maxPage}`);
}