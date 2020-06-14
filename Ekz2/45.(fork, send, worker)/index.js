const child = require('child_process');
const fp = child.fork('fork.js');

const send = () => {
    fp.send('HI');
};
setInterval(send, 2000);

//fork — метод child_process.fork является особым случаем spawn() для создания дочерних процессов.
//Модуль worker_threads — это пакет, который позволяет создавать полнофункциональные многопоточные приложения Node.js.
//Потоковый воркер (thread worker) — фрагмент кода (обычно извлекаемый из файла), созданный в отдельном потоке.
