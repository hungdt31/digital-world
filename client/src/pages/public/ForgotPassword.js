import React, { useEffect, useState } from "react";
import icons from "../../ultils/icons";
import { apiForgotPassword } from "../../apis/user";
import Swal from "sweetalert2";
const ForgotPassword = ({isForgotPassword, setIsForgotPassword}) => {
    const {MdKeyboardReturn} = icons
    const [email, setEmail] = useState(null)
    const ForgotBtn = async(email) => {
        try {
            const apiPromise = apiForgotPassword(email);
            const swalPromise = new Promise((resolve, reject) => {
                Swal.fire({
                    title: "Please wait",
                    icon: "info",
                    text: "Sending email...",
                    timerProgressBar: true,
                    showCancelButton: false,
                    timer: 2000,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                    onClose: () => {
                        resolve();
                    },
                });
            });
    
            // Chạy cả hai tác vụ cùng một lúc và đợi chúng hoàn thành
            await Promise.all([apiPromise, swalPromise])
            .then((results) => {
                // handle successful results
                Swal.fire({
                    title: "Congratulations",
                    icon: "info",
                    text: "Email sent successfully",
                    timer: 2000,
                    timerProgressBar: true,
                    showCancelButton: false,
                });
            })
            .catch((error) => {
                // handle error
                console.log(error)
            });
            // Sau khi cả hai tác vụ hoàn thành, hiển thị Swal với thông báo thành công
            
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "An error occurred",
            });
        }
    }
    return (
        <div className={`flex justify-center items-center w-full ${isForgotPassword ? 'animate-[slideLeft_0.3s_ease-in-out]' : 'animate-[slideRight_0.3s_ease-in-out]'}`}>
            <div className="flex flex-col gap-5 p-9 w-1/2 lg:w-1/3 bg-white items-center shadow-lg rounded-lg">
                <div class="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
                    <input
                        onChange={e => {
                            setEmail(e.target.value)
                        }}
                        type="email"
                        class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-5 pr-20 text-[16px] font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-main focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                        required
                    />
                    <button
                        class="!absolute right-1 top-1.5 z-10 select-none rounded bg-main py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                        type="button"
                        data-ripple-light="true"
                        onClick={() => {ForgotBtn(email)}}
                    >
                        Send
                    </button>
                    <label class="text-main before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[13px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-main peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-main peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-main peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Enter your email
                    </label>
                </div>
                <button className="flex items-center text-main">
                <MdKeyboardReturn />{" "}
                <p onClick={()=>{setIsForgotPassword(false)}} className="underline">Back</p>
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
