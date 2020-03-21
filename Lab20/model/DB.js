const fs = require('fs');
let phoneNumbers = require('./data/phoneNumbers');

function commit() {
    fs.writeFile(__dirname + '/data/phoneNumbers.json', JSON.stringify(phoneNumbers, null, '  '), err => {
        if (err) {throw err;}
    });
}

module.exports ={
    GetAll: () => {return phoneNumbers},
    Add(field){
        const {fio, number} = field;
        if (fio && number) {
          phoneNumbers.push({
              fio,
              number
          });
          commit();
        }
    },
    Update(field){
        const {fio, number, oldNum} = field;

        if (fio, number, oldNum) {
          let isNumber = phoneNumbers.find(phone => phone.number == oldNum);
          if (!isNumber) {
            throw new Error('Phone number is not exists');
          }

          isNumber.fio = fio;
          isNumber.number = number;

          commit();
        }
    },
    Delete(number) {
      let isNumber = phoneNumbers.find(phone => phone.number == number);
      if (!isNumber) {
        throw new Error('Phone number is not exists');
      }
      phoneNumbers = phoneNumbers.filter(phone => phone.number != number);
      commit();
    }
};
