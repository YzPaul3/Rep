// 当内存中无法一次装下需要处理的数据时，或者一边读取一边处理更加高效时，我们就需要用到数据流

// var rs = fs.createReadStream(src);

// rs.on('data', function (chunk) {
//     rs.pause();
//     doSomething(chunk, function () {
//         rs.resume();
//     });
// });

// rs.on('end', function () {
//     cleanUp();
// });

// 我们也可以为数据目标创建一个只写数据流
function readAndWrite() {
    var rs = fs.createReadStream(src);
    var ws = fs.createWriteStream(dst);

    rs.on('data', function (chunk) {
        ws.write(chunk);
    });

    rs.on('end', function () {
        ws.end();
    });
}



// 如果写入速度跟不上读取速度的话，只写数据流内部的缓存会爆仓。
// 我们可以根据.write方法的返回值来判断传入的数据是写入目标了，还是临时放在了缓存了
// 并根据drain事件来判断什么时候只写数据流已经将缓存中的数据写入目标，可以传入下一个待写数据


// NodeJS直接提供了.pipe方法来做这件事情，其内部实现方式与上边的代码类似
var rs = fs.createReadStream(src);
var ws = fs.createWriteStream(dst);

rs.on('data', function (chunk) {
    if (ws.write(chunk) === false) {  // 写入缓存了
        rs.pause();
    }
});

rs.on('end', function () {
    ws.end();
});

ws.on('drain', function () {
    rs.resume();
});