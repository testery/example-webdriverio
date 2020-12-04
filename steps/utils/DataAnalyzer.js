import CsvDataWriter from "./CsvDataWriter";
import JsonDataWriter from "./JsonDataWriter";
import CsvDataReader from "./CsvDataReader";
import JsonDataReader from "./JsonDataReader";

var path = require('path');

class DataAnalyzer {

    constructor(fileName) {
        this.fileName = fileName;

        if (path.extname(fileName) === ".csv") {
            this.dataReader = new CsvDataReader(fileName);
            this.dataWriter = new CsvDataWriter(fileName);
        } else if (path.extname(fileName) === ".json" ) {
            this.dataReader = new JsonDataReader(fileName);
            this.dataWriter = new JsonDataWriter(fileName);
        }
    };
}

export default DataAnalyzer;