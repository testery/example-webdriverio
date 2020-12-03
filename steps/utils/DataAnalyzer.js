import CsvDataWriter from "./CsvDataWriter";
import CsvDataReader from "./CsvDataReader";
var path = require('path');

class DataAnalyzer {

    constructor(fileName) {
        this.fileName = fileName;
        this.extractedData = []; // array of objects

        if (path.extname(fileName) === ".csv") {
            this.dataReader = new CsvDataReader(fileName);
            this.dataWriter = new CsvDataWriter(fileName);
        } else if (path.extname(file) === ".json" ) {
            // this.dataReader = new JsonDataReader(fileName);
            // this.dataWriter = new JsonDataWriter(fileName);
        }
    };
}

export default DataAnalyzer;