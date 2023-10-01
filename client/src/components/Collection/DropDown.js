import React, { useState, useEffect, useRef } from "react";
import { CheckBox } from "./checkBox";
import icons from "../../ultils/icons";
import { useContext } from "react";
import { VariantContext } from "../../components/Collection/Context";
const DropDown = ({ obj }) => {
    const context = useContext(VariantContext);
    const [display, setDisplay] = useState(false);
    const { FiChevronDown, FiChevronUp } = icons;
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
                {
                    context[obj.name].state.length > 0 && <p className="rounded-full bg-main text-white text-[12px] w-[18px] h-[18px] opacity-40 text-center">{context[obj.name].state.length}</p>
                }
                {!display && <FiChevronDown />}
                {display && <FiChevronUp />}
            </button>
            {display && (
                <div className="absolute top-[120%] border-[1px] left-0 w-[200%] bg-white z-50 overflow-y-auto max-h-[400px] border-gray-700">
                    <div className="px-3 py-7 border-b-[1px] flex items-center justify-between text-[14px] border-gray-500">
                        <p>{context[obj.name].state.length} selected</p>
                        <button 
                        onClick={()=>{
                            context[obj.name].setState([])
                        }}
                        className="underline cursor-pointer font-medium active:text-main">Reset</button>
                    </div>
                    {obj?.array?.map((el) => {
                        return <CheckBox val={el} setState={obj.setState} name={obj.name}/>;
                    })}
                </div>
            )}
        </div>
    );
};

export default DropDown;
