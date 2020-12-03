import DataReader from "./DataReader";
const csv = require('csv-parser');
const fs = require('fs');

class CsvDataReader extends DataReader {

    constructor(fileName) {
        super()
        this.fileName = fileName;
    };

    readRecords() {    
        let extractedData = [];

        return new Promise((resolve,reject) => {
            fs.createReadStream(this.fileName)
            .pipe(csv())
            .on('data', (row) => {
                extractedData.push(row);
                console.log(row);
            })
            .on('end', () => {
                console.log('CSV file data successfully extracted');
                resolve(extractedData);
            });
        }); 
    }
};

export default CsvDataReader;