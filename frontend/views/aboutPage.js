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
        'אנחנו חברה מובילה בתחום התכשיטים היקרים והאיכותיים. מאז היווסדה בשנת 1990, עסקנו בעיקר בעיצוב, הפקה ושיווק של תכשיטים מותאמים אישית.',
        'המותג שלנו הפך למוכר ונחשב ברחבי העולם, ואנו שמחים לשתף אתכם בסיפור ההצלחה שלנו.',
        'במהלך השנים, פרויקטים רבים ומובחנים עשו את חלקם בקידום המותג וביצירת מקום מיוחד בשוק. התכשיטים שלנו מיוצרים בעבודת יד מחומרים איכותיים ומובחנים, מתאימים לכל אירוע ונושא.',
        'אנו גאים באיכות המוצרים שלנו ובמגוון העיצובים המדהימים שאנו מציעים ללקוחותינו. נסחר את השנים, המותג שלנו מצליח לשמור על האיכות והמראה הייחודיים שהוא מוכר עליהם.'
    ];

    paragraphs.forEach((text) => {
        const paragraph = $('<p>').text(text);
        column.append(paragraph);
    });

    // Create images
    const images = ['https://deih43ym53wif.cloudfront.net/kuta-bali-beach-indonesia-shutterstock_297303287.jpg_9b516347e5.jpg'];

    images.forEach((src) => {
        const image = $('<img>').attr('src', src).addClass('img-fluid my-4');
        column.append(image);
    });

    // Append container to the body
    $('body').append(container);
});