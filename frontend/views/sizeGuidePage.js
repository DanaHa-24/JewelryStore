$(document).ready(function() {
  const sizeGuideHeader= $('<h1>מדריך מידות לטבעת</h1>').addClass("size-guide-header");
  const sizeGuideContainer = $('<div>').addClass('sizeguide-page-container');
  $('body').append(sizeGuideHeader);
  $('body').append(sizeGuideContainer);

  const howToOrderArraay = ["רוצה להזמין טבעת אבל לא יודעת מה המידה שלך?",
   "אל דאגה! ישנן מספר שיטות לבדיקת מידת הטבעת שלך."];
  howToOrderArraay.forEach((item) => {
    const infoItem = $('<p>').addClass('infoSG-item').text(item).attr("id","SG-page-p");
    sizeGuideContainer.append(infoItem);
  });

  const methods = [
    {
      title: "שיטה 1 – מדידת גודל טבעת באמצעות אפליקציה ייעודית",
      content: "מדידת גודל טבעת באמצעות אפליקציה ייעודית לנייד היא אפשרות פשוטה ונוחה.<br>על מנת לעשות את זה פשוט הוריד/י את האפליקציה המתאימה לטלפון הנייד שלך:"
    },
    {
      title: "שיטה 2- מדידת היקף האצבע",
      content: "(רלוונטית בעיקר כשאין ברשותך טבעת קיימת במידה שאת רוצה)<br><br>מה צריך?<br>*סרט מדידה / סרגל<br>*פיסת נייר דקה<br>*עט או עיפרון"
    }
  ];

  const sgMethodLinks = [
    {
      title :"קישור למכשירי אנדרואיד- קליק להורדה",
      link : "https://play.google.com/store/apps/details?id=ru.cherrydesign.ringsizer",
      content : "ring sizer אנדרואיד"
    },
    {
      title :"קישור למכשירי אייפון- קליק להורדה",
      link : "https://apps.apple.com/il/app/id795721582",
      content : "ring sizer אייפון"
    }
  ]

  const sgLinks = $('<div class="sg-link"></div>');

  $.each(methods, function(index, method) {
    let methodHtml = $('<p></p>').addClass("sg-method-div");
    let methodTitle = $('<strong><u>' + method.title + '</u></strong>').addClass("sg-method-title");
    methodHtml.append(methodTitle);
    let methodContent = $('<br>' + method.content).addClass("sg-method-content");
    methodHtml.append(methodContent);
   
    if (index === 0) {
      $.each(sgMethodLinks, function(index, link) {
        let linkDesc = $("<div><strong>" + link.title + "</strong></div>");
        let linkElement = $("<div><a href='" + link.link + "'>" + link.content + "</a></div>");
        methodHtml.append(linkDesc, linkElement);
      });
    }
    sgLinks.append(methodHtml);
  });

  $(sizeGuideContainer).append(sgLinks);

  const instructions = $('<p></p>').addClass('sg-instructions');
  instructions.append('<span style="font-size: 14px;"><strong>הוראות ביצוע:</strong><br></span>');
  instructions.append('<span style="font-size: 14px;">1. חותכים רצועה דקה של נייר – רצוי שתהיה ישרה ולא עבה מדי.<br></span>');
  instructions.append('<span style="font-size: 14px;">2. עוטפים את רצועת הנייר סביב האצבע ומוודאים שהנייר נמצא מתחת לפרק האצבע וקרוב מספיק למפרק עצמו (החלק המחבר בין האצבע לכף היד).<br></span>');
  instructions.append('<span style="font-size: 14px;">3. מסמנים את הנקודה שבה הנייר נפגש ומודדים את האורך שיצא לנו עם הסרגל / סרט מדידה.<br></span>');
  instructions.append('<span style="font-size: 14px;">4. משתמשים בטבלה למטה כדי לבצע המרה של היקף הטבעת למידה שלה.</span>');

  $('body').append(instructions);

  const tableData = [
    { size: '7', usSize: '4', innerDiameter: '14.88', outerCircumference: '46.75' },
    { size: '8', usSize: '4.5', innerDiameter: '15.3', outerCircumference: '48' },
    { size: '9', usSize: '5', innerDiameter: '15.7', outerCircumference: '49.25' },
    { size: '10', usSize: '5.5', innerDiameter: '16.1', outerCircumference: '50' },
    { size: '11', usSize: '6', innerDiameter: '16.51', outerCircumference: '51.75' },
    { size: '12', usSize: '6.25', innerDiameter: '16.71', outerCircumference: '52.5' },
    { size: '13', usSize: '6.5', innerDiameter: '16.92', outerCircumference: '53.25' },
    { size: '14', usSize: '7', innerDiameter: '17.32', outerCircumference: '54.5' },
    { size: '15', usSize: '7.5', innerDiameter: '17.73', outerCircumference: '55.75' },
    { size: '16', usSize: '8', innerDiameter: '18.14', outerCircumference: '57' },
    { size: '17', usSize: '8.5', innerDiameter: '18.54', outerCircumference: '58.25' },
    { size: '18', usSize: '9', innerDiameter: '18.95', outerCircumference: '59.5' },
    { size: '19', usSize: '9.5', innerDiameter: '19.35', outerCircumference: '60.75' },
    { size: '20', usSize: '10', innerDiameter: '19.76', outerCircumference: '62' },
    { size: '21', usSize: '10.25', innerDiameter: '19.96', outerCircumference: '62.75' },
    { size: '22', usSize: '10.5', innerDiameter: '20.17', outerCircumference: '63.25' }
  ];

  const table = $('<table class="table table-bordered"></table>').attr("id","sg-size-table");
  const thead = $('<thead></thead>');
  const tbody = $('<tbody></tbody>');

  const headerRow = $('<tr></tr>');
  headerRow.append('<th class="size" scope="col">מידה ישראלית</th>');
  headerRow.append('<th class="size" scope="col">מידה אמריקאית</th>');
  headerRow.append('<th class="inner-diameter" scope="col">קוטר פנימי (מ"מ)</th>');
  headerRow.append('<th class="outer-circumference" scope="col">היקף חיצוני (מ"מ)</th>');

  thead.append(headerRow);
  table.append(thead);

  for (var i = 0; i < tableData.length; i++) {
    let row = $('<tr></tr>');
    row.append('<td class="size">' + tableData[i].size + '</td>');
    row.append('<td class="size">' + tableData[i].usSize + '</td>');
    row.append('<td class="inner-diameter">' + tableData[i].innerDiameter + '</td>');
    row.append('<td class="outer-circumference">' + tableData[i].outerCircumference + '</td>');
    tbody.append(row);
  }

  table.append(tbody);
  $('body').append(table);

  let video = $('<video>', {
    id: 'myVideo',
    controls: true
  });

  let source = $('<source>', {
    src: '/frontend/images/video.mp4',
    type: 'video/mp4'
  });

  // Play the video
  $('#playButton').click(function() {
    video.play();
  });

  // Pause the video
  $('#pauseButton').click(function() {
    video.pause();
  });
  
  video.append(source);

  // Append the video element to a container or specific element on your page
  $('body').append(video);

  // Initialize Video.js with custom not supported message
  videojs('myVideo', {
    notSupportedMessage: 'Your browser does not support the video playback.'
  });

}); 


