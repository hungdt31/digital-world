import React, { useState, useEffect} from "react";
import { useContext } from "react";
import { VariantContext } from "./Context";
export const CheckBox = ({ val, setState, name}) => {
    const context = useContext(VariantContext)
    // console.log(context)
    const[isChecked, setIsChecked] = useState(false)
    const handleCheckboxClick = () => {
        if (isChecked) {
            setState((prev) => prev.filter((el) => el !== val.value));
        } else {
            setState((prev) => [...prev, val.value]);
        }
        setIsChecked(prev =>!prev)
        context.page.setState(1)
    };
    useEffect(() => {
        setIsChecked(context[name].state?.includes(val.value))
    }, [name, context, val.value]);
    

    return (
        <div className="px-3 py-5 flex gap-2 items-center">
            <label
                className="relative flex cursor-pointer items-center rounded-full"
                htmlFor="login"
                data-ripple-dark="true"
            >
                <input
                    checked={isChecked}
                    onChange={() => {handleCheckboxClick()}}
                    id="login"
                    type="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-main checked:bg-main checked:before:bg-main hover:before:opacity-10"
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </div>
            </label>
            <label
                className="mt-px cursor-pointer select-none font-medium text-gray-700"
                htmlFor="login"
            >
                {val.value.charAt(0).toUpperCase() +
                    val.value.slice(1).toLowerCase() || "NULL"}
                {" ("}
                {val.count}
                {")"}
            </label>
        </div>
    );
};
