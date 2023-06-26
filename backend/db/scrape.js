const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');
const Item = require('../models/ItemSchema');
require('chromedriver');

let liElements;

async function scrapeTaoItems() {
  const driver = await new Builder().forBrowser('chrome').build();
  let liNum = 0;
  let itemsData = [];

  try {
    // Open the specific webpage
    await driver.get('https://shoptaostyle.com/product-category/%d7%aa%d7%9b%d7%a9%d7%99%d7%98%d7%99-%d7%9b%d7%a1%d7%a3/');

    let hasNextPage = true;
    let page = 0;

    while (hasNextPage && page <= 4) {
      console.log(`Scraping page ${page}`);

      // Find the <ul> element
      const ulElement = await driver.findElement(By.css('.products.columns-4'));

      // Find the child <li> elements
      liElements = await ulElement.findElements(By.css('li'));
      liNum += liElements.length;

      // Extract data for each <li> element
      for (const liElement of liElements) {
        driver.sleep(1000);
        const nameElement = await liElement.findElement(By.css('a > h2'));
        const nameText = await nameElement.getText();
        let newName = nameText.split('-')[0].trim();

        const typeName = await nameElement.getText();
        let newType = '';
        if (typeName.includes('שרשרת') || typeName.includes('שרשראות')) {
          newType = 'Necklace';
        } else if (typeName.includes('צמיד')) {
          newType = 'Bracelet';
        } else if (typeName.includes('טבעת')) {
          newType = 'Ring';
        } else if (typeName.includes('עגיל') || typeName.includes('עגילים') || typeName.includes('הליקס') || typeName.includes('חישוקים') || typeName.includes('חישוקי')) {
          newType = 'Earring';
        }

        // Fetch the price
        const priceElement = await liElement.findElement(By.css('.price'));
        const priceText = await priceElement.getText();
        const newPrice = parseFloat(priceText);

        // Fetch the image source
        const imageElement = await liElement.findElement(By.css('img'));
        const imageSrc = await imageElement.getAttribute('src');

        // Generate ID
        const ItemType = {
            Ring: '16',
            Necklace: '26',
            Bracelet: '36',
            Earring: '46'
        };

        

        const itemData = {
          id: ItemType[newType],
          name: newName,
          price: newPrice,
          image: imageSrc,
          type: newType,
          color: [],
          size: [],
          material: [],
          style: [],
          createdAt: Date.now,
          amountInStock: 10,
          status: "available",
          howManySold: 2
        };

        itemsData.push(itemData);
      }

      const nextPageButton = await driver.wait(driver.findElement(By.css('.next.page-numbers')), 5000);
      const isNextPageEnabled = await nextPageButton.isEnabled();

      if (!isNextPageEnabled || page === 24) {
        console.log('Reached last page. Stopping pagination.');
        hasNextPage = false;
      } else {
        const nextPageUrl = await nextPageButton.getAttribute('href');
        if (nextPageUrl) {
          await driver.navigate().to(nextPageUrl);
          await driver.sleep(1000);
          page++;
        } else {
          console.log('Invalid URL for next page. Stopping pagination.');
          hasNextPage = false;
        }
      }
    }
  } catch (error) {
    console.error('Error scraping data:', error);
  } finally {
    console.log('Number of liElements:', liNum);
    try {
      if (driver) {
        await driver.quit();
        console.log('WebDriver quit successfully.');
      }
    } catch (error) {
      console.error('Error quitting WebDriver:', error);
    }
  }

  // 25/6 - modify to a new file - after scraping the relvant data
  if (itemsData.length > 0) {
    const jsonData = JSON.stringify(itemsData, null, 2);
    fs.writeFileSync('taoItems2.json', jsonData);
    console.log('Data exported to items.json successfully.');
  }
}

scrapeTaoItems();