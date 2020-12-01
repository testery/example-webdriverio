import { When, Then } from "cucumber";
const { expect } = require("chai");
const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

When("{string} is a CSV file with the following records", function(file, table) {

var d = table.raw();
// var obj = Object.fromEntries(d);
// console.log(obj);
const output = d.map(row => Object.fromEntries(row));
console.log(output);
// const d2 = [];
// d.forEach(element => {
//     let o = {};
//     d2.push(o[element[0]] = element[1])
// });

// console.log(d2)


const csvWriter = createCsvWriter({
    path: 'out.csv',
    header: [
      {id: 'name', title: 'Name'},
      {id: 'surname', title: 'Surname'},
      {id: 'age', title: 'Age'},
      {id: 'gender', title: 'Gender'},
    ]
  });
  const data = [
    {
      name: 'John',
      surname: 'Snow',
      age: 26,
      gender: 'M'
    }, {
      name: 'Clair',
      surname: 'White',
      age: 33,
      gender: 'F',
    }, {
      name: 'Fancy',
      surname: 'Brown',
      age: 78,
      gender: 'F'
    }
  ];
  csvWriter
    .writeRecords(data)
    .then(()=> console.log('The CSV file was written successfully'));

//    fs.createReadStream('data.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     console.log(row);
//   })
//   .on('end', () => {
//     console.log('CSV file successfully processed');
//   });
  });