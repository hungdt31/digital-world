import React, { useState, useEffect, useRef, useContext } from "react";
import icons from "../../ultils/icons";
import { convertVNDtoVNDString } from "../../ultils/convertMoney";
import { VariantContext } from "../../components/Collection/Context";
import CurrencyInput from "react-currency-input-field";
const PriceDropDown = ({ obj }) => {
    const context = useContext(VariantContext);
    const [display, setDisplay] = useState(false);
    const { FiChevronDown, FiChevronUp } = icons;
    const { price, page } = context;
    const [input1, setInput1] = useState(null);
    const [input2, setInput2] = useState(null);
    const [dinput1, setDInput1] = useState(null);
    const [dinput2, setDInput2] = useState(null);
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
    useEffect(()=>{
        setDInput1(price?.state?.gte)
        setDInput2(price?.state?.lte)
        setInput1(price?.state?.gte)
        setInput2(price?.state?.lte)
    },[price])
    return (
        <div className="relative mt-2" ref={dropdownRef}>
            <button
                onClick={() => setDisplay((prev) => !prev)}
                className={`border-[1px]  relative flex justify-between items-center px-5 py-3 gap-3 ${
                    display
                        ? "border-gray-900 outline outline-1"
                        : "border-gray-400"
                }`}
            >
                <div className="text-[13px]">
                    {obj?.name.charAt(0).toUpperCase() + obj?.name.slice(1)}
                </div>
                {!display && <FiChevronDown />}
                {display && <FiChevronUp />}
            </button>
            {display && (
                <div className="absolute top-[120%] border-[1px] left-0 w-[350%] bg-white z-50 overflow-y-auto max-h-[600px] border-gray-700 rounded-lg shadow-md">
                    <div className="px-3 py-7 border-b-[1px] flex items-center justify-between text-[14px] overflow-hidden border-gray-500">
                        <div>
                            <p>
                                Default input value is <b>VND</b>
                            </p>
                            <p>
                                The highest price is{" "}
                                {convertVNDtoVNDString(obj?.price)}
                            </p>
                        </div>
                        <div>
                            <button
                                className="underline cursor-pointer font-medium active:text-main"
                                onClick={() => {
                                    price.setState({
                                        gte: input1,
                                        lte: input2,
                                    });
                                    page.setState(1)
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="px-2 flex gap-2 items-center py-3">
                            <label
                                className="text-main font-semibold"
                                for="input1"
                            >
                                From
                            </label>
                            <CurrencyInput
                                className="border-[1px] rounded-full px-2 text-[13px] py-1  border-main"
                                id="input-example"
                                name="input-name"
                                decimalSeparator=","
                                groupSeparator="."
                                placeholder="Please enter a number"
                                defaultValue={dinput1}
                                decimalsLimit={2}
                                suffix="₫"
                                onValueChange={(value, name) =>
                                    setInput1(value)
                                }
                            />
                        </div>
                        <div className="flex justify-end px-2 pt-0 gap-2 items-center py-3">
                            <label
                                className="text-main font-semibold"
                                for="input2"
                            >
                                To
                            </label>
                            <CurrencyInput
                                className="border-[1px] rounded-full px-2 text-[13px] py-1  border-main"
                                id="input-example"
                                name="input-name"
                                decimalSeparator=","
                                groupSeparator="."
                                placeholder="Please enter a number"
                                defaultValue={dinput2}
                                decimalsLimit={2}
                                suffix="₫"
                                onValueChange={(value, name) =>
                                    setInput2(value)
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriceDropDown;
