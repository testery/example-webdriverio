import DataReader from "./DataReader";
const fs = require('fs');

class JsonDataReader extends DataReader {

    constructor(fileName) {
        super()
        this.fileName = fileName;
    };

    readRecords() {    
        let extractedData = [];
        
        return new Promise((resolve,reject) => {
            let rawData = fs.readFileSync(this.fileName, {encoding: 'utf8'});
            extractedData = JSON.parse(rawData);
            console.log('JSON file data successfully extracted');
            resolve(extractedData);
        });
    }
};

export default JsonDataReader;