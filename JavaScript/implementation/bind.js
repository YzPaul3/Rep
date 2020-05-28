Function.prototype.bind1 = function () {
    const args = Array.prototype.slice.call(arguments);
    const t = args.shift();
    const self = this;
    return function () {
        return self.apply(t, args);
    }
}
