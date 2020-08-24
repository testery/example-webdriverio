import { Given, When, Then } from "cucumber";

// Page Object example for later
//import LoginPage from "../pages/login";

const urlCMS = "https://testery.slgo.gowithsparklearn.com";
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

Given("I have logged in as admin", function() {
  const inputEmail = $("input[type='email']");
  const inputPassword = $("input[type='password']");
  const btnSubmit = $("input.form-submit");

  browser.url(urlCMS);

  inputEmail.setValue(email);
  inputPassword.setValue(password);
  btnSubmit.click();

  $("h1=Dashboard").waitForDisplayed();
});

When('I click on "Courses and Content Library" in the menu', function() {
  const a = $("a[title='Manage Courses and Content']");
  a.waitForDisplayed();
  a.waitForClickable();
  a.click();

  $("h1=Courses").waitForDisplayed();
});

When('click on "Learning Objects" in the menu', function() {
  const a = $("a=Learning Objects");
  a.waitForClickable();
  a.click();

  $("h1=Learning Objects").waitForDisplayed();
});

When('click on "Add New From Web"', function() {
  const a = $("a=Add New From Web");
  a.click();

  $("h1=Create Learn Link").waitForDisplayed();
});

When('select a value for "Topic" from the dropdown', function() {
  const s = $("select#edit-field-topic");
  s.selectByVisibleText("Digital literacy");
});

let title = '';
When('fill in a title "{}"', function(textTitle) {
  title = textTitle;
  const i = $("input#edit-title-0-value");
  i.setValue(textTitle);
});

When("upload an image", function() {
  const path = require("path");

  // Possible bug:
  // Images under a certain size (e.g. Logo) does not appear on blog post
  //const img = path.join(__dirname, "../files/testery-logo.png");
  const img = path.join(__dirname, "../files/testery-test-run-results.png");

  // This element is not visible and not clickable from WDIO's perspective but
  // is in the DOM.
  //const i = $("input#edit-field-image-0-upload");
  //const i = $("#edit-field-image-0-upload");

  // CSS on this element has "visibility: hidden"
  const i = $("input.input--file");
  browser.execute(function() {
    document.querySelector('input.input--file').style.visibility = 'visible';
    document.querySelector('input.input--file').style.opacity = 100;
    document.querySelector('input.input--file').style.height = '100px';
  });

  i.waitForDisplayed();
  i.waitForClickable();
  i.setValue(img);

  // Alternative Image Text is required
  const inputAltImgText = $("input[data-drupal-selector='edit-field-image-0-alt']");
  inputAltImgText.waitForDisplayed();
  inputAltImgText.setValue('test image');
});

When("provide a brief description", function() {
  const t = $("textarea#edit-field-description-0-value");
  t.setValue("Test Description");
});

When("add two tags", function() {
  const i = $("input#autocomplete-deluxe-input");
  i.click();
  browser.keys(["test-tag1", "Enter"]);
  browser.keys(["test-tag2", "Enter"]);
});

When('add a content link "{}"', function(url) {
  const i = $("input#edit-field-content-link-0-uri");
  i.setValue(url);
});

When("click save", function() {
  const btn = $("input#edit-submit");
  btn.click();

  const h = $("h1=Learning Objects");
  h.waitForDisplayed();
});

When('I click on view for "Test Title"', function() {
  const a = $$("a=Test Title")[0];  // $$() because there are more than one link
  a.click();

  const aIsActive = $("a.is-active");
  aIsActive.waitForDisplayed();
});

When('I click on "Read more"', function() {
  const btnReadMore = $("a=Read more");
  // Strange issue with clicking this button
  btnReadMore.waitForDisplayed();
  btnReadMore.scrollIntoView();
  btnReadMore.waitForClickable();
  btnReadMore.click();

  browser.waitUntil(function() {
    const hs = browser.getWindowHandles();
    if (hs.length > 1) {
      return true;
    } else {
      return false;
    }
  });

});

When("I wait {} seconds", function(seconds) {
  browser.pause(seconds);
});

Then('a message appears that says "Learn Link ____ has been created."', function() {
  const d = $("div[aria-label='Status message']");
  expect(d).toHaveTextContaining(`Learn Link ${title} has been created.`);
});

Then("I should see the title, description, and tags are populated", function() {
  const title = $("span=Test Title");
  const description = $("p=Test Description");
  const tag1 = $("a*=test-tag1");
  const tag2 = $("a*=test-tag2");

  expect(title).toBeDisplayed;
  expect(description).toBeDisplayed;
  expect(tag1).toBeDisplayed;
  expect(tag2).toBeDisplayed;
});

Then('the URL "{}" is opened in a new window', function(textUrl) {
  const hs = browser.getWindowHandles();
  browser.switchToWindow(hs[1]);

  browser.waitUntil(function() {
    const url = browser.getUrl();
    return url.includes(textUrl);
  });

  const url = browser.getUrl();
  // Assert on substring instead of .toBe() because some URLs appends "/" to the URL
  expect(url.includes(textUrl)).toBe(true);
});


Given("I have logged in as a learner", function() {
  // Test user credentials
  const credsLearner = {
    email: process.env.EMAIL_LEARNER,
    password: process.env.PASSWORD_LEARNER,
  }
  const inputEmail = $("input[type='email']");
  const inputPassword = $("input[type='password']");
  const btnSubmit = $("input.form-submit");

  browser.url(urlCMS);
  if ($("h1=Dashboard").isDisplayed()) {
    const urlLogout = "https://testery.slgo.gowithsparklearn.com/user/logout";
    browser.url(urlLogout);
  }

  inputEmail.setValue(credsLearner.email);
  inputPassword.setValue(credsLearner.password);
  btnSubmit.click();

  // Learner's homepage unique element
  $("a[title='View content personally recommended for you']").waitForDisplayed();
});

When('I click on "New"', function() {
  const a = $("a[title='View recently added content']");
  a.waitForClickable();
  a.click();
});

When("click on the bookmark icon for the {} item listed", function(nth) {
  let index = 0;
  if (nth == 'first') {
    index = 0;
  }
  const btn = $$("button.o-button--bookmark")[index];
  btn.waitForClickable();
  btn.click();

  // After bookmark is clicked, icon color is filled
  const flag = $("div.o-flag.is-active");
  flag.waitForDisplayed();
});

Then("the bookmark icon fills in", function() {
  const flag = $("div.o-flag.is-active");
  expect(flag).toBeDisplayed();
});

When('I click on "Me" in the main menu', function() {
  const a = $('a[title="Me"]');
  a.waitForClickable();
  a.click();

  // An unique element on the "Me" page is a link to Bookmarks
  const pageMe = $("a[title='My Bookmarks']");
  pageMe.waitForDisplayed();
});

title="Test Title";
Then("I should see the first bookmark listed is the item bookmarked previously", function() {
  const s = $(`span*=${title}`);
  expect(s).toBeDisplayed();
});
