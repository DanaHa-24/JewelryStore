$(document).ready(function() {
    // Create container
    const container = $('<div>').attr('id', 'container').addClass('container my-5 about-page-container');

    // Create row
    const row = $('<div>').addClass('row justify-content-center');
    container.append(row);

    // Create column
    const column = $('<div>').addClass('col-lg-8 text-center');
    row.append(column);

    // Create heading
    const heading = $('<h2>').addClass('mb-4').text('הסיפור שלנו');
    column.append(heading);

    // Create paragraphs
    const paragraphs = [
        'ברוכים הבאים ל-Be You, ', 'שם תכשיטים הם יותר מסתם קישוט - הם שיקוף של האומץ להיות עצמך.', 'בחרתי בשם "Be You" כי הוא מגלם את מהות המסע שלי בעולם. ',
        'תמיד העזתי לאמץ את האינדיבידואליות שלי כשאחרים היססו, ואני רוצה שגם אתן.', 'Be You מסמל את הכוח של ביטוי עצמי, ומזכיר לנו שהיופי האמיתי טמון באותנטיות. ',
        'עם כל פריט מעודן, אני מזמינה אותך לאמץ את הסיפור הייחודי שלך, ללבוש אותו בגאווה כדי שהעולם יראה.'
    ];

    paragraphs.forEach((text) => {
        const paragraph = $('<p>').text(text);
        column.append(paragraph);
    });

    // Append image
    const image = $('<img>').attr('src', "https://deih43ym53wif.cloudfront.net/kuta-bali-beach-indonesia-shutterstock_297303287.jpg_9b516347e5.jpg").addClass('img-fluid my-4');
    column.append(image);
    
    // Append container to the body
    $('body').append(container);
});