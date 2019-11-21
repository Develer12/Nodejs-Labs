const sql = require('mssql');

let getfac = ()=>{new sql.Request().query('select FUCULTY_NAME from FUCULTY', _result)};
let getpul = ()=>{new sql.Request().query('select PULPIT_NAME from PULPIT', _result)};
let getsub = ()=>{new sql.Request().query('select SUBJECT_NAME from SUBJECT', _result)};
let getaudittype = ()=>{new sql.Request().query('select AUDITORIUM_TYPENAME from AUDITORIUM_TYPE', _result)};
let getaudit = ()=>{new sql.Request().query('select AUDITORIUM_NAME from AUDITORIUM', _result)};




module.exports = {};
