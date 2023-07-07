$(document).ready(function() {
  const termsContainer = $('<div></div>').attr('id', 'terms-container');

  $('<h1></h1>').addClass('custom-heading terms-page-h1').text('תקנון האתר').appendTo(termsContainer);
  $('<h2></h2>').addClass('custom-heading terms-page-h2').text('כללי').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('האתר משמש כחנות וירטואלית למכירת פריטים בייצור עצמי / מיובאים.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('האמור בתקנון זה בלשון נקבה לשם נוחות בלבד ומתייחס לשני המינים באופן שווה.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('כל אדם המבצע הזמנה ו/או רכישה דרך האתר מצהיר בעצם ביצוע הפעולה כי הוא קרא תקנון זה, וכי הוא מסכים לכל הוראותיו ותנאיו של תקנון זה, וכי לא תהא לו או למי מטעמו כל טענה ו/או דרישה ו/או תביעה כנגד האתר ו/או הנהלת האתר ו/או מי מעובדי האתר, בכל הקשור להוראות והתנאים של תקנון זה.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('הנהלת האתר שומרת לעצמה את הזכות לשנות את התקנון מפעם לפעם על פי שיקול דעתה הבלעדי וזאת ללא צורך במתן התראה ו/או הודעה מוקדמת.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('כל המחירים באתר מופיעים על גבי המוצרים ונקובים בשקלים חדשים. המחירים כוללים מע"מ, אם הוא חל לפי הדין, ואינם כוללים דמי משלוח.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('אם נפלה טעות קולמוס בתיאור התכשיט, לא יחייב הדבר את החברה ו/או את הנהלת האתר.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('תמונות הפריטים באתר נועדו להמחשה בלבד וייתכנו הבדלים בין התמונות המוצגות באתר, חלקן או כולן, לבין הפריטים הנמכרים בפועל.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('המחירים הנקובים אינם כוללים דמי משלוח.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('הנהלת האתר ו/או מי מטעמה לא יהיו אחראים ולא יישאו בכל נזק ישיר, עקיף, תוצאתי או מיוחד, שייגרם למשתמש/ת ו/או לגולש/ת ו/או למזמינ/ה ו/או לצד שלישי, כתוצאה משימוש או רכישה באמצעות האתר, שלא על פי תקנון זה – תהא עילת התביעה אשר תהא – לרבות הפסד הכנסה ו/או מניעת רווח שיגרמו מכל סיבה שהיא, שאז הנהלת האתר שומרת לעצמה את הזכות לבטל את ההזמנה הספציפית.').appendTo(termsContainer);
 
 
  $('<h2></h2>').addClass('custom-heading terms-page-h2').text(' משלוחים').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('הנהלת האתר אינה אחראית לעיכובים באספקת המוצרים כתוצאה מאירועים שאינם בשליטתה, כדוגמת תקלות, עיכובים, שביתות, אסונות טבע, תקלות במערכת המחשוב או במערכות הטלפונים שיפגעו בהשלמת תהליך הרכישה או תקלות בשירות הדואר האלקטרוני.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('על מנת לדאוג שביצוע ההזמנה יבוצע על הצד הטוב ביותר ובלי תקלות יש להקפיד לתת פרטים נכונים ומדויקים. במידה ובעת ביצוע ההזמנה יימסרו פרטים שגויים, הנהלת האתר לא תוכל להבטיח כי התכשיטים יגיעו ליעדם. במידה והתכשיטים יחזרו להנהלת האתר בעקבות פרטים מוטעים, הלקוח/ה יישאו בתשלום בגין המשלוח.').appendTo(termsContainer);

  $('<h2></h2>').addClass('custom-heading terms-page-h2').text('מדיניות החלפות והחזרות').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('ניתן להחליף פריט שנקנה באתר עד 14 ימים מרגע קבלתו.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('במידה ולא הודיעו הלקוח/ה להנהלת האתר על פגם כלשהו במוצר בתוך 24 שעות מיום קבלתו, הדבר מהווה הודעה כי לא נפל שום פגם וללקוח/ה לא תהיה כל טענה כנגד הנהלת האתר ו/או האתר לעניין קיומו של פגם כלשהו במוצר.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('החלפה תתבצע בצמוד לחשבונית / פתק החלפה ובתנאי שהתכשיט באריזתו המקורית, במצב תקין ושלא נעשה בו כל שימוש.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('הנהלת האתר ו/או מי מעובדיה לא יהיו אחראים ולא יישאו בכל נזק ישיר, עקיף, תוצאתי או מיוחד שנגרם ללקוח/ה ו/או לצד שלישי לרבות נזק כספי בגין ביטול ההזמנה ו/או החזרת הפריט לפי הוראות פרק זה.').appendTo(termsContainer);

  $('<h2></h2>').addClass('custom-heading terms-page-h2').text(' זיכוי וביטול עסקה').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('החזר הכספי/קרדיט באתר יינתנו רק לאחר שהפריטים יגיעו להנהלת האתר/סטודיו וזאת לאחר בדיקה מקיפה שלא נעשה בפריטים כל שימוש.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('יטול עסקה יכול להתבצע עד 2 ימי עסקים או 48 שעות מרגע ביצוע התשלום בלבד.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('החזר התשלום יבוצע לאמצעי התשלום שבו התבצעה העסקה, וזאת לאחר ניכוי של 5% משווי העסקה בתוספת דמי המשלוח.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('לא ינתן החזר כספי על משלוח וזאת בשל העובדה שזהו שירות שנעשה בו שימוש.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('זיכוי כספי- יינתן קרדיט למימוש באתר בשווי של הפריטים שהוחזרו.').appendTo(termsContainer);
  
  $('<h2></h2>').addClass('custom-heading terms-page-h2').text(' אחריות ואופן השמירה על התכשיטים').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('התכשיטים עמידים במים וניתן להתקלח איתם, למעט תכשיטים המצופים זהב\גולדפילד ולמעט תכשיטים שצויין לגביהם אחרת בדף הפריט.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('יש להימנע ממגע עם בושם, תכשירי טיפוח, חומרי ניקיון או כימיקלים אחרים שיכולים לגרום להשחרת התכשיטים ולפגוע בהם באופן בלתי הפיך.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('במקרה של השחרת תכשיטי כסף, ניתן להבריק אותם חזרה באמצעות תמיסה ייעודית לניקוי תכשיטי כסף (למעט תכשיטי כסף המשובצים בזרקונים/אבני חן, אותם ניתן לנקות באמצעות מטלית ומשחת שיניים/מטלית ייעודית לניקוי תכשיטי כסף).').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint terms-page-cp').text('יש לאחסן את התכשיטים במקום יבש ומוצל ולא בחדר הרחצה, על מנת שלא יהיו חשופים ללחות מתמשכת.').appendTo(termsContainer);


  const centerContainer = $('<div></div>').addClass('terms-page-center');


  termsContainer.append(centerContainer);
  $('body').append(termsContainer);
});