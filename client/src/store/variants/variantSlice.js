import { createSlice } from "@reduxjs/toolkit";

export const variantSlice = createSlice({
    name: "variant",
    initialState: [],
    reducers: {
        addVariant: (state, action) => {
            const { name, array } = action.payload;

            // Kiểm tra xem biến thể đã tồn tại trong state chưa
            const existingVariant = state.find((variant) => variant.name === name);

            if (existingVariant) {
                // Biến thể đã tồn tại, cập nhật giá trị count cho từng phần tử trong mảng array
                array.forEach((item) => {
                    const foundItem = existingVariant.array.find((existingItem) => existingItem.value === item);

                    if (foundItem) {
                        // Tìm thấy phần tử, tăng giá trị count lên 1
                        foundItem.count += 1;
                    } else {
                        // Phần tử không tồn tại, thêm mới vào mảng
                        existingVariant.array.push({
                            value: item,
                            count: 1,
                        });
                    }
                });
            } else {
                // Biến thể chưa tồn tại, thêm mới biến thể và các phần tử vào mảng array
                state.push({
                    name,
                    array: array.map((item) => ({
                        value: item,
                        count: 1,
                    })),
                });
            }
        },
        clear:(state,action)=>{
            state = []
        }
    },
});

export const { addVariant, clear} = variantSlice.actions;
export default variantSlice.reducer;
