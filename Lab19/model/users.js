let Users = [
  {
    id: 1,
    usname: 'admin',
    pass: 'admin'
  }
];

module.exports = {
  gelAll:()=>{
    return Users;
  },
  getById:(id)=>{
      return Users.find(user => user.id == id);
  }
};
