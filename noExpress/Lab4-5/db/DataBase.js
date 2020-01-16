const EventEmitter = require('events');
const fs = require('fs');

class DataBase extends EventEmitter{
    static names() {
        return require('./data/names');
    }

    constructor(model) {
        super();
        this.model = model;
    }

    async stCommit() {
    }
    async getRows() {
        return await this.select().catch(err => err);
    }
    async addRow(newObject) {
        return await this.insert(newObject).catch(err => err);
    }
    async updateRow(newFields) {
        return await this.update(newFields).catch(err => err);
    }
    async removeRow(id) {
        return await this.delete(id).catch(err => err);
    }

    async select() {
        return this.model;
    }
    async commit(object, action) {
      console.log(__dirname + '/data/names.json'+': '+ fs.existsSync(__dirname + '/data/names.json'));

        if (action === 'insert')
            this.model.push(object);
        else if (action === 'delete')
            this.model.splice(this.model.indexOf(object), 1);
        await fs.writeFile(__dirname + '/data/names.json', JSON.stringify(this.model, null, '  '), () => {});
    }
    async insert(object) {
        console.log('insert');
        if(object.id == '0')
         object.id = Math.max(...this.model.map(m => m.id)) + 1;
        await this.commit(object, 'insert');
        return object;
    }
    async update(updatedFields) {

        let oldObject = this.model.find(m => m.id == updatedFields.id);
        if (!oldObject) {
            throw {message: 'Invalid Request', code: 401};
        }

        this.model.splice(this.model.indexOf(oldObject), 1);
        this.model.push(updatedFields);
        await fs.writeFile(__dirname + '/data/names.json', JSON.stringify(this.model, null, '  '), () => {});
        return oldObject;
    }
    async delete(id) {
        let oldObject = this.model.find(m => m.id == id);
        if (!oldObject) {
            throw {message: 'Invalid Request', code: 401};
        }
        await this.commit(oldObject, 'delete');
        return oldObject;
    }
}


module.exports = DataBase;
