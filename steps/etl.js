import { When, Then } from "cucumber";
import CsvDataWriter from "./utils/CsvDataWriter";
import CsvDataReader from "./utils/CsvDataReader";
import DataAnalyzer from "./utils/DataAnalyzer";
const { expect } = require("chai");
const csv = require('csv-parser');
const fs = require('fs');
var path = require('path')
var assert = require('assert');
var mysql = require('mysql');

/*
* type: an array of objects (column headers are the keys).
* ex: [ {age: 7, name: Samantha }, {age: 3, name: Alexis } ]
*/
let extractedData = [];
let con = null;

When("{string} is a file with the following records", function(file, table) {
  const analyzer = new DataAnalyzer(file);
  
  table.hashes()
  analyzer
    .dataWriter
    .writeRecords(table)
    .then(() => {
      console.log("loaded records from table into new file: " + file + " successfully");
  });
});

When("I read the {string} file", function(file) {
  const analyzer = new DataAnalyzer(file);
  
  analyzer
    .dataReader
    .readRecords()
    .then((arrayOfObjects) => {
      extractedData = arrayOfObjects;
      console.log(extractedData);
    });
});

When("I verify the data on {string} matches the following patterns", function(file, table) {
  const analyzer = new DataAnalyzer(file);
  
  analyzer
    .dataReader
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
  const analyzer = new DataAnalyzer(file);
  
  analyzer
    .dataReader
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

When("I verify the {string} file has {string} rows", function(file, numOfRows) {

 expect(extractedData.length).to.eq(parseInt(numOfRows));
});

When("I verify the data on {string} has the following values", function(file, table) {
  
  extractedData.forEach((row, index) => {
    assert.deepEqual(row, table.hashes()[index]);
  });
});

When("I connect to the following MySql database", function (table) {

  con = mysql.createConnection({
    host: table.hashes()[0]["host"],
    port: table.hashes()[0]["port"],
    user: table.hashes()[0]["user"],
    database: table.hashes()[0]["database"],
    connectTimeout: 30000
  });

  return new Promise((resolve,reject) => {
    con.connect();
    console.log("connected to mysql-rfam-public.ebi.ac.uk");
    resolve();
  });
});

let results = [];

When("I run the following sql query", function(docString) {
  let sql = docString;
  console.log("RUNNING SQL: " + sql);

  return new Promise((resolve,reject) => {
      con.query(sql, function(err,result) {
        if (err) reject(err);
        console.log("RESULT OF QUERY:");
        result.forEach(row => {
          results.push(row);
          console.log(results);
        });
        resolve();
      });
  });
});


When("I run the statistics ETL job on {string}", function(file) {
    
  // stub that outputs what is expected by etl job
  console.log('---- RUNNING ETL JOB ----');
  const data = [{'Avg Age': 16,'Avg Score': 90 }];
  
  if(path.extname(file) === ".csv") {
  
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({path: 'test-stats.csv', header: [{id: 'Avg Age', title: 'Avg Age'}, {id: 'Avg Score', title: 'Avg Score'}]});
    csvWriter
      .writeRecords(data)
      .then(()=> console.log("transformed data from " + file + " and loaded results into test-stats.csv"));
  } else if (path.extname(file) === ".json") {
  
    fs.writeFileSync('test-stats.json', JSON.stringify(data));
  };
});
