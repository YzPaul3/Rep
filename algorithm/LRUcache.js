

class LRUCache {
    constructor (max) {
        this.max = max;
        this.keys = [];
        this.cache = {};
    }

    _findIdx (key) {
        return this.keys.indexOf(key);
    }

    get (key) {
        let keyIdx = this._findIdx(key);
        if (keyIdx > -1) {
            this.keys.splice(keyIdx, 1);
            this.keys.push(key);
            return this.cache[key];
        } else {
            return -1;
        }
    }

    put (key, value) {
        let keyIdx = this._findIdx(key);
        if (this.cache[key]) {
            this.keys.splice(keyIdx, 1);
            this.keys.push(key);
            this.cache[key] = value;
        } else {
            this.keys.push(key);
            this.cache[key] = value;
            if (this.keys.length > this.max) {
                delete this.cache[this.keys[0]];
                this.keys.shift();
            }
        }
    }
}

// 进阶：Map

// 利用 Map 既能保存键值对，并且能够记住键的原始插入顺序

// var LRUCache = function(capacity) {
//     this.cache = new Map()
//     this.capacity = capacity
// }

// LRUCache.prototype.get = function(key) {
//     if (this.cache.has(key)) {
//         // 存在即更新
//         let temp = this.cache.get(key)
//         this.cache.delete(key)
//         this.cache.set(key, temp)
//         return temp
//     }
//     return -1
// }

// LRUCache.prototype.put = function(key, value) {
//     if (this.cache.has(key)) {
//         // 存在即更新（删除后加入）
//         this.cache.delete(key)
//     } else if (this.cache.size >= this.capacity) {
//         // 不存在即加入
//         // 缓存超过最大值，则移除最近没有使用的
//         this.cache.delete(this.cache.keys().next().value)
//     }
//     this.cache.set(key, value)
// }