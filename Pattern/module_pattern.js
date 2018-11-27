// 模块模式使用IIFE（立即调用的函数表达式），闭包和函数作用域来模拟此概念。


const myModule = (function() {

    const privateVariable = 'Hello World';

    function privateMethod() {
        console.log(privateVariable);
    }

    return {
        publicMethod: function() {
            privateMethod();
        }
    }

})();

myModule.publicMethod();

/* 此时模块相当于
const myModule = {
  publicMethod: function() {
    privateMethod();
  }
};
*/