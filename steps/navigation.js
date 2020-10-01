import { When, Then } from "cucumber";
const { expect } = require("chai");

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
  browser.saveScreenshot("./screenshots/" + Math.random() + ".png");
});
