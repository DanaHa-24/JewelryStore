$(document).ready(function() {
  var termsContainer = $('<div></div>').attr('id', 'terms-container');

  $('<h1></h1>').addClass('custom-heading').text('תקנון האתר').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint').text('תנאי השימוש המפורטים כאן מגדירים את הכללים וההתחייבויות המשפטיות שלך בקשר לשימוש באתר הזה. אנא קרא בקפידה ווודא שאתה מסכים לתנאים הללו לפני שאתה ממשיך להשתמש באתר.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint').text('אנא שים לב שאנו נוכל לשנות את התנאים הללו מעת לעת בלעדי הודעה מוקדמת. אתה מחוייב לעקוב ולקרוא שוב את התנאים בכל פעם שאתה משתמש באתר.').appendTo(termsContainer);
  $('<h2></h2>').addClass('custom-heading').text('האימות האישי').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint').text('אנחנו רשאים לדרוש ממך להרשם ולספק מידע אישי בכדי לקבוע את הזהות שלך. כל המידע שתספק יטופל בסודיות ובהתאם למדיניות הפרטיות שלנו.').appendTo(termsContainer);
  $('<h2></h2>').addClass('custom-heading').text('שימוש בתוכן').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint').text('כל התוכן שמתפרסם באתר הוא בגוף תכניו באחריות הגורם המפרסם ולא באחריותנו. אנו לא אחראים לכל תכנים שלישיים או להקשרים המופיעים באתר.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint').text('אם תמצא תוכן לא נאות או שלא נכון, אנא צור קשר איתנו ונעשה כל שביכולתנו לתקן את המצב.').appendTo(termsContainer);
  $('<h2></h2>').addClass('custom-heading').text('מדיניות פרטיות').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint').text('אנו מקפידים על הגנת הפרטיות שלך. כל המידע האישי שתספק ישמש אותנו רק למטרות המצוינות במדיניות הפרטיות שלנו.').appendTo(termsContainer);
  $('<p></p>').addClass('checkpoint').text('אנא קרא את מדיניות הפרטיות שלנו כדי להבין כיצד אנו משתמשים במידע שאנחנו אוספים ומחזיקים.').appendTo(termsContainer);

  var centerContainer = $('<div></div>').addClass('center');
  $('<p></p>').text('תנאי השימוש נכתבו על ידי חברת דוגמה © 2023. כל הזכויות שמורות.').appendTo(centerContainer);

  termsContainer.append(centerContainer);
  $('body').append(termsContainer);
});
