import {accordionDataOrders, accordionDataShipments, accordionDataReturns, accordionDataPayments, accordionDataMaterials} from './data.js';
// Need to seperate between data and functions 
// import data for Q&A page

// Neccessary part

const qaArraay = [accordionDataOrders, accordionDataShipments, accordionDataReturns, accordionDataPayments, accordionDataMaterials];
const qaSections = ['הזמנות מהאתר', 'משלוחים', 'החזרות וזיכויים', 'תשלומים', 'חומרים ואחריות'];

  
function createAccordion(){
    // Creating a div for the entire content
    const accordionsContainer = $('<div>').attr('id', 'qa-page-accordions');
    const pageAccordionHeader = $('<h3>').text('Q & A').addClass('qa-page-header');
    $('body').append(pageAccordionHeader).append(accordionsContainer);

    // Iterating over both arrays and performing the required actions
    for (let i = 0; i < qaSections.length; i++) {
        const section = qaSections[i];
        const dataArray = qaArraay[i];

        // Creating the section title
        const sectionTitle = $('<h6>').text(section).addClass('qa-page-section-title');

        // Creating the accordion container
        const accordionContainer = $('<div>').addClass('qa-page-accordion-container');

        // Iterating over the data array to create the accordion items
        dataArray.forEach(item => {
            // Creating accordion item elements
            const accordionItem = $('<div>').addClass('qa-page-accordion-item');
            const accordionHeader = $('<div>').addClass('qa-page-accordion-header');
            const accordionContent = $('<div>').addClass('qa-page-accordion-content');

            // Creating the +/- button for opening/closing the accordion
            const icon = $('<span>').addClass('qa-page-toggle-icon').text('+');
            const toggleButton = $('<button>').addClass('qa-page-toggle-button').append(icon);

            // Adding click event listener to toggle the accordion
            toggleButton.on('click', function() {
                $(this).toggleClass('active');
                accordionContent.slideToggle();
                icon.text(function(_, text) {
                    return text === '+' ? '-' : '+';
                });
            });

            // Setting the item text as the accordion title
            const title = $('<span>').text(item.title).addClass('qa-page-accordion-q');

            // Adding the content rows to the accordion
            const contentContainer = $('<div>').addClass('qa-page-accordion-a');
            item.content.forEach(row => {
                const contentRow = $('<p>').addClass('qa-page-content-row').text(row);
                contentContainer.append(contentRow);
            });

            // Appending elements to create the accordion item
            accordionHeader.append(toggleButton, title);
            accordionContent.append(contentContainer);
            accordionItem.append(accordionHeader, accordionContent);
            accordionContainer.append(accordionItem);
        });

        // Appending section title and accordion container to the main container
        accordionsContainer.append(sectionTitle, accordionContainer);
    }
}  

// Call the function to create the accordion
createAccordion();
  