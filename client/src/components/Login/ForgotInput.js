import React, { useState } from "react";
import { forgotPasswordIcons } from "../../ultils/icons";
import { passwordStrength } from "check-password-strength";

const ForgotInput = ({ label, setInput }) => {
    const { BsFillEyeFill, AiTwotoneEyeInvisible } = forgotPasswordIcons;
    const [type, setType] = useState("text");
    const [checkStrong, setCheckStrong] = useState(null);
    const [value, setValue] = useState(false);
    const getPasswordStrengthColor = () => {
        switch (checkStrong) {
            case "Too weak":
                return "text-red-500";
            case "Weak":
                return "text-yellow-500";
            case "Strong":
                return "text-green-500";
            default:
                return "";
        }
    };
    // console.log(1);
    return (
        <div>
            <p className="font-semibold mb-1">{label}</p>
            <div>
                <div className="relative">
                    <input
                        onChange={(e) => {
                            setCheckStrong(
                                passwordStrength(e.target.value).value
                            );
                            if (e.target.value) setValue(true);
                            else setValue(false);
                            setInput(e.target.value)
                        }}
                        className="bg-slate-100 rounded-sm p-2 w-full"
                        type={type}
                    />
                    <div className="absolute top-0 right-0 h-full flex items-center justify-center px-3">
                        {type === "text" ? (
                            <BsFillEyeFill
                                onClick={() => {
                                    setType("password");
                                }}
                            />
                        ) : (
                            <AiTwotoneEyeInvisible
                                onClick={() => {
                                    setType("text");
                                }}
                            />
                        )}
                    </div>
                </div>
                {value && (
                    <p className={`${getPasswordStrengthColor()} text-[15px]`}>
                        {checkStrong}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ForgotInput;
