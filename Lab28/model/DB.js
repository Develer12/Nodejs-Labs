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
          return 1;
        }
        return 0;
    },
    Update(field){
        const {fio, number} = field;

        if (fio, number) {
          let isNumber = phoneNumbers.find(phone => phone.number == number);
          if (!isNumber) {
            throw new Error('Phone number is not exists');
          }

          isNumber.fio = fio;
          isNumber.number = number;

          commit();
          return 1;
        }
        return 0;
    },
    Delete(number) {
        if(number){
            let isNumber = phoneNumbers.find(phone => phone.number == number);

            if (!isNumber) {
                throw new Error('Phone number is not exists');
            }
            phoneNumbers = phoneNumbers.filter(phone => phone.number != number);
            commit();
            return 1;
        }
        return 0;
    }
};
