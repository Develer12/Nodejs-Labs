function start() {
    JSON();
    XML();
}

async function JSON() {
    let jsonDiv = document.getElementById('json');
    fetch('http://localhost:5000/file/f.json')
        .then(response => response.text())
        .then(jsonResponse => {
            jsonDiv.innerText = jsonResponse;
        });
}

async function XML() {
    let xmlDiv = document.getElementById('xml');
    fetch('http://localhost:5000/file/f.xml')
        .then(response => response.text())
        .then(textResponse => {
            xmlDiv.innerText = textResponse;
        });
}
