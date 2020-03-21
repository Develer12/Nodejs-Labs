let oldNum = '';

function disableDel(){
  console.log('c');
  let del = document.getElementById('delete');

  if(del){
    del.disabled = true;
  }
}

function Add(){
  let Pnumber = document.getElementById('Pnumber').value;
  let FIO = document.getElementById('FIO').value;

  let LINK = `/Add`;
  fetch(LINK, {
    method: 'Post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      fio: FIO,
      number: Pnumber
    })
  })
  .catch((err) => console.log(`Fetch ERROR by ${LINK}: ${err}`));
}

function Delete(){
  let Pnumber = document.getElementById('Pnumber').value;

  let LINK = `/Delete`;
  fetch(LINK, {
    method: 'Post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      number: Pnumber
    })
  })
  .catch((err) => console.log(`Fetch ERROR by ${LINK}: ${err}`));
}

function Change(item){
  let back = document.getElementById('back');
  let del = document.getElementById('delete');
  if(del){
    del.disabled = false;


    let Pnumber = document.getElementById('Pnumber');
    let FIO = document.getElementById('FIO');

    FIO.value = item.querySelector('#list-fio').innerHTML;
    Pnumber.value = item.querySelector('#list-number').innerHTML;

    oldNum = Pnumber.value;
  }
  else if(!back || del){
    location.href = '/Update';
  }
}

function Update(){
  let Pnumber = document.getElementById('Pnumber').value;
  let FIO = document.getElementById('FIO').value;

  let LINK = `/Update`;
  fetch(LINK, {
    method: 'Post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      fio: FIO,
      number: Pnumber,
      oldNum: oldNum
    })
  })
  .catch((err) => console.log(`Fetch ERROR by ${LINK}: ${err}`));
}
