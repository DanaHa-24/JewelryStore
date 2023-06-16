$(document).ready(function() {
    // Create navbar
    const navbar = $('<div>').addClass('profile-page-navbar');
    const tabsList = $('<ul></ul>').addClass('profile-page-options');
  
    const tabs = [
      {
        text: 'ההזמנות שלי',
        content: 'הזמנות שלי',
        action: handleMyOrders
      },
      {
        text: 'הכתובות שלי',
        content: 'כתובות שלי',
        action: handleMyAddress
      },
      {
        text: 'פרטי התחברות',
        content: 'פרטי התחברות',
        action: handleMyDetails
      },
      {
        text: 'Wishlist',
        content: 'Wishlist',
        action: handleMyWishList
      }
    ];
  
    // Create profile section
    const profile = $('<div class="profile-header-container"></div>');
    const infoContainter = $('<div>').addClass('profile-page-subtitle');
    profile.append(($('<h1>החשבון שלי</h1>').addClass('profile-page-header')), infoContainter);


    const info = $('<p>שמחים לראות אותך שוב</p>').addClass('profile-page-info');
    const heart = $('<i class="far fa-heart" style="color: #fe39c9;"></i>').attr('id','profile-page-heart');
    infoContainter.append(info,heart);
    profile.append(infoContainter);
    $('body').append(profile);
    
    
    // Create profile navbar
    for (let i = 0; i < tabs.length; i++) {
      let tab = $('<li class="tab">' + tabs[i].text + '</li>');
      tab.data('content', tabs[i].content);
      tab.on('click', tabs[i].action);
      tabsList.append(tab);
    }
  
    navbar.append(tabsList);
    const dots = $('<div class="profile-page-dots">&#8230;</div>');
    navbar.append(dots);
    $('body').append(navbar);

    // Toggle navbar when the window is resized
    $(window).resize(function() {
      toggleNavbar();
    });
  
    // Initial toggle when the page loads
    toggleNavbar();
  
    // Function to toggle the visibility of tabs and dots
    function toggleNavbar() {
      let windowWidth = $(window).width();
  
      if (windowWidth <= 800) {
        $('.profile-page-navbar .profile-page-dots').show();
        $('.profile-page-navbar ul').hide();
      } else {
        $('.profile-page-navbar .profile-page-dots').hide();
        $('.profile-page-navbar ul').show();
      }
    }
  
    // Toggle the visibility of tabs when dots are clicked
    $('.profile-page-dots').click(function() {
      $('.profile-page-navbar ul').toggle();
    });
  
    // Show tab content on tab click
    $('.profile-page-navbar .tab').click(function() {
      let content = $(this).data('content');
      $('.profile-page-info').text(content);
      $('#heart-profile').detach(); // Detach the heart element by its ID
    });
});


/// Need to complete this section by taking from db and add the ability to edit address, wishlist, userDetails
function handleMyOrders(){
    console.log("my wish list is:");
}

function handleMyAddress(){
    console.log("my wish list is:");
}

function handleMyDetails(){
    console.log("my wish list is:");
}

function handleMyWishList(){
    console.log("my wish list is:");
}



  