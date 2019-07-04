function shuffle (arr) {
    var i, j, tmp
    for (i = arr.length ;i ;i--) {
        j = Math.floor(Math.random() * i)
        tmp = arr[i - 1]
        arr[i - 1] = arr[j]
        arr[j] = tmp
    }
    return arr
}

let arr = [1,2,3,4,5,6,7,8,9,10]
let shuf = shuffle(arr)
console.log(shuf)