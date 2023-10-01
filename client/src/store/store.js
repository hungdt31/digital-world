import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./products/sidebarSlice";
import storage from  'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'
import userSlice from "./user/userSlice";
import variantReducer from "./variants/variantSlice";
const commonConfig = {
  key:'shop/user',
  storage
}
const userConfig = {
  ...commonConfig,
  whitelist:['isLoggedIn','token']
}
export const store = configureStore({
    reducer: {
        SideBar: sidebarReducer,
        user: persistReducer(userConfig,userSlice),
        variant: variantReducer
    },
});
export const persistor = persistStore(store)
