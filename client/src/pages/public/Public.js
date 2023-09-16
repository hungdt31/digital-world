import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation, Footer } from "../../components";
import TopHeader from "../../components/TopHeader";
import img from "../../assets/logo.png";


const Public = () => {
    const [start, setStart] = useState(false);

    useEffect(() => {
        // Kiểm tra xem đã có trạng thái đã truy cập trước đó hay chưa
        const hasVisited = sessionStorage.getItem("hasVisitedPublic");

        if (!hasVisited) {
            // Nếu chưa truy cập trang Public trước đó, thực hiện hiệu ứng
            setTimeout(() => {
                setStart(true);
                sessionStorage.setItem("hasVisitedPublic", "true");
            }, 2000);
        } else {
            // Nếu đã truy cập trang Public trước đó, hiển thị trang ngay lập tức
            setStart(true);
        }
    }, []);

    return (
        <div>
            {start && (
                <div className="w-full flex flex-col items-center">
                    <TopHeader />
                    <Header />
                    <Navigation />
                    <Outlet />
                    <Footer/>
                </div>
            )}
            {!start && (
                <div className="flex justify-center items-center min-h-screen">
                    <img src={img} className="w-[400px] h-[50px] animate-bounce saturate-150" />
                </div>
            )}
        </div>
    );
};

export default Public;
