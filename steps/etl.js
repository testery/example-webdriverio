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
        console.log('CSV file successfully loaded');
      });
});