const sortingArray = ['הכי פופולרי', 'החדשים ביותר', 'מהנמוך לגבוה', 'מהגבוה לנמוך'];

const categoriesArray = [
  {
    hebrew: 'צבע',
    english: 'color',
  },
  {
    hebrew: 'מידה',
    english: 'size',
  },
  {
    hebrew: 'חומר',
    english: 'material',
  },
  {
    hebrew: 'סטייל',
    english: 'style',
  },
];

const categoriesBar = $('<nav>').attr('id', 'items-page-categories-bar').addClass('navbar navbar-expand-lg sticky-top');
const categoriesList = $('<ul>').attr('id', 'items-page-categories-list').addClass('navbar-nav');
const sortingList = $('<ul>').attr('id', 'items-page-sorting-list').addClass('navbar-nav');
const cardsContainer = $('<div>').attr('id', 'items-page-jewelry-cards-container').addClass('container');
const pageNumRow = $('<div>').attr('id', 'items-page-page-num-row');
const previousPage = $('<button>').attr('id', 'items-page-previous-page-button').addClass('fas fa-chevron-left');
const pageNum = $('<label>').attr('id', 'items-page-page-num-label');
const nextPage = $('<button>').attr('id', 'items-page-next-page-button').addClass('fas fa-chevron-right');

let currentPage = 1;
let maxPage = 1;

// ------------------------------------ Filters

let filters = {
  color: [],
  size: [],
  material: [],
  style: [],
  type: '',
  search: '',
  sort: -1,
};

function initFilters() {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  // extract filters from url
  if (params.has('search')) {
    filters.search = params.get('search');
  }
  if (params.has('type')) {
    filters.type = params.get('type');
  }
  if (params.has('color')) {
    filters.color = params.get('color').split(',');
  }
  if (params.has('size')) {
    filters.size = params.get('size').split(',');
  }
  if (params.has('material')) {
    filters.material = params.get('material').split(',');
  }
  if (params.has('style')) {
    filters.style = params.get('style').split(',');
  }
  if (params.has('sort')) {
    filters.sort = Number(params.get('sort'));
  }
}

function serializeFilters(filters) {
  let query = '';

  if (filters.search.length > 0) {
    query += 'search=' + filters.search + '&';
  }

  if (filters.type.length > 0) {
    query += 'type=' + filters.type + '&';
  }

  if (filters.color.length > 0) {
    query += 'color=' + filters.color.join() + '&';
  }

  if (filters.size.length > 0) {
    query += 'size=' + filters.size.join() + '&';
  }

  if (filters.material.length > 0) {
    query += 'material=' + filters.material.join() + '&';
  }

  if (filters.style.length > 0) {
    query += 'style=' + filters.style.join() + '&';
  }

  if (filters.sort > -1) {
    query += 'sort=' + filters.sort + '&';
  }

  if (query.length > 0) {
    query = '?' + query.substring(0, query.length - 1);
  }
  return query;
}

function updateFilter(filter, category) {
  if (!filters[category].includes(filter)) {
    filters[category].push(filter);
  } else {
    const index = filters[category].indexOf(filter);
    if (index > -1) {
      filters[category].splice(index, 1);
    }
  }
}
// ------------------------------------ Filters

function queryItems(event) {
  const query = serializeFilters(filters);

  $.ajax({
    url: `item/${query}`,
    method: 'GET',
    success: function (response) {
      const items = response;
      currentPage = 1;
      createCategoryBar(items, filters);
      createItemCards(items, filters);
    },
    error: function (error) {
      console.error('Error retrieving all items:', error);
    },
  });
}

function createSortingBar(sortOptions) {
  let dropdown = $('<div>').addClass('dropdown row');
  let dropdownButton = $('<button>')
    .addClass('btn dropdown-toggle dropdownMenuButton')
    .attr('type', 'button')
    .attr('data-toggle', 'dropdown')
    .attr('aria-haspopup', 'true')
    .attr('aria-expanded', 'false')
    .text('מיין לפי');
  let dropdownContent = $('<div>').addClass('dropdown-menu');

  $.each(sortOptions, function (index, item) {
    let itemLink = $('<a>').attr('href', '#').addClass('dropdown-item').text(item);

    itemLink.click(function (event) {
      filters.sort = index;
      queryItems(filters);
    });
    dropdownContent.append(itemLink);
  });
  dropdown.append(dropdownButton, dropdownContent);
  sortingList.append($('<li>').append(dropdown));
}

function createCategoryBar(items, filters) {
  const sets = {
    color: new Set(),
    size: new Set(),
    material: new Set(),
    style: new Set(),
  };

  items.forEach(function (item) {
    item.color.forEach(sets.color.add, sets.color);
    item.size.forEach(sets.size.add, sets.size);
    item.material.forEach(sets.material.add, sets.material);
    item.style.forEach(sets.style.add, sets.style);
  });

  // appending all the data to the dropdowns
  $.each(sets, (category, set) => {
    appendUniqueItems(sets[category], `#items-page-category-${category}`, filters[category], category);
  });
}

function appendUniqueItems(uniqueItems, containerSelector, appliedFilters, category) {
  const container = $(containerSelector).empty();

  // sorting the items numerically and alphabetically
  const sortedItems = Array.from(uniqueItems).sort((a, b) => {
    return String(a).localeCompare(b, undefined, { numeric: true });
  });

  // appending the sorted items to the relevant dropdown
  sortedItems.forEach((item) => {
    let checkbox = $('<input>').attr('type', 'checkbox').addClass('category-check-input');
    let itemLink = $('<a>').attr('href', '#').addClass('dropdown-item').text(item);

    if (appliedFilters.includes(item)) {
      checkbox.prop('checked', !checkbox.prop('checked'));
    }

    itemLink.click(function (event) {
      event.preventDefault;
      event.stopPropagation;
      checkbox.prop('checked', !checkbox.prop('checked'));
      updateFilter(item, category);
      queryItems(filters);
    });

    checkbox.click(function (event) {
      event.preventDefault;
      event.stopPropagation;
      checkbox.prop('checked', !checkbox.prop('checked'));
    });
    container.append(itemLink.append(checkbox));
  });
}

async function createItemCards(items, filters) {
  // clear screen
  $(cardsContainer).empty();
  const isLogged = localStorage.getItem('token');
  const wishlist = isLogged ? await ajaxRequest('/api/wishlist', 'GET') : { items: [] };
  if (!filters) {
    items = items.sort((a, b) => {
      return b.amountInStock - a.amountInStock;
    });
  }

  items.forEach(function (item) {
    const productCard = ProductCard(item, wishlist);
    cardsContainer.append(productCard);
  });

  // if the array is empty, set max page to 1 instead of 0
  // else, calculate how many 40's there are
  maxPage = items.length != 0 ? Math.ceil(cardsContainer.children().length / 40) : 1;
  pageNum.text(`${currentPage}/${maxPage}`);
  $('body').append(cardsContainer, pageNumRow);
  showPage(currentPage, cardsContainer);
}

// -------------------------------------- Page Nav
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
      $(items[i]).css('display', 'block');
    } else {
      $(items[i]).css('display', 'none');
    }
  }
  pageNum.text(`${pageNumber}/${maxPage}`);
}

previousPage.click(function () {
  if (currentPage > 1) {
    currentPage--;

    showPage(currentPage, cardsContainer);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
});

nextPage.click(function () {
  if (currentPage < maxPage) {
    currentPage++;

    showPage(currentPage, cardsContainer);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
});

// -------------------------------------- Page Nav

initFilters();

// load items from initial query
$.ajax({
  url: `item/${serializeFilters(filters)}`,
  method: 'GET',
  success: function (response) {
    const items = response;
    createSortingBar(sortingArray);
    createCategoryBar(items, filters);
    createItemCards(items);
  },
  error: function (error) {
    console.error('Error retrieving all items:', error);
  },
});

pageNumRow.append(previousPage, pageNum, nextPage);

$.each(categoriesArray, function (index, category) {
  let dropdown = $('<div>').addClass('dropdown row');
  let dropdownButton = $('<button>')
    .addClass('btn dropdown-toggle dropdownMenuButton')
    .attr('type', 'button')
    .attr('data-toggle', 'dropdown')
    .attr('aria-haspopup', 'true')
    .attr('aria-expanded', 'false')
    .text(category.hebrew);
  let dropdownContent = $('<div>')
    .attr('id', 'items-page-category-' + category.english)
    .addClass('dropdown-menu');

  dropdown.append(dropdownButton, dropdownContent);
  categoriesList.append($('<li>').append(dropdown));
});

categoriesBar.append(sortingList, categoriesList);
$('body').append(categoriesBar);

// ------------------------------------------------------------- onClick Events
$(document).on('click', '.dropdownMenuButton', function (event) {
  let flag = $(event.target).hasClass('is-active');
  $('.dropdownMenuButton').removeClass('is-active');
  if (!flag) {
    $(event.target).addClass('is-active');
  }
});

$(document).on('click', function (event) {
  if (!$(event.target).closest('.dropdownMenuButton').length) {
    $('.dropdownMenuButton').removeClass('is-active');
  }
});
