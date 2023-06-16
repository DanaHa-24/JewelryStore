function showFooter(){
    const content = [
        { content: 'החלפות והחזרות' },
        { content: 'שאלות ותשובות' },
        { content: 'תקנון האתר' },
        { content: 'מדריך מידות' },
        { content: 'About me' }
    ];

    const socialLinks = {
        "Facebook" : "https://www.facebook.com/people/B-U-jewelry/100092493216985",
        "Instagram" : "https://instagram.com/bujewelry_?igshid=MjEwN2IyYWYwYw"
    }

    const footerDiv = $("<div>").attr("id", "footerDiv");
    const footer = $("<footer>").attr("id", "footer").addClass("row py-4");
    const footerCategories = $("<div>").attr("id", "footerCategories").addClass("col")
    const footerContentList = $("<ul>").addClass("nav flex-col gap-5");

    $("body").append(footerDiv.append(footer.append(footerCategories.append(footerContentList))));
    
    $.each(content, function(index, text){
        let link = $("<a>").attr("href", "#").text(text.content);
        let listItem = $("<li>").addClass("nav-item mb-2");
        footerContentList.append(listItem.append(link));
    });

    const footerWebIconContainer = $("<div>").attr("id", "footerWebIconContainer");
    const footerWebIconList = $("<ul>").attr("id", "footerWebIconList").addClass("social-links pl3-sm");
    footer.append(footerWebIconContainer.append(footerWebIconList));

    $.each(socialLinks, function(name, content){
        let lowerCaseName = name.toLowerCase();
        let link = $('<a target="_blank" aria-label="' + name + '" title="' + name + '" data-type="click_navFooter" data-path="social:' + name + '" href="' + content + '" class="social-link footer-link fab fa-' + lowerCaseName + '" data-pre="ILink">');
        footerWebIconList.append($("<li>").append(link));
    });
}