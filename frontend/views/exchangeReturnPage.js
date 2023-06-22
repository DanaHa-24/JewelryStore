import {dataExchangesAndReturns} from './constVars.js';

function exchangeAndReturns() {
    const infoContainer = $('<div>').addClass('er-page-info-container');
    const contentContainer = $('<div>').addClass('er-page-content');
    const headerContainer = $('<h1>').text('החלפות / החזרות').addClass('er-page-header');
    $('body').append(headerContainer).append(infoContainer);

    infoContainer.append(contentContainer);
    dataExchangesAndReturns.forEach((item, index) => {
        const infoItem = $('<div>').addClass('er-page-info-item');
        const infoHeader = $('<div>').addClass('er-page-info-header');
        const infoContent = $('<div>').addClass('er-page-info-content');
        const title = $('<span>').text(item.title);
  
        infoHeader.append(title);
        infoItem.append(infoHeader, infoContent);
        contentContainer.append(infoItem);
        item.content.forEach(row => {
          const contentRow = $('<p>').addClass('er-page-content-row').text(row);
          infoContent.append(contentRow);
        });
    });
}

exchangeAndReturns();