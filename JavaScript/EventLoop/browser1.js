console.log('1');

setTimeout(function() {
    console.log('2');
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})

// 在浏览器环境下 1 7 8 2 4 5 9 11 12
// 在node环境下 1 7 8 2 4 9 11 5 12
// node环境中，由于两个setTimeout延时相同，被合并入了同一个expired timers queue，node会认为两个setTimeout是同一级宏任务，所以一起执行了