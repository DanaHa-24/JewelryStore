// Need to seperate between data and functions 
// import data for Q&A page
const accordionDataOrders = [
    { title: 'איך לבצע הזמנה מהאתר?', 
      content: ['בקלות! ניתן לבצע התחברות או לבצע רכישה ללא רישום, כאורח.', 'יש להזין את פרטי פרופיל המשתמש, מייל וסיסמא ולהתחיל להכניס את כל מה שאת/ה אוהב/ת לסל קניות.', 'בסיום יש לגשת לכפתור סיום הזמנה ולתשלום בקופה ובחירת אופן המשלוח.', 'במידה ויש לך קוד קופון יש להזינו בשדה "קוד קופון" - לפני שלב המעבר לתשלום.'] 
    },
    { title: 'איך אוכל לבדוק מה מצב ההזמנה שלי?', 
      content: ['שאלה מצוינת! יש 2 דרכים לברר:', ' 1) להיכנס למשתמש שלך ותחת קטגוריית ההזמנות שלי יופיע שדה סטטוס.', '2) לפנות לצוות שירות הלקוחות שלנו במספר דרכי התקשרות : וואצאפ למספר 050-9008833 , שליחת הודעה באינסטגרם /   בפייסבוק שלנו.'] 
    },
    { title: 'איך אוכל לדעת שההזמנה בוצעה?', 
      content: ['בסיום ההזמנה יתקבל מסך של "הזמנתך בוצעה בהצלחה" עם מספר הזמנה בעל 10 ספרות לצורך מעקב.', 'כמו כן, מייל עם חשבונית יישלח לכתובת המייל אותה הזנת בעת מעמד הרכישה.'] 
    },
    { title: 'תוך כמה זמן ההזמנה תגיע אליי?',
      content: ['משלוח עד הבית - זמן אספקה הינו 3-7 ימי עסקים.', '* ערבי חג, ימי חג, שבת ו/או חגים אינם נחשבים ימי עסקים.']
    },
    { title: 'איך אוכל לבטל את ההזמנה שלי?',
      content: ['על מנת לבטל את ההזמנה יש ליצור קשר עם שירות הלקוחות שלנו בטלפון 050-9008833']
    },
    { title: 'הכנסתי פריט לסל הקניות והוא נעלם, מדוע?',
      content: ['אם הכנסת פריט לסל והוא נעלם כנראה שנגמר במלאי ממש עכשיו :(']
    },
    { title: 'איך אוכל לדעת שפריט שאני רוצה חזר למלאי?',
      content: ['אנו מעדכנים בעמוד האינסטגרם שלנו שדברים חוזרים למלאי, מומלץ להיכנס ולבדוק באתר, וכמובן אפשר להיעזר בצוות שירות הלקוחות שלנו.']
    },
    { title: 'האם ניתן לבצע שינויים לאחר קבלת מספר הזמנה?',
      content: ['אחרי שקיבלת מספר הזמנה לא ניתן לבצע שינויים, ניתן לבטל את ההזמנה ולהזמין מחדש.']
    },
    { title: 'עשיתי 2 הזמנות יום אחרי יום / כמה שעות לאחר מכן, האם אפשר לאחד אותן?',
      content: ['ניתן להודיע לשירות הלקוחות שלנו במספר או דרך האינסטגרם חשוב לציין את שני מספרי ההזמנות.', 'במידה ויתאפשר נוכל לאחד בין 2 ההזמנות.', '']
    },
    { title: 'הזמנתי חבילה לאיסוף מהסטודיו, מי יכול לאסוף אותה?',
      content: ['מי שביצע את ההזמנה או מישהו מטעמו בהצגת תעודה מזהה ומספר הזמנה.', '* חשוב לתאם הגעה מראש לסטודיו']
    }
];


const accordionDataShipments = [
    { title: 'הזמנתי באתר, איך ההזמנה מגיעה אליי?',
        content: ['אופציה ראשונה היא משלוח שמגיע עד 7 ימי עסקים, בעלות של 25 ₪.', 'אופציה נוספת היא להגיע ולאסוף מהסטודיו שלנו כ-3 ימי עסקים לאחר ההזמנה ללא תשלום נוסף. ', 'במהלך 3 ימי העסקים תישלח אלייך הודעה לתיאום ההגעה אלינו.', '* ערבי חג, ימי חג, שבת ו/או חגים אינם נחשבים ימי עסקים.']
    },
    { title: 'הזמנתי, עברו 7 ימי עסקים והמשלוח לא הגיע, מה עליי לעשות?',
        content: ['שירות הלקוחות שלנו ישמח מאוד לעזור ולבדוק את הנושא, אפשר להתקשר או לשלוח הודעת וואצאפ למספר 050-9008833.', 'בנוסף, ניתן לפנות לעמוד שלנו בפייסבוק או באינסטגרם (חשוב לציין מספר הזמנה).', '* ערבי חג, ימי חג, שבת ו/או חגים אינם נחשבים ימי עסקים.']
    }
];


const accordionDataReturns = [
    { title: 'איך מחליפים / מחזירים פריט שהזמנתי?',
      content: ['נשמח מאוד לפגוש אותך בסטודיו שלנו לצורך החלפה או החזרה - בתיאום הגעה מראש דרך הוואצאפ במספר 050-9008833.', 'אפשרות נוספת היא שליחת הפריט חזרה אלינו ע"י חברת שליחויות בעלות של 25 ₪.', 'לעוד פרטים תוכלי לפנות לצוות שירות לקוחות שלנו. ']
    },
    { title: 'תוך כמה זמן ניתן להחזיר פריט שהזמנתי / רכשתי בחנות?',
      content: ['ניתן להחליף פריט שנרכש באתר בתוך 30 ימי מקבלת המשלוח, כאשר המוצר חדש, באריזתו המקורית ולא נעשה בו כל שימוש.', 'להחלפה במשלוח צרי קשר למספר 050-9008833 , לאחר מכן שליח יגיע אלייך עם הפריט החדש תמורת הקודם בעלות של 25₪ בלבד.', 'בנוסף, נשמח לפגוש אותך גם בסטודיו שלנו להחלפה או להחזרה - בתיאום מראש :)']
    },
    { title: 'כיצד מתבצע החזר כספי ותוך כמה זמן?',
      content: ['החזר כספי יינתן בתוך 14 ימי עסקים מרגע קבלת המשלוח,', 'ראשית יש להודיע במיידי על ההחזרה באחד מהערוצים הבאים - ווצאפ למספר 050-9008833 או דרך עמוד האינסטגרם / הפייסבוק שלנו. ', 'החזרת הפריט אלינו יכולה להתבצע ב-2 אופציות:', '1) הבאת הפריט לסטודיו שלנו בתוך 14 ימי עסקים מיום קבלתו ובתיאום מראש.', '2) החזרה דרך חברת שליחויות בעלות נוספת של 25 ₪ נוספים.', 'והכל בהתאם למועדים ולתנאים הקבועים בתקנות הגנת הצרכן (ביטול עסקה), התשע"א - 2010', 'במידה ובעת ביטול העסקה בוצע כבר המשלוח, לא יינתן החזר כספי בגין עלות השילוח. ', 'במקרה בו המשלוח ניתן בחינם במסגרת הטבה / מבצע, באם ביטול העסקה מבטל את התנאי למשלוח בהטבה, עלות המשלוח (להחזרת הפריט) תחול על הלקוח. ', 'בתום תהליך הזיכוי תשלח הודעה לכתובת המייל שהוזנה במעמד הרכישה.']
    }
];

const accordionDataPayments = [
    { title: 'איך אפשר לשלם באתר?',
      content: ['באתר אפשר לשלם באשראי ע"י תשלום מאובטח ו/או בזיכוי ייעודי לאתר.']
    },
    { title: 'האם אפשר לנצל זיכוי באתר?',
      content: ['לרכישה באתר ניתן להשתמש בזיכוי ייעודי לאתר ולרכישה בסטודיו ניתן להשתמש בזיכוי ייעודי לסטודיו.', 'ניתן להיעזר בצוות שירות הלקוחות שלנו לבירורים נוספים.']
    },
    { title: 'האם התשלום באתר מאובטח?',
      content: ['בהחלט! הרכישה באתר מאובטחת ועומדת בתקני הבטיחות המחמירים ביותר, פרטי האשראי שלך מוצפנים ובטוחים, ', 'אם עדיין יש חשש ניתן בשמחה להזמין גם טלפונים דרך צוות המוכרות שלנו במספר 050-9008833.']
    }
];

const accordionDataMaterials = [
    { title: 'האם יש אחריות על התכשיטים?',
      content: ['על כל תכשיט אנו מעניקים אחריות לשנה מיום רכישתו, בצירוף הקבלה. ', 'האחריות אינה כוללת שבר, קרע, מכות או שריטות, אחריות על הציפוי כתוצאה מחומציות או משימוש לא נכון בלאי ואובדן התכשיט או חלק ממנו.']
    },
    { title: 'מאילו חומרים עשויים התכשיטים ואיך לשמור על כל אחד מהם?',
      content: ['כסף 925', 'הינה מתכת אצילית ואיכותית המחזיקה לאורך זמן, יחד עם זאת חומציות הגוף, החמצן שבאוויר,', 'מלחים וחומרים כימיים שונים עלולים לגרם להשחרה או הצהבה של הכסף,', 'אך אל דאגה עם שמירה וניקיון נכונים הכסף תמיד יחזור למצבו הטבעי. ', 'כדי לשמור על התכשיטים ניתן להשרות אותם אחת לתקופה במים חמימים עם נוזל כלים למשך 24 שעות,', 'ולאחר מכן לייבש היטב. ', ' ', 'גולדפילד', 'יש לשמור על התכשיט הרחק ממוצרי קוסמטיקה שונים, חומרי ניקוי ומגע בריכה וים שעלולים לפגוע בברק של התכשיט.', 'בנוסף ניתן לנקות אותם בסבון ומים אחת לתקופה במידת הצורך.', ' ', 'ציפוי זהב / ציפוי כסף', 'על מנת להחזיר לתכשיט מצופה את הברק יש לנקות אותו מלכלוך שומני ע"י ניקוי באמצעות מטלית רכה ויבשה בלבד.', 'מומלץ להימנע ממגע עם מים שכן גם הציפוי האיכותי ביותר ירד בשימוש לא נכון.', 'בשימוש לא נכון עם התכשיט לא תינתן אחריות על הציפוי.']
    }
];

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
  