console.log("da");
var functions = [];

for (var i = 0; i < 9; i++) {
    functions[i] = function (a) { return a*i; }
}

console.log(String(functions[10](5)));
