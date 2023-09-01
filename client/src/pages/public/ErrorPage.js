import { useLocation, Link } from "react-router-dom";
import img from '../../assets//main_how_to_design_404_page.webp'
export default function ErrorPage() {
    const location = useLocation()
    return (
        <div className="flex justify-center items-center min-h-screen">
            <img src={img || "https://cdn.windowsreport.com/wp-content/uploads/2020/05/Error-5-2.jpg"} className="w-full h-full relative"/>
            <div className="flex flex-col justify-center items-center absolute top-2">
                <div className="text-red-600 text-[20px] ">{location.state.error}</div>
                <div className="font-semibold text-[30px] p-4 ">Something went wrong...</div>
                <Link className="bg-red-500 p-3 text-[20px] rounded-lg hover:bg-red-400" to='/'>Reload</Link>
            </div>
        </div>
    );
}