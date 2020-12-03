import { When, Then } from "cucumber";
import CsvDataWriter from "./utils/CsvDataWriter";
const { expect } = require("chai");
const csv = require('csv-parser');
const fs = require('fs');
var path = require('path')
var assert = require('assert');

let extractedData = [];

When("{string} is a CSV file with the following records", function(file, table) {
    
    const csvWriter = new CsvDataWriter(file);
    csvWriter
        .writeRecords(table)
        .then(() => {
            console.log("done");
        });
});

When("I verify the data on {string} matches the following patterns", function(file, table) {
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (row) => {
        for (const property in row) {
            let actualValue = row[property];
            let expectedPattern = new RegExp(table.hashes()[0][property]);

            console.log("checking that " + actualValue + " matches the regex: "+ expectedPattern);
            if(expectedPattern.test(actualValue) !== true) {
                throw new Error(actualValue + " does not match " + expectedPattern);
            };
        }
      })
      .on('end', () => {
        console.log('All values matched their expected pattern');
      });
});


When("I verify the data on {string} is in the following ranges", function(file, table) {
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (row) => {
        for (const property in row) {
            for (const header in table.hashes()[0]) {
                if (property == header) {
                    let range = table.hashes()[0][header].split('<');
                    let min = parseInt(range[0]);
                    let max = parseInt(range[range.length - 1]);
                    if(min < row[property] && max > row[property]) {
                        console.log("verified " + row[property] + " is within expected range: " + range.join('<'));
                    } else {
                        throw new Error(row[property] + " is NOT within expected range: " + range.join('<'));
                    }
                }
            }    
        }
      })
      .on('end', () => {
        console.log('All values are within the expected range');
      });
});

When("I run the statistics ETL job on {string}", function(file) {
    
    // stub that outputs what is expected by etl job
    console.log('---- RUNNING ETL JOB ----');

    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
      path: 'test-stats.csv',
      header: [
        {id: 'Avg Age', title: 'Avg Age'},
        {id: 'Avg Score', title: 'Avg Score'}
      ]
    });
    const data = [
      {
        'Avg Age': 16,
        'Avg Score': 90 
      }
    ];
    csvWriter
      .writeRecords(data)
      .then(()=> console.log("transformed data from " + file + " and loaded results into test-stats.csv"));
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

When("I read the {string} CSV file", function(file) {

  extractedData = [];

  fs.createReadStream(file)
    .pipe(csv())
    .on('data', (row) => {
      extractedData.push(row);
      console.log(row);
    })
    .on('end', () => {
      console.log('CSV file data successfully extracted');
    });
});

When("I verify the {string} CSV file has {string} rows", function(file, numOfRows) {

 expect(extractedData.length).to.eq(parseInt(numOfRows));
});

When("I verify the data on {string} has the following values", function(file, table) {
  
  extractedData.forEach((row, index) => {
    assert.deepEqual(row, table.hashes()[index]);
  });
});
