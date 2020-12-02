import DataWriter from "./DataWriter";
const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

class CsvDataWriter extends DataWriter {

    constructor(fileName) {
        super()
        this.fileName = fileName;
    };

    prepareFileHeaders(table) {
        return table.raw()[0].map(function (key) {
            let obj = {};
            obj['id'] = key;
            obj['title'] = key;
            return obj;
        });
    }

    prepareFileData(table) {
        return table.hashes();
    }

    writeRecords(table) {    
        const csvWriter = createCsvWriter({
            path: this.fileName,
            header: this.prepareFileHeaders(table)
        });
    
        return new Promise((resolve,reject) => {
            csvWriter
            .writeRecords(this.prepareFileData(table))
            .then(()=> {
                console.log('The CSV file was written successfully');
                resolve();
            });
        }); 
    }
};

export default CsvDataWriter;