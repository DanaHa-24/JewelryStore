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

const nav = $("<nav>").attr("id", "header").addClass("navbar navbar-expand-lg sticky-top");
const canvas = $("<canvas>").attr("id", "myCanvas");
const context = canvas[0].getContext('2d');
const canvasLink = $("<a>").attr("href", "#").addClass("navbar-brand").append(canvas);
const navbarDiv = $("<div>").addClass("collapse navbar-collapse").append(canvasLink);

$("body").append(nav.append(navbarDiv.append(canvasLink.append(canvas))));

const headerCategories = $("<ul>").attr("id", "headerCategories").addClass("navbar-nav");
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

const headerLinks = $("<ul>").attr("id", "headerLinks").addClass("navbar-nav");

$.each(navIcons, function(index, link){
    let iconClass = link.class;
    let iconLink = $("<a>").attr("href", "#").addClass("nav-link");
    let icon = $("<i>").addClass(iconClass);
    
    iconLink.append(icon);
    headerLinks.append($("<li>").append(iconLink));
});
navbarDiv.append(headerLinks);

const searchInput = $("<input>").addClass("form-control").attr("id", "searchInput").attr("type", "text").attr("placeholder", "Search");
const searchButton = $("<button>").addClass("btn").attr("id", "searchButton").attr("type", "button");
searchButton.append($("<i>").addClass("fas fa-search"));
const searchDiv = $("<div>").addClass("input-group mb-3").append($("<div>").append(searchButton), searchInput);
const searchLi = $("<li>").append(searchDiv);
headerLinks.append(searchLi);

const image = new Image();
image.src = "../images/BU.png";

image.onload = function() {
    canvas[0].width = image.width / 3;            
    canvas[0].height = image.height / 3;

    let scaleFactor = Math.min(canvas[0].width / image.width, canvas[0].height / image.height);

    let scaledWidth = image.width * scaleFactor;
    let scaledHeight = image.height * scaleFactor;

    let x = (canvas[0].width - scaledWidth) / 2;
    let y = (canvas[0].height - scaledHeight) / 2;

    context.imageSmoothingEnabled = true;
    context.drawImage(image, x, y, scaledWidth, scaledHeight);
};
