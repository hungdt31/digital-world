import React, { useState, useEffect, useRef } from "react";
import icons from "../../ultils/icons";
import { useContext } from "react";
import { VariantContext } from "../../components/Collection/Context";
import SortElement from "../../ultils/SortElement";
const Sort= () => {
    const context = useContext(VariantContext);
    const {sort} = context
    const [display, setDisplay] = useState(false);
    const { FiChevronDown, FiChevronUp } = icons;
    const dropdownRef = useRef(null);
    const [value, setValue] = useState(null)
    const [name, setName] = useState("Featured")
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
    useEffect(()=>{
        sort.setState(value)
    },[value])
    return (
        <div className="relative mt-2" ref={dropdownRef}>
            <button
                onClick={() => setDisplay((prev) => !prev)}
                className={`border-[1px] relative flex justify-between items-center px-5 py-3 gap-3 ${display ? "border-gray-900 outline outline-1":"border-gray-400"}`}
            >
                <div className="text-[13px]">{name}</div>
                {!display && <FiChevronDown />}
                {display && <FiChevronUp />}
            </button>
            {display && (
                <div className="absolute top-[120%] border-[1px] right-0 w-[200px] bg-white z-50 overflow-y-auto max-h-[400px] border-gray-700">
                    <div className="text-[14px] border-gray-500">
                        {SortElement.map((el)=>{
                            return(
                                <div onClick={()=>{
                                    setValue(el.sort)
                                    setName(el.name)
                                }
                                } className={`cursor-pointer p-2 text-center border-b-[1px] ${name == el.name ? " bg-slate-100 border-l-[3px] border-l-main": ""}`} >{el.name}</div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Sort
