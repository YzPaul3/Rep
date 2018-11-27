// 工厂模式是一种使用工厂方法创建对象的设计模式，而不指定创建对象的确切的类或构造函数。
// 不指定创建对象的确切的类或构造函数
// 工厂模式用于在不公开实例化逻辑的情况下创建对象。
// 当我们需要根据特定条件生成不同的对象时，可以使用此模式

class vehicleFactory {
    createVehicle(options) {
        if (options.type === 'car') {
            return new Car(options)
        } else if (options.type === 'truck') {
            return new Truck(options)
        }
    }
}

class Car {
    constructor(options) {
        this.name = options.type || 'car'
        this.color = options.color || 'white'
    }
}

class Truck {
    constructor(options) {
        this.name = options.type || 'truck'
        this.color = options.color || 'black'
    }
}

const factory = new vehicleFactory()

const car = factory.createVehicle({
    type: 'car',
    color: 'blue'
})

console.log(car)   // Car { name: 'car', color: 'blue' }