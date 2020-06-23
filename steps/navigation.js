import { When, Then } from "cucumber";
const { expect } = require("chai");

When("I navigate to the Hilton web app", function () {
  browser.url("https://www.hilton.com/en/");
});

Then("I search for hotels in {string}", function (city) {
  $("#__next > div > div > div > div > div > button").click();
  $("#search-input-box").setValue(city);
  $("#PlacesAutocomplete__suggestion-undefined").click();
  $("[data-e2e=findHotel").click();
});

Then("I see list of hotels in search results", function () {
  browser.pause(15000); // for demo purposes - would never use .pause()/.sleep() in real test code
  browser.saveScreenshot("./screenshots/" + Math.random() + ".png");
});
