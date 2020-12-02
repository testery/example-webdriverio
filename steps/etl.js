import { When, Then } from "cucumber";
import CsvDataWriter from "./utils/CsvDataWriter";
const { expect } = require("chai");
const csv = require('csv-parser');
const fs = require('fs');

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
    
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (row) => {
        extractedData.push(row);
        console.log(row);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
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