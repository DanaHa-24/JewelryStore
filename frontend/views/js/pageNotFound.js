const logo404 = $('<img>').addClass('page-not-found-logo');
// Set the image source (URL) and alt text
logo404.attr('src', '/images/404logo.png');
logo404.attr('alt', '404 Logo');

const errorText = $('<div>').addClass('page-not-found-text-container');
const titleText = $('<h1>').addClass('page-not-found-title').text('Oopss...');
const contentA = $('<p>').addClass('page-not-found-contentB').text('The page you requested could not be found');
const contentB = $('<p>').addClass('page-not-found-contentA').text('We are working on it :)');
const homepageButton = $('<button>').addClass('btn btn-primary').attr('id','page-not-found-home-btn').text('Go to Homepage');
homepageButton.on('click', function() {
  window.location.href = '/'; // Replace with the actual URL of your homepage
});

$(errorText).append(titleText, contentA, contentB, homepageButton);

const div404 = $('<div>').addClass('page-not-found-container');

$(div404).append(logo404);
$('body').append(div404, errorText);