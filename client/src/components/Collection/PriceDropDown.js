import React, { useState, useEffect, useRef, useContext } from "react";
import { CheckBox } from "./checkBox";
import icons from "../../ultils/icons";
import { convertVNDtoVNDString } from "../../ultils/convertMoney";
import { VariantContext } from "../../components/Collection/Context";
const PriceDropDown = ({ obj }) => {
    const context = useContext(VariantContext)
    const [display, setDisplay] = useState(false);
    const { FiChevronDown, FiChevronUp } = icons;
    const {price} = context
    const input1 = useRef(null)
    const input2 = useRef(null)
    const dropdownRef = useRef(null);
    useEffect(() => {
        // Hàm xử lý sự kiện click toàn cục để đóng dropdown khi click bất kỳ nơi nào khác
        function handleGlobalClick(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDisplay(false);
            }
        }

        // Đăng ký sự kiện click toàn cục khi dropdown được mở
        if (display) {
            window.addEventListener("click", handleGlobalClick);
        }

        // Hủy đăng ký sự kiện khi component unmount hoặc dropdown bị đóng
        return () => {
            window.removeEventListener("click", handleGlobalClick);
        };
    }, [display]);
    return (
        <div className="relative mt-2" ref={dropdownRef}>
            <button
                onClick={() => setDisplay((prev) => !prev)}
                className={`border-[1px]  relative flex justify-between items-center px-5 py-3 gap-3 ${display ? "border-gray-900 outline outline-1":"border-gray-400"}`}
            >
                <div className="text-[13px]">{obj?.name.charAt(0).toUpperCase() + obj?.name.slice(1)}</div>
                {!display && <FiChevronDown />}
                {display && <FiChevronUp />}
            </button>
            {display && (
                <div className="absolute top-[120%] border-[1px] left-0 w-[350%] bg-white z-50 overflow-y-auto max-h-[600px] border-gray-700 rounded-lg shadow-md">
                    <div className="px-3 py-7 border-b-[1px] flex items-center justify-between text-[14px] overflow-hidden border-gray-500">
                        <div>
                            <p>Default input value is VND</p>
                            <p>The highest price is {convertVNDtoVNDString(obj?.price)}</p>
                        </div>
                        <div>
                        <button className="underline cursor-pointer font-medium active:text-main" onClick={()=>{
                            input1.current.value = null
                            input2.current.value = null
                        }}>Reset</button>
                        <button className="underline cursor-pointer font-medium active:text-main"
                        onClick={() => {
                            const num1 = input1.current.value
                            const num2 = input2.current.value
                            price.setState({
                            gte:num1,
                            lte:num2
                        })}}
                        >Submit</button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="px-2 flex gap-2 items-center py-3">
                        <label className="text-main" for="input1">From</label>
                        <input className="border-[1px] rounded-full px-2 text-[13px] py-1" id="input1" ref={input1}/>
                        </div>
                        <div className="flex justify-end px-2 pt-0 gap-2 items-center py-3">
                        <label className="text-main" for="input2">To</label>
                        <input className="border-[1px] rounded-full px-2 text-[13px] py-1" id="input2" ref={input2}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriceDropDown;
