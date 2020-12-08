import DataWriter from "./DataWriter";
const fs = require('fs');

class JsonDataWriter extends DataWriter {

    constructor(fileName) {
        super()
        this.fileName = fileName;
    };

    prepareFileData(table) {
        return JSON.stringify(table.hashes());
    }

    writeRecords(table) {
        return new Promise((resolve,reject) => {
            fs.writeFileSync(this.fileName, this.prepareFileData(table));
            resolve();
        });
    }
};

export default JsonDataWriter;