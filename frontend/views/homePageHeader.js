const dropdownArray = {
    'צמידים': ['חרוזים', 'פנינים', 'כסף', 'מקרמה'],
    'טבעות': ['חרוזים', 'פנינים', 'כסף', 'אבן'],
    'עגילים': ['כסף'],
    'שרשראות': ['חרוזים', 'פנינים', 'כסף', 'מקרמה']
};

const navIcons = [
    { class: 'fas fa-shopping-cart' },
    { class: 'fas fa-heart' },
    { class: 'fas fa-user' }
];

const header = $("<header>").attr("id", "home-page-header");
const nav = $("<nav>").attr("id", "home-page-navbar").addClass("navbar navbar-expand-lg sticky-top");
const image = $("<img>").attr("src", "../images/BU.png");
const navbarDiv = $("<div>").addClass("collapse navbar-collapse");
const imageLink = $("<a>").attr("id", "#").attr("id", "home-page-image-container").addClass("navbar-brand");

$("body").append(header.append(nav.append(navbarDiv.append(imageLink.append(image)))));

const headerCategories = $("<ul>").attr("id", "home-page-header-categories").addClass("navbar-nav");
$.each(dropdownArray, function(label, items){
    let dropdown = $("<div>").addClass("dropdown");
    let dropdownLabel = $("<label>").text(label);
    let dropdownContent = $("<div>").addClass("dropdown-content container");
    
    $.each(items, function(index, item){
        let itemLink = $("<a>").attr("href", "#").text(item);
        dropdownContent.append(itemLink);
    });
    dropdown.append(dropdownLabel, dropdownContent);
    headerCategories.append($("<li>").append(dropdown));
});
navbarDiv.append(headerCategories);

const headerLinks = $("<ul>").attr("id", "home-page-header-links").addClass("navbar-nav");

$.each(navIcons, function(index, link){
    let iconClass = link.class;
    let iconLink = $("<a>").attr("href", "#").addClass("nav-link");
    let icon = $("<i>").addClass(iconClass);
    
    iconLink.append(icon);
    headerLinks.append($("<li>").append(iconLink));
});
navbarDiv.append(headerLinks);

const searchInput = $("<input>").addClass("form-control").attr("id", "home-page-search-input").attr("type", "text").attr("placeholder", "Search");
const searchButton = $("<button>").addClass("btn").attr("id", "home-page-search-button").attr("type", "button");
searchButton.append($("<i>").addClass("fas fa-search"));
const searchDiv = $("<div>").addClass("input-group mb-3").append($("<div>").append(searchButton), searchInput);
const searchLi = $("<li>").append(searchDiv);
headerLinks.append(searchLi);