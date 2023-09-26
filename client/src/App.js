import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import path from "./ultils/path";
import Public from "./pages/public/Public";
import { Home, Login, Products, Services, FAQ, DetailProduct, Blogs, ResetPassword} from "./pages/public";
import ErrorPage from "./pages/public/ErrorPage";
import FinalRegister from "./pages/public/FinalRegister";
import ForgotPassword from "./pages/public/ForgotPassword";
const App = () => {
    return (
        <div className="font-main min-h-screen">
            <Routes>
            <Route path={path.PUBLIC} element={<Public />}>
                <Route path={path.HOME} element={<Home />}></Route>
                <Route path={path.BLOGS} element={<Blogs />}></Route>
                <Route path={path.FAQ} element={<FAQ/>}></Route>
                <Route path={path.OUR_SERVICE} element={<Services/>}></Route>
                <Route path={path.PRODUCTS} element={<Products/>}></Route>
                <Route path={path.DETAIL_PRODUCT_PID_TITLE} element={<DetailProduct/>}></Route>
            </Route>
            <Route path={path.FINAL_REGISTER} element={<FinalRegister/>}></Route>
            <Route path={path.ERROR} element={<ErrorPage />}></Route>
            <Route path={path.LOGIN} element={<Login />}></Route>
            <Route path={path.RESET_PASSWORD} element={<ResetPassword />}></Route>
        </Routes>
        </div>
    );
};
export default App;
