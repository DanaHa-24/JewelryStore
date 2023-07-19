const dropdownArray = {
  Bracelet: {
    title: 'צמידים',
    materials: [{ beads: 'חרוזים' }, { pearl: 'פנינים' }, { silver: 'כסף' }],
  },
  Ring: {
    title: 'טבעות',
    materials: [{ pearl: 'פנינים' }, { silver: 'כסף' }, { stone: 'אבן' }],
  },
  Earring: {
    title: 'עגילים',
    materials: [{ pearl: 'פנינים' }, { silver: 'כסף' }, { stone: 'אבן' }],
  },
  Necklace: {
    title: 'שרשראות',
    materials: [{ pearl: 'פנינים' }, { silver: 'כסף' }, { macrame: 'מקרמה' }],
  },
};

const adminNavIcons = [
  {
    name: 'admin',
    class: 'fas fa-user-shield',
    page: '/admin',
  },
  {
    name: 'statistics',
    class: 'fas fa-chart-bar',
    page: '/statistics',
  },
];

const navIcons = [
  {
    name: 'cart',
    class: 'fas fa-shopping-cart',
    page: '/cart',
  },
  {
    name: 'wishlist',
    class: 'fas fa-heart',
    page: '/wishlist',
  },
  {
    name: 'profile',
    class: 'fas fa-user',
    page: '/profile',
  },
  {
    name: 'contact',
    class: 'fas fa-envelope',
    page: '/contact',
  },
];

$(document).ready(async function () {
  const header = $('#home-page-header');
  const nav = $('<nav>').attr('id', 'home-page-navbar').addClass('navbar navbar-expand-lg');
  const navbarDiv = $('<div>').addClass('collapse navbar-collapse');

  header.append(nav.append(navbarDiv));

  const headerLinks = $('<ul>').attr('id', 'home-page-header-links').addClass('navbar-nav');
  const searchInput = $('<input>')
    .addClass('form-control')
    .attr('id', 'home-page-search-input')
    .attr('type', 'text')
    .attr('placeholder', 'Search');
  const searchButton = $('<button>').addClass('btn').attr('id', 'home-page-search-button').attr('type', 'button');
  const searchDiv = $('<div>').addClass('input-group mb-3').append(searchInput, searchButton);
  const searchLi = $('<li>').append(searchDiv);

  searchButton.append($('<i>').addClass('fas fa-search'));
  headerLinks.append(searchLi);

  searchButton.click(function () {
    let searchWord = searchInput.val();
    if (searchWord == null) {
      return;
    } else {
      window.location.href = `items?search=${searchWord}`;
    }
  });

  $.each(navIcons, function (index, link) {
    let iconLink;
    let icon;
    if (link.name == 'profile' && localStorage.getItem('token') == null) {
      iconLink = $('<a>').attr('href', '/login').addClass('nav-link');
      icon = $('<i>').addClass(link.class);
    } else {
      iconLink = $('<a>').attr('href', link.page).addClass('nav-link');
      icon = $('<i>').addClass(link.class);
    }
    iconLink.append(icon);
    headerLinks.append($('<li>').append(iconLink));
  });

  navbarDiv.append(headerLinks);

  const headerCategories = $('<ul>').attr('id', 'home-page-header-categories').addClass('navbar');
  $.each(dropdownArray, function (label, items) {
    let dropdown = $('<div>').addClass('dropdown');
    let dropdownLabel = $('<button>')
      .text(items.title)
      .click(function () {
        window.location.href = `/items?type=${label}`;
      });

    let dropdownContent = $('<div>').addClass('dropdown-content container');

    $.each(items.materials, function (index, item) {
      $.each(item, function (key, value) {
        let itemLink = $('<a>').attr('href', `items?type=${label}&material=${key}`).text(value);
        dropdownContent.append(itemLink);
      });
    });
    dropdown.append(dropdownLabel, dropdownContent);
    headerCategories.append($('<li>').append(dropdown));
  });

  if (localStorage.getItem('token') != null) {
    const userRole = await ajaxRequest('/auth/check', 'GET');

    if (userRole === 'admin') {
      $.each(adminNavIcons, function (index, link) {
        let iconLink = $('<a>').attr('href', link.page).addClass('nav-link');
        let icon = $('<i>').addClass(link.class);
        iconLink.append(icon);
        headerLinks.append($('<li>').append(iconLink));
      });
    }
  }

  navbarDiv.append(headerCategories);

  const imageLink = $('<a>').attr('href', '/').attr('id', 'home-page-image-container').addClass('navbar-brand');
  const canvas = $('<canvas>').attr('id', 'home-page-header-myCanvas').attr('width', '80').attr('height', '50');

  const ctx = canvas[0].getContext('2d');

  ctx.font = "40px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("B", 20, 50);
  ctx.fillText("U", 50, 50);

  imageLink.append(canvas);
  navbarDiv.append(imageLink);
});
