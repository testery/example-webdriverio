import { When, Then } from "cucumber";
import { source } from 'axe-core';
const { expect } = require('chai');
const fs = require('fs');

let results = {};

When("I run an accessibility test", function() {

  browser.execute(source);
  
  const options = { runOnly: { type: 'tag', values: ['wcag2a'] } };
  
  results = browser.executeAsync((options, done) => {
    axe.run(document, options, function(err, results) {
      if (err) throw err;
        done(results);
      });
  }, options);

  let data = JSON.stringify(results);
  var timestamp = new Date().getTime();
  fs.writeFileSync('axe/axe-' + timestamp + '.json', data);

  //expect(results.violations.length).to.be.equal(0,`${browser.getUrl()} doesn't pass accessibility test`);

});

Then("there should be no accessibility violations", function() {
  expect(results.violations.length).to.be.equal(0,`${browser.getUrl()} doesn't pass accessibility test`);
  // expect(report.size()).to.equal(0); 
});

Then("the following rules are enforced", function (dataTable){
  var rules = dataTable.raw();
  var rulesViolated = false;
  var failureMessage = "";

  rules.forEach( (rule) => {
    var id = rule[0]

    results.violations.forEach( (violation) => {
      if (violation.id == id)
      {
          console.warn("[WARN] Rule violated - " + violation.id + "\n" + violation.description + "\n" + violation.helpUrl + "\n\n");
          failureMessage += "[WARN] Rule violated - " + violation.id + "\n" + violation.description + "\n" + violation.helpUrl + "\n\n";
          rulesViolated = true;
      }

    })    

  }, this);

  expect(rulesViolated, failureMessage).to.be.false;

});