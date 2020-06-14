const exec = require('child_process').execFile;
const dir = exec('c', 
    {cwd: 'D:\\Subject\\Cross\\Lab\\Ekz2\\44.exec io\\c\\c\\bin\\Debug'},
    (err, stdout, stderr) => {
        if(stderr){
            console.log(`stderr: ${stderr}`);
        }
        else{
            console.log(`stdout: ${stdout}`);
        }
});

dir.stdin.write('da');
dir.stdin.end(); 

//exec — метод child_process.exec запускает команду в оболочке/консоли и буферизует вывод.
