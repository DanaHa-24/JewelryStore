const content = [
  {   content: 'החלפות והחזרות',
      page: '/exchange-return'
  },
  {   content: 'שאלות ותשובות',
      page: '/qa'
  },
  {   content: 'תקנון האתר',
      page: '/terms'
  },
  {   content: 'מדריך מידות',
      page: '/size-guide'
  },
  {   content: 'רשימת סניפים',
      page: '/stores'
  },
  {   content: 'About us',
      page: '/about'
  }
];

const socialLinks = {
  "Facebook" : "https://www.facebook.com/people/B-U-jewelry/100092493216985",
  "Instagram" : "https://instagram.com/beyoujewelry__?igshid=MjEwN2IyYWYwYw=="
}

const footerDiv = $("<div>").attr("id", "home-page-footer-div");
const footer = $("<footer>").attr("id", "home-page-footer").addClass("row py-4");
const footerIconContainer = $("<div>").attr("id", "home-page-footer-icon-container");
const footerIconList = $("<ul>").attr("id", "home-page-footer-icon-list").addClass("social-links pl3-sm");

$("html").append(footerDiv.append(footer.append(footerIconContainer.append(footerIconList))));

const footerCategories = $("<div>").attr("id", "home-page-footer-categories").addClass("col")
const footerContentList = $("<ul>").addClass("nav flex-col gap-5");

footer.append(footerCategories.append(footerContentList));

$.each(socialLinks, function(name, content){
  let lowerCaseName = name.toLowerCase();
  let link = $('<a>').attr('target', '_blank').attr('aria-label', name).attr('title', name).attr('data-type', 'click_navFooter').attr('data-path', 'social:' + name).attr('href', content).addClass('social-link footer-link fab fa-' + lowerCaseName).attr('data-pre', 'ILink');
  footerIconList.append($("<li>").append(link));
});

$.each(content, function(index, text){
  let link = $("<a>").attr("href", text.page).text(text.content);
  let listItem = $("<li>").addClass("nav-item mb-2");
  footerContentList.append(listItem.append(link));
});