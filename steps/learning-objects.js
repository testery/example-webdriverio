import { Given, When, Then } from "cucumber";

// Page Object example for later
import LoginPage from "../pages/login";
import AdminPage from "../pages/admin";
import LearnerPage from "../pages/learner";

const urlCMS = "https://testery.slgo.gowithsparklearn.com";
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

Given("I have logged in as admin", function() {
  browser.url(urlCMS);

  LoginPage.inputEmail.setValue(email);
  LoginPage.inputPassword.setValue(password);
  LoginPage.btnSignIn.click();

  $("h1=Dashboard").waitForDisplayed();
});

When('I click on "Courses and Content Library" in the menu', function() {
  AdminPage.linkManageCoursesAndContent.waitForDisplayed();
  AdminPage.linkManageCoursesAndContent.waitForClickable();
  AdminPage.linkManageCoursesAndContent.click();

  AdminPage.headingCourses.waitForDisplayed();
});

When('click on "Learning Objects" in the menu', function() {
  AdminPage.linkLearningObjects.waitForClickable();
  AdminPage.linkLearningObjects.click();

  AdminPage.headingLearningObjects.waitForDisplayed();
});

When('click on "Add New From Web"', function() {
  AdminPage.linkAddNewFromWeb.click();

  AdminPage.headingCreateLearnLink.waitForDisplayed();
});

When('select a value for "Topic" from the dropdown', function() {
  AdminPage.dropdownEditTopic.selectByVisibleText("Digital literacy");
});

let title = '';
When('fill in a title "{}"', function(textTitle) {
  title = textTitle;
  AdminPage.inputTitle.setValue(textTitle);
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
  const el = $("input.input--file");
  browser.execute(function() {
    const el = "input.input--file";
    document.querySelector(el).style.visibility = 'visible';
    document.querySelector(el).style.opacity = 100;
    document.querySelector(el).style.height = '100px';
  });

  el.waitForDisplayed();
  el.waitForClickable();
  el.setValue(img);

  // Alternative Image Text is required
  AdminPage.inputAltImgText.waitForDisplayed();
  AdminPage.inputAltImgText.setValue('test image');
});

When("provide a brief description", function() {
  AdminPage.inputDescription.setValue("Test Description");
});

When("add two tags", function() {
  AdminPage.inputTags.click();
  browser.keys(["test-tag1", "Enter"]);
  browser.keys(["test-tag2", "Enter"]);
});

When('add a content link "{}"', function(url) {
  AdminPage.inputContentLink.setValue(url);
});

When("click save", function() {
  AdminPage.btnSave.click();

  AdminPage.headingLearningObjects.waitForDisplayed();
});

When('I click on view for "Test Title"', function() {
  // Improvement: Generalize title to user input
  const a = $$("a=Test Title")[0];  // $$() because there are more than one link
  a.click();

  const aIsActive = $("a.is-active");
  aIsActive.waitForDisplayed();
});

When('I click on "Read more"', function() {
  // Strange issue with clicking this button
  AdminPage.btnReadMore.waitForDisplayed();
  AdminPage.btnReadMore.scrollIntoView();
  AdminPage.btnReadMore.waitForClickable();
  AdminPage.btnReadMore.click();

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
  expect(AdminPage.messageStatus).toHaveTextContaining(`Learn Link ${title} has been created.`);
});

Then("I should see the title, description, and tags are populated", function() {
  expect(AdminPage.viewTitle).toBeDisplayed;
  expect(AdminPage.viewDescription).toBeDisplayed;
  expect(AdminPage.viewTag1).toBeDisplayed;
  expect(AdminPage.viewTag2).toBeDisplayed;
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

  browser.url(urlCMS);
  if (AdminPage.headingDashboard.isDisplayed()) {
    const urlLogout = "https://testery.slgo.gowithsparklearn.com/user/logout";
    browser.url(urlLogout);
  }

  LoginPage.inputEmail.setValue(credsLearner.email);
  LoginPage.inputPassword.setValue(credsLearner.password);
  LoginPage.btnSignIn.click();

  // Learner's homepage unique element
  LearnerPage.linkPersonallyRecommended.waitForDisplayed();
});

When('I click on "New"', function() {
  LearnerPage.linkRecentlyAdded.waitForClickable();
  LearnerPage.linkRecentlyAdded.click();
});

When("click on the bookmark icon for the {} item listed", function(nth) {
  let index = 0;
  if (nth == 'first') {
    index = 0;
  }
  if (nth == 'second') {
    index = 1;
  }
  const btn = LearnerPage.btnBookmarks[index];
  btn.waitForClickable();
  btn.click();

  // After bookmark is clicked, icon color is filled
  LearnerPage.flagActive.waitForDisplayed();
});

Then("the bookmark icon fills in", function() {
  expect(LearnerPage.flagActive).toBeDisplayed();
});

When('I click on "Me" in the main menu', function() {
  LearnerPage.linkMe.waitForClickable();
  LearnerPage.linkMe.click();

  // An unique element on the "Me" page is a link to Bookmarks
  LearnerPage.linkMyBookmarks.waitForDisplayed();
});

title="Test Title";
Then("I should see the first bookmark listed is the item bookmarked previously", function() {
  const s = $(`span*=${title}`);
  expect(s).toBeDisplayed();
});
