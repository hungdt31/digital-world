import React, { useCallback, useEffect } from "react";
import { useState } from "react";
const InputField = ({ type, accountValue, value }) => {
    const handleChange = (event) => {
        accountValue((prevState) => ({
            ...prevState,
            [type]: event.target.value,
        }));
        // console.log("value is:", event.target.value);
    };
    return (
        <div className="w-full relative">
            {value && (
                <p className="absolute top-[-13px] bg-white p-[3px] animate-[scaleUpVerCenter_0.4s_ease-in-out] text-main font-semibold left-1 text-[13px]">
                    {type.slice(0, 1).toUpperCase()}
                    {type.slice(1)}
                </p>
            )}
            <input
                value={value}
                type={type || "text"}
                className="border-2 p-2 w-full placeholder:italic"
                id="input"
                placeholder={type}
                onChange={handleChange}
            />
        </div>
    );
};

export default InputField;
