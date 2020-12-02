import { When, Then } from "cucumber";
import CsvDataWriter from "./utils/CsvDataWriter";
const { expect } = require("chai");


When("{string} is a CSV file with the following records", function(file, table) {
    
    const csvWriter = new CsvDataWriter(file);
    csvWriter
        .writeRecords(table)
        .then(() => {
            console.log("done");
        });
});