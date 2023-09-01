const convertMoney = (priceNumber) => {
    const priceString = new Intl.NumberFormat("vi-VN", { minimumFractionDigits: 2 }).format(priceNumber) + " VND";
    return priceString
}
export default convertMoney
