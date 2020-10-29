import { When, Then } from "cucumber";
const { expect } = require("chai");

When("I navigate to the webapp", function() {
  var testUrl = process.env.TEST_URL === undefined ? "localhost:3000" : process.env.TEST_URL;
  browser.url(testUrl);
  if (browser.getTitle() == "Tunnel website ahead!") {
    console.log("Viewing tunnel site. Clicking next button.");
    $(".btn-primary").click();
    browser.pause(1000);
  } else {
    console.log("Browser title is: " + browser.getTitle());
  }
});

When("I navigate to {string}", function(url) {
  browser.url(url);
});

When(/^I click (.*)$/, function(linkText) {
  console.log("Looking for =" + linkText);
  $("=" + linkText).click();
  browser.pause(5000);
  expect(true).to.equal(true);
});

Then(/the page title is '(.*)'/, { timeout: 60 * 1000 }, function(title) {
  const expected = browser.getTitle();
  expect(title).to.equal(expected);
});

Then("take a screenshot", function() {
  let fs = require('fs');
  if (!fs.existsSync("./screenshots")){
    console.log("Screenshots dir being created.");
    fs.mkdirSync("./screenshots");
  } 
  browser.saveScreenshot("./screenshots/" + Math.random() + ".png");
});
