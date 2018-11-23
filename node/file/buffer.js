// NodeJS提供了一个与String对等的全局构造函数Buffer来提供对二进制数据的操作。
// 除了可以读取文件得到Buffer的实例外，还能够直接构造


// var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
// var str = bin.toString('utf-8'); // => "hello"


// var binStr = new Buffer('hello', 'utf-8') // => <Buffer 68 65 6c 6c 6f>


var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var sub = bin.slice(2);
// bin:  <Buffer 68 65 6c 6c 6f>
// sub:  <Buffer 6c 6c 6f>
