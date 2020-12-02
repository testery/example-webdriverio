import { When, Then } from "cucumber";
const { expect } = require("chai");
const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

When("{string} is a CSV file with the following records", function(file, table) {
    
    const data = table.hashes();

    const headers = table.raw()[0].map(function (key) {
        let obj = {};
        obj['id'] = key;
        obj['title'] = key;
        return obj;
    });

    const csvWriter = createCsvWriter({
        path: file,
        header: headers
    });

    csvWriter
        .writeRecords(data)
        .then(()=> console.log('The CSV file was written successfully'));
});