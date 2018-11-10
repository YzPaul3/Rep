export const formatQuery = (data) => {
    let arr = []
    for (let key in data) {
        arr.push(`${key}=${data[key]}`)
    }
    return arr.join('&')
}
