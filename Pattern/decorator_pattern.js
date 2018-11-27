// 装饰者模式用于扩展对象的功能，而无需修改现有的类或构造函数。 
// 此模式可用于向对象添加功能，而无需它们修改底层代码。

// 首先，我们创建一个基类 Car，用于创建 Car 对象
// 基类 不在此类上扩展实例的功能哦，不要修改基类
class Car {
    constructor() {
        // Default Cost
        this.cost = function() {
            return 20000;
        }
    }
}

// 然后我们为了不同的功能创建了装饰者函数, 并将实例化后的Car 对象作为参数传递

// Decorator function 传入的是实例
function carWithAC(car) {
    car.hasAC = true;
    const prevCost = car.cost();
    car.cost = function() {
        return prevCost + 1000;
    }
}
// Decorator function
function carWithPowerLocks(car) {
    car.hasPowerLocks = true;
    const prevCost = car.cost();
    car.cost = function() {
        return prevCost + 2000;
    }
}

const car = new Car();
console.log(car.cost());
 
carWithAC(car);
console.log(car.cost());

carWithPowerLocks(car);
console.log(car.cost());


