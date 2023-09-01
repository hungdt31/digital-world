const checkStars = (number) => {
    var arr = []
    for(var i = 0; i < number; i++){
        arr[i] = true
    }
    for(var i = number; i <= 4; i++){
        arr[i] = false
    }
    return arr
}
export default checkStars