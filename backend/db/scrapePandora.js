const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");

async function scrapePandora() {
  let driver = await new Builder().forBrowser("chrome").build();

  await driver.get("https://google.com");

  await driver.findElement(By.name("q").sendKeys("Hello, world!"), Key.RETURN);
  setInterval(function(){
    driver.quit();
  },10000)
  
}

scrapePandora();
