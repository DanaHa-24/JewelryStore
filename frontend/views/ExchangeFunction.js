const dataExchangesAndReturns = [
    { title: 'משלוח',
      content: ['משלוח עד הבית 3-7  ימי עסקים בעלות של 25 ₪ בלבד.']
    },
    { title: 'איסוף עצמי',
      content: [' ניתן לאסוף את ההזמנה מהסטודיו שלנו תוך 3 ימי עסקים.', 'הכתובת שלנו - התבור 5 ראשון לציון', '* לא כולל יום ההזמנה']
    },
    { title: 'החלפות',
      content: ['ניתן להחליף פריט שנרכש באתר תוך 30 ימים מקבלת המשלוח, כאשר המוצר חדש, באריזתו המקורית ולא נעשה בו כל שימוש. ', 'פריטים ב-sale ניתן להחליף תוך 5 ימים מקבלת המשלוח.']
    },
    { title: 'החזרות - קבלת זיכוי לאתר / לסטודיו',
      content: ['1) החזרות דרך הסטודיו - ללא עלות נוספת.', '2) החזרת הפריט אלינו במשלוח בעלות של 25 ₪.', 'זיכוי יינתן כנגד החזרת מוצר אשר הוחזר מבלי שנעשה בו כל שימוש ובצירוף חשבונית הקנייה או פתק החלפה.','אם ההזמנה נעשתה דרך הסטודיו שלנו הזיכוי יינתן למימוש בסטודיו בלבד.', 'אם ההזמנה נעשתה דרך האתר שלנו הזיכוי יינתן למימוש באתר בלבד.']
    },
    { title: 'החזר כספי',
      content: ['ביטול עסקה- החזר כספי יינתן בתוך 14 ימי עסקים מרגע קבלת המשלוח, ', 'ראשית יש להודיע במיידי על ההחזרה באחד מהערוצים הבאים - ווצאפ למספר 050-9008833 או דרך עמוד האינסטגרם / הפייסבוק שלנו.', 'החזרת הפריט אלינו יכולה להתבצע ב-2 אופציות:','1) הבאת הפריט לסטודיו שלנו בתוך 14 ימי עסקים מיום קבלתו ובתיאום מראש.', '2) החזרה דרך חברת שליחויות בעלות נוספת של 25 ₪ נוספים.', 'והכל בהתאם למועדים ולתנאים הקבועים בתקנות הגנת הצרכן (ביטול עסקה), התשע"א - 2010', 'במידה ובעת ביטול העסקה בוצע כבר המשלוח, לא יינתן החזר כספי בגין עלות השילוח.', 'במקרה בו המשלוח ניתן בחינם במסגרת הטבה / מבצע, באם ביטול העסקה מבטל את התנאי למשלוח בהטבה, עלות המשלוח (להחזרת הפריט) תחול על הלקוח.', 'בתום תהליך הזיכוי תשלח הודעה לכתובת המייל שהוזנה במעמד הרכישה.', '* ערבי חג, ימי חג, שבת ו/או חגים אינם נחשבים ימי עסקים.']
    }
];

function exchangeAndReturns() {
    const infoContainer = $('<div>').addClass('info-container');
    const contentContainer = $('<div>').addClass('content-exchange-return');
    const headerContainer = $('<h3>').text('החלפות / החזרות').addClass('er-page-header');
    $('body').append(headerContainer).append(infoContainer);

    infoContainer.append(contentContainer);
    dataExchangesAndReturns.forEach((item, index) => {
        const infoItem = $('<div>').addClass('infoER-item');
        const infoHeader = $('<div>').addClass('infoER-header');
        const infoContent = $('<div>').addClass('infoER-content');
        const title = $('<span>').text(item.title);
  
        infoHeader.append(title);
        infoItem.append(infoHeader, infoContent);
        contentContainer.append(infoItem);
        item.content.forEach(row => {
          const contentRow = $('<p>').addClass('content-row').text(row);
          infoContent.append(contentRow);
        });
    });
}

exchangeAndReturns();