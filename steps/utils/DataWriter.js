class DataWriter {
    writeRecords(table) {
        throw new Error('needs to be implemented by subclass!');
    }
}

export default DataWriter;