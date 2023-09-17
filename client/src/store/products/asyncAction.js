import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getCategories = createAsyncThunk(
    "app/categories",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apis.apiGetCategories();
            console.log(response)
            if (!response.data.success) {
                // Throw an error if the API response is not successful
                throw new Error("API response is not successful");
            }
            return response.data.productCategories;
        } catch (error) {
            // Use rejectWithValue to return an error object
            return rejectWithValue(error);
        }
    }
);
