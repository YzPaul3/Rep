const dns = require('dns')
const options = {all: true};
dns.lookup('www.qq.com', options, function(err, address, family){
    if(err) throw err;
    console.log('lookup:' + JSON.stringify(address));
});

dns.resolve4('id.qq.com', function(err, address){
    if(err) throw err;
    console.log('resolve4:' + JSON.stringify(address));
});


// 区别 lookup会寻找本地hosts文件配置  127.0.0.1 www.qq.com
