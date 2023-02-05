const { Builder, By, Key, until,WebDriver } = require("selenium-webdriver");

describe("React App E2E Tests", () => {
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/login");
  });  
  afterEach(async () => {
    await driver.quit();
  });
   it("should login succesfly and navigate to home", async () => {
    let initialUrl=await driver.getCurrentUrl() 
    let currentUrl 
    const inputField = await driver.findElement(By.name("email"));
    await inputField.sendKeys("oussema422oussema@gmail.com");
    const button = await driver.findElement(By.name("button"));
    const passwordField = await driver.findElement(By.name("password"));
    await passwordField.sendKeys("123456789a");
    await button.click().then(currentUrl =await driver.getCurrentUrl());

    await driver.wait(async () => {
      const currentUrl = await driver.getCurrentUrl();
      return currentUrl !== initialUrl; 
  }, 1000);
  const updatedUrl = await driver.getCurrentUrl();
  
    expect(updatedUrl).toBe("http://localhost:3000/")
    
  }); 

})
 