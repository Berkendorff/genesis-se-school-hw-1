const {writeFile} = require('fs').promises;
const {constants, accessSync, writeFileSync, readFileSync} = require('fs');

class Database {
    constructor(filePath){
        try {
            accessSync(filePath, constants.F_OK);
            this.filePath = filePath;
            this.rawData = readFileSync(this.filePath);
            console.log(`\nDatabase loaded from ${filePath}\n`);
        } catch(err) {
            this.rawData = '{}';
            this.filePath = filePath;
            writeFileSync(this.filePath, this.rawData);
            console.log(`\nDatabase initialized in ${filePath}\n`);
        } finally {
            this.data = JSON.parse(this.rawData);
        }
    }

    async commit() {
        const {data, filePath} = this;
        this.rawData = JSON.stringify(data, null,'\t');
        await writeFile(filePath, this.rawData);
    }

    async write(entityName, entity) {
        const {data} = this;
        if(!data[entityName]) {
            data[entityName] = [];
        }
        data[entityName].push(entity);
        await this.commit();
    }

    findAll(entityName) {
        return this.data[entityName] || [];
    }

    findByKey(entityName, {key, value}){
        const users = this.data[entityName];
        return users && users.length > 0 
            ? users.filter((entity) => entity[key] === value) 
            : [];
    }
}

module.exports = Database;