function convertToVND(amount) {
    const cleanedAmount = amount.replace(/[^\d.,]/g, ""); // Loại bỏ tất cả ký tự không phải là số, dấu chấm và dấu phẩy
    const isUSD = amount.includes("$"); // Kiểm tra xem chuỗi có chứa ký tự "$" không

    if (isUSD) {
        const numericValue = parseFloat(
            cleanedAmount.replace("$", "").replace(",", ".")
        );
        const vndValue = numericValue * 23000; // Tỉ giá USD sang VND

        return vndValue;
    } else {
        const numericValue = parseFloat(
            cleanedAmount.replace(/\./g, "").replace(",", ".")
        );
        return numericValue;
    }
}
module.exports = convertToVND;
