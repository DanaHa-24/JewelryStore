import { aboutUsText } from './constVars.js';

$(document).ready(function () {
  // Create container
  const aboutContainer = $('<div>').attr('id', 'about-page-container').addClass('container my-5 about-page-container');

  // Create row
  const aboutRow = $('<div>').addClass('about-page-row d-flex justify-content-center align-items-center');
  aboutContainer.append(aboutRow);

  // Create content container about us
  const aboutContent = $('<div>').addClass('col-lg-8').attr('id', 'about-page-content');
  aboutRow.append(aboutContent);

  // Create heading
  const aboutHeader = $('<h1>').addClass('mb-4').text('הסיפור שלנו').attr('id', 'about-page-header');
  aboutContent.append(aboutHeader);

  aboutUsText.forEach((text) => {
    const aboutLine = $('<p>').text(text);
    aboutContent.append(aboutLine);
  });

  // Append image
  const aboutImage = $('<img>')
    .attr(
      'src',
      'https://deih43ym53wif.cloudfront.net/kuta-bali-beach-indonesia-shutterstock_297303287.jpg_9b516347e5.jpg'
    )
    .addClass('img-fluid my-4');
  aboutContent.append(aboutImage);

  // Append container to the body
  $('body').append(aboutContainer);
});
