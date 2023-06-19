const content = [
    { content: 'החלפות והחזרות' },
    { content: 'שאלות ותשובות' },
    { content: 'תקנון האתר' },
    { content: 'מדריך מידות' },
    { content: 'About me' }
];

const socialLinks = {
    "Facebook" : "https://www.facebook.com/people/B-U-jewelry/100092493216985",
    "Instagram" : "https://instagram.com/bujewelry_?igshid=MjEwN2IyYWYwYw"
}

const footerDiv = $("<div>").attr("id", "home-page-footer-div");
const footer = $("<footer>").attr("id", "home-page-footer").addClass("row py-4");
const footerCategories = $("<div>").attr("id", "home-page-footer-categories").addClass("col")
const footerContentList = $("<ul>").addClass("nav flex-col gap-5");

$("body").append(footerDiv.append(footer.append(footerCategories.append(footerContentList))));

$.each(content, function(index, text){
    let link = $("<a>").attr("href", "#").text(text.content);
    let listItem = $("<li>").addClass("nav-item mb-2");
    footerContentList.append(listItem.append(link));
});

const footerIconContainer = $("<div>").attr("id", "home-page-footer-icon-container");
const footerIconList = $("<ul>").attr("id", "home-page-footer-icon-list").addClass("social-links pl3-sm");
footer.append(footerIconContainer.append(footerIconList));

$.each(socialLinks, function(name, content){
    let lowerCaseName = name.toLowerCase();
    let link = $('<a>').attr('target', '_blank').attr('aria-label', name).attr('title', name).attr('data-type', 'click_navFooter').attr('data-path', 'social:' + name).attr('href', content).addClass('social-link footer-link fab fa-' + lowerCaseName).attr('data-pre', 'ILink');
    footerIconList.append($("<li>").append(link));
});
