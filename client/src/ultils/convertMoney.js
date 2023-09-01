const convertVNDtoVNDString = (priceNumber) => {
    const priceString =
        new Intl.NumberFormat("vi-VN", { minimumFractionDigits: 2 }).format(
            priceNumber
        ) + " VND";
    return priceString;
};
const convertVNDToUSDString = (amountVND, exchangeRate) => {
    const amountUSD = amountVND / exchangeRate;
    const formattedAmount = "$" + amountUSD.toFixed(2) + " USD";
    return formattedAmount;
};
export {
    convertVNDtoVNDString,
    convertVNDToUSDString,
};
