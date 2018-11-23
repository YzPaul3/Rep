const path = require('path')
const fs = require('fs')

function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname, dir);
        }
    });
}

travel('/Users/paul/learn/Rep/node', function(pathname, dir) {
    console.log(pathname, dir)
})
