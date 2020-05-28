

function query(key) {
    let search = location.search.substr(1);
    // search:  a=1&b=2&c=3
    const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`, 'i');
    let res = search.match(reg);
    if (res === null) {
        return null;
    }
    return res[2];
}
let res = query('b');
console.log(res);