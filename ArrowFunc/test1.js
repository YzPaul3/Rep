let a = 1
let obj = {
    a: 2,
    fn: () => {
        console.log(this.a)
    }
}
obj.fn()
