import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null
    },
    reducers: {
        register: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.current = action.payload.userData
            state.token = action.payload.token
        }
    },
    // extraReducers: (builder) => {
    //     // Bắt đầu thực hiện action getCategories (Promise pending)
    //     builder.addCase(getCategories.pending, (state) => {
    //         // Bật trạng thái loading
    //         state.isLoading = true;
    //     });

    //     // Khi thực hiện action getCategories thành công (Promise fulfilled)
    //     builder.addCase(getCategories.fulfilled, (state, action) => {
    //         // Tắt trạng thái loading, lưu thông tin user vào store
    //         state.isLoading = false;
    //         state.categories = action.payload;
    //     });

    //     // Khi thực hiện action getCategories thất bại (Promise rejected)
    //     builder.addCase(getCategories.rejected, (state, action) => {
    //         // Tắt trạng thái loading, lưu thông báo lỗi vào store
    //         state.isLoading = false;
    //         state.errorMessage = action.payload.message;
    //         console.log(state.errorMessage)
    //     });
    // },
});
export const {register} = userSlice.actions
export default userSlice.reducer

