// 在暴露模块模式中，我们将返回的对象的属性映射到我们想要公开的私有函数。
const myRevealingModule = (function() {
  
    let privateVar = 'Peter';
    const publicVar  = 'Hello World';
   
    function privateFunction() {
      console.log('Name: '+ privateVar);
    }
    
    function publicSetName(name) {
      privateVar = name;
    }
   
    function publicGetName() {
      privateFunction();
    }
   
    /** reveal methods and variables by assigning them to object properties */
   
    return {
      setName: publicSetName,
      greeting: publicVar,
      getName: publicGetName
    };
})();
//    console.log(myRevealingModule)
  myRevealingModule.setName('Mark');
   
  // prints Name: Mark
  myRevealingModule.getName();