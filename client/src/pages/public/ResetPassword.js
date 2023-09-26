import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiResetPassword } from "../../apis/user";
import ForgotInput from "../../components/ForgotInput";
import { useState } from "react";
import Swal from "sweetalert2";
import path from "../../ultils/path";
const ResetPassword = () => {
    const naviagate = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState(""); // State để lưu giá trị mật khẩu
    const [confirmPassword, setConfirmPassword] = useState(""); // State để lưu giá trị xác nhận mật khẩu
    const changePassword = async () => {
        if (password != confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter the password and confirmation password equally!",
                footer: '<a href="">Why do I have this issue?</a>',
            });
        } else {
            const rs = await apiResetPassword({ password, token });
            Swal.fire({
                icon: rs.data.success ? "success" : "info",
                title: "Change Password",
                text: rs.data.mess,
                timer: 2000,
                timerProgressBar: true,
                showCancelButton: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            }).then(() => {
                if (rs.data.success) naviagate(`${path.LOGIN}`);
            });
        }
    };
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="w-1/3 p-5 flex flex-col rounded-lg shadow-md">
                <p className="text-center text-[20px] font-bold">
                    Change your password
                </p>
                <p className="mb-5 mt-3 text-center">
                    Enter a new password below to change your password
                </p>
                <div className="flex flex-col gap-4">
                    <ForgotInput
                        label={"New password"}
                        setInput={setPassword}
                    />
                    <ForgotInput
                        label={"Confirm password"}
                        setInput={setConfirmPassword}
                    />
                </div>
                <button
                    className="bg-main px-3 py-2 text-center w-[40%] mx-auto my-auto rounded-lg text-white mt-5 active:opacity-60"
                    onClick={() => {
                        changePassword();
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
