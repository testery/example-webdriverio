import { When, Then } from "cucumber";
import { doesNotMatch } from "assert";
import { assert } from "console";
import { resolve } from "path";
const { expect } = require("chai");
const { exec } = require("child_process");
// const spawn = require("child_process").spawn;


let stndout;
let stnderr;

When("I run a command", function() {
  execShellCmd('sudo apt-get install -y nikto').then((proc) => {
    execShellCmd('nikto -H').then((proc2) => {

    });
  });
});

function execShellCmd(cmd) {
  return new Promise((resolve,reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      console.log(stdout);
      resolve(stdout ? stdout : stderr);
    });
  });
};

//Then("the exit code is {int}", function(code){
//  expect(code).to.equal(exitCode);
//});

Then("the output is {string}", function(output) {
  expect(stndout).to.equal(output);
});