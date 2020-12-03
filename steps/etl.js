import { When, Then } from "cucumber";
import CsvDataWriter from "./utils/CsvDataWriter";
import CsvDataReader from "./utils/CsvDataReader";
const { expect } = require("chai");
const csv = require('csv-parser');
const fs = require('fs');
var path = require('path')
var assert = require('assert');

/*
* type: array of objects
* ex: [ {id:1, age: 7, name: Samantha }, {id:2, age: 3, name: Alexis } ]
*/
let extractedData = [];

When("{string} is a CSV file with the following records", function(file, table) {
    
  const csvWriter = new CsvDataWriter(file);
  csvWriter
    .writeRecords(table)
    .then(() => {
      console.log("done");
  });
});

When("I read the {string} CSV file", function(file) {

  const csvReader = new CsvDataReader(file);
  csvReader
    .readRecords()
    .then((arrayOfObjects) => {
      extractedData = arrayOfObjects;
    });
});

When("I verify the data on {string} matches the following patterns", function(file, table) {
  const csvReader = new CsvDataReader(file);
  csvReader
    .readRecords()
    .then((arrayOfObjects) => {
      for (let object of arrayOfObjects) {
        for (let key in object) {
          let actualValue = object[key];
          let expectedPattern = new RegExp(table.hashes()[0][key]);
      
          console.log("checking that " + actualValue + " matches the regex: "+ expectedPattern);
          if(expectedPattern.test(actualValue) !== true) {
              throw new Error(actualValue + " does not match " + expectedPattern);
          };
        }  
      }
      console.log('All values matched their expected pattern');
    });
});


When("I verify the data on {string} is in the following ranges", function(file, table) {
  const csvReader = new CsvDataReader(file);
  csvReader
    .readRecords()
    .then((arrayOfObjects) => {
      for (let object of arrayOfObjects) {
        for (let key in object) {
          for (let header in table.hashes()[0]) {
              if (key == header) {
                  let range = table.hashes()[0][header].split('<');
                  let min = parseInt(range[0]);
                  let max = parseInt(range[range.length - 1]);
                  if(min < object[key] && max > object[key]) {
                      console.log("verified " + object[key] + " is within expected range: " + range.join('<'));
                  } else {
                      throw new Error(object[key] + " is NOT within expected range: " + range.join('<'));
                  }
              }
          }    
        } 
      }
      console.log('All values are within the expected range');
  });     
});

When("I verify a {string} file is created", function(file) {
  
  let fileExists = false;

  try {
    if (fs.existsSync(file)) {
      fileExists = true;
    }
  } catch(err) {
    console.log(err);
  }

  expect(fileExists).to.be.true;
});

When("I verify the file format of {string} is {string}", function(file, format) {
  
  expect(path.extname(file) === format).to.be.true;
});

When("I verify the {string} CSV file has {string} rows", function(file, numOfRows) {

 expect(extractedData.length).to.eq(parseInt(numOfRows));
});

When("I verify the data on {string} has the following values", function(file, table) {
  
  extractedData.forEach((row, index) => {
    assert.deepEqual(row, table.hashes()[index]);
  });
});

When("I run the statistics ETL job on {string}", function(file) {
    
  // stub that outputs what is expected by etl job
  console.log('---- RUNNING ETL JOB ----');
  const data = [{'Avg Age': 16,'Avg Score': 90 }];
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({path: 'test-stats.csv', header: [{id: 'Avg Age', title: 'Avg Age'}, {id: 'Avg Score', title: 'Avg Score'}]});
  csvWriter.writeRecords(data).then(()=> console.log("transformed data from " + file + " and loaded results into test-stats.csv"));
});
