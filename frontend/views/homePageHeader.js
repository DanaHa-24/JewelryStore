const dropdownArray = {
    'Bracelet' : { 
        'title' : 'צמידים', 
        'materials' : [
            {'beads' : 'חרוזים'}, 
            {'pearl' : 'פנינים'}, 
            {'silver' : 'כסף'}, 
            {'macrame' : 'מקרמה'}
        ]
    },
    'Ring' : { 
        'title' : 'טבעות', 
        'materials' : [
            {'beads' : 'חרוזים'}, 
            {'pearl' : 'פנינים'}, 
            {'silver' : 'כסף'}, 
            {'stone' : 'אבן'}
        ]
    },
    'Earring' : { 
        'title' : 'עגילים', 
        'materials' : [
            {'silver' : 'כסף'}
        ]
    },
    'Necklace' : { 
        'title' : 'שרשראות', 
        'materials' : [
            {'beads' : 'חרוזים'}, 
            {'pearl' : 'פנינים'}, 
            {'silver' : 'כסף'}, 
            {'macrame' : 'מקרמה'}
        ]
    }
};

const navIcons = [
    { 
        class: 'fas fa-shopping-cart', 
        page: 'cartPage.html'
    },
    { 
        class: 'fas fa-heart',
        page: 'wishlistPage.html'
    },
    { 
        class: 'fas fa-user',
        page: 'profilePage.html'
    }
];

const header = $("<header>").attr("id", "home-page-header").addClass("sticky-top");
const nav = $("<nav>").attr("id", "home-page-navbar").addClass("navbar navbar-expand-lg");
const navbarDiv = $("<div>").addClass("collapse navbar-collapse");

$("body").append(header.append(nav.append(navbarDiv)));

const headerLinks = $("<ul>").attr("id", "home-page-header-links").addClass("navbar-nav");
const searchInput = $("<input>").addClass("form-control").attr("id", "home-page-search-input").attr("type", "text").attr("placeholder", "Search");
const searchButton = $("<button>").addClass("btn").attr("id", "home-page-search-button").attr("type", "button");
const searchDiv = $("<div>").addClass("input-group mb-3").append(searchInput, searchButton);
const searchLi = $("<li>").append(searchDiv);

searchButton.append($("<i>").addClass("fas fa-search"));
headerLinks.append(searchLi);

$.each(navIcons, function(index, link){
    let iconLink = $("<a>").attr("href", link.page).addClass("nav-link");
    let icon = $("<i>").addClass(link.class);
    
    iconLink.append(icon);
    headerLinks.append($("<li>").append(iconLink));
});
navbarDiv.append(headerLinks);

const headerCategories = $("<ul>").attr("id", "home-page-header-categories").addClass("navbar");
$.each(dropdownArray, function(label, items){
    let dropdown = $("<div>").addClass("dropdown");
    let dropdownLabel = $("<label>").text(items.title);
    let dropdownContent = $("<div>").addClass("dropdown-content container");
    
    $.each(items.materials, function(index, item){
        $.each(item, function(key, value) {
            let itemLink = $("<a>").attr("href", `itemsPage.html?type=${label}&material=${key}`).text(value);
            dropdownContent.append(itemLink);
        });
    });
    dropdown.append(dropdownLabel, dropdownContent);
    headerCategories.append($("<li>").append(dropdown));
});
navbarDiv.append(headerCategories);

const imageLink = $("<a>").attr("href", "homePage.html").attr("id", "home-page-image-container").addClass("navbar-brand");
const image = $("<img>").attr("src", "../images/BU.png");
navbarDiv.append(imageLink.append(image));