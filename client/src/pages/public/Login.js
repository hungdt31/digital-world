import React, { useState } from "react";
import img from "../../assets/triangle-2724449_1280.png";
import InputField from "../../components/InputField";
import icons from "../../ultils/icons";
import { NavLink } from "react-router-dom";
import path from "../../ultils/path";
import { signUp, login } from "../../apis/user";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { register } from "../../store/user/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [account, setAccount] = useState({
        firstname: "",
        email: "",
        password: "",
        lastname: "",
        moblie: "",
    });
    const { MdKeyboardReturn, AiOutlineCaretLeft } = icons;
    const [isRegister, setIsRegister] = useState(true);
    const resetPayload = (check) => {
        setIsRegister(check);
        setAccount({
            firstname: "",
            email: "",
            password: "",
            lastname: "",
            moblie: "",
        });
    };
    const handleSubmit = async () => {
        if (isRegister) {
            const { lastname, firstname, mobile, ...data } = account;
            // alert(JSON.stringify(data, null, 2));
            if (!data.email || !data.password) {
                // Kiểm tra xem email hoặc mật khẩu có bị trống không
                Swal.fire({
                    title: "Oops ...",
                    icon: "error",
                    text: "Vui lòng điền đầy đủ email và mật khẩu.",
                });
                return; // Dừng việc thực hiện yêu cầu nếu dữ liệu trống
            }
            const response = await login(data);
            console.log(response)
            if (response?.data?.success)
                Swal.fire({
                    title: "Congraluation",
                    icon: "success",
                    text: response.data.mess,
                }).then(()=>{
                    dispatch(register({
                        isLoggedIn: true,
                        token: response.data.accessToken,
                        userData: response.data
                    }))
                    navigate(`${path.HOME}`)
                })
            else
                Swal.fire({
                    title: "Oops ...",
                    icon: "error",
                    text: response.data.mess,
                });
            console.log(response);
        } else {
            // alert(JSON.stringify(account, null, 2))
            const response = await signUp(account);
            if (response.data.success)
                Swal.fire({
                    title: "Congraluation",
                    icon: "success",
                    text: response.data.mess,
                }).then(() => {
                    resetPayload(true);
                });
            else
                Swal.fire({
                    title: "Oops ...",
                    icon: "error",
                    text: response.data.mess,
                });
            console.log(response);
        }
    };
    return (
        <div className="relative h-[740px] w-full">
            <NavLink
                to={path.HOME}
                className="absolute top-2 font-bold left-2 cursor-pointer flex items-center bg-red-300 p-3 z-50 uppercase text-white bg-opacity-25"
            >
                <AiOutlineCaretLeft />
                Home
            </NavLink>
            <img src={img} className="w-full h-full object-cover" />
            <div className="flex justify-center items-center absolute top-0 w-full h-full z-40">
                <div className="rounded-lg bg-white top-1/3 p-3 left-1/4 lg:w-1/3 min-h-[350px] w-[75%]">
                    <p className="text-main text-[20px] uppercase font-bold text-center">
                        {isRegister ? "Sign In" : "Sign Up"}
                    </p>
                    <div className="flex flex-col gap-4 p-5">
                        {!isRegister && (
                            <div className="flex gap-3">
                                <InputField
                                    type="firstname"
                                    accountValue={setAccount}
                                    value={account.firstname}
                                />
                                <InputField
                                    type="lastname"
                                    accountValue={setAccount}
                                    value={account.lastname}
                                />
                            </div>
                        )}
                        <InputField
                            type="email"
                            value={account.email}
                            accountValue={setAccount}
                        />
                        {!isRegister && (
                            <InputField
                                name="phone"
                                type="mobile"
                                value={account.mobile}
                                accountValue={setAccount}
                            />
                        )}
                        <InputField
                            type="password"
                            value={account.password}
                            accountValue={setAccount}
                        />
                        <button
                            className="bg-main p-3 rounded-full w-full text-white font-semibold active:bg-red-400 hover:opacity-80 mt-3"
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Submit
                        </button>
                        <div className="flex justify-between min-[500px]:flex-row flex-col">
                            {isRegister && (
                                <div className="cursor-pointer underline text-red-400">
                                    Forgot Password
                                </div>
                            )}
                            {!isRegister && (
                                <div
                                    onClick={() => {
                                        resetPayload(true);
                                    }}
                                    className="cursor-pointer flex items-center gap-2 text-red-400"
                                >
                                    <MdKeyboardReturn />{" "}
                                    <div className="underline">Go to login</div>
                                </div>
                            )}
                            {isRegister && (
                                <div
                                    className="cursor-pointer underline text-red-400"
                                    onClick={() => {
                                        resetPayload(false);
                                    }}
                                >
                                    Create New Account
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
