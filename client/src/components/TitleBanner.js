import React from 'react'
import { Link } from 'react-router-dom'
import path from '../ultils/path'
const TitleBanner = ({titleProduct,cateProduct, category, page}) => {
    var slug;
    if(cateProduct) slug = cateProduct.toLowerCase();
    return (
        <div className="bg-slate-50 w-full h-[80px] flex justify-center items-center">
        {titleProduct && <div className="w-3/4 flex flex-col gap-[8px]">
            <div className="font-semibold text-[18px]">
                {titleProduct}
            </div>
            <div className="text-[15px] font-normal">
                <Link to="/" className="active:text-main">{"Home"}</Link>{" > "}
                <Link to={`${path.COLLECTIONS}/${slug}`} className="active:text-main">{cateProduct}</Link>
                {" > "}
                <span className="normal-case font-light">
                    {titleProduct}
                </span>
            </div>
        </div>}
        {category && <div className="w-3/4 flex flex-col gap-[8px]">
            <div className="text-[15px] font-normal">
                <div className="font-semibold text-[18px]">
                    {category.toUpperCase()}
                </div>
                <Link to="/" className="active:text-main">{"Home"}</Link>{" > "}
                <span className="normal-case font-light">
                    {category}
                </span>
            </div>
        </div>}
        {page && <div className="w-3/4 flex flex-col gap-[8px]">
            <div className="text-[15px] font-normal">
                <Link to="/" className="active:text-main">{"Home"}</Link>{" > "}
                <span className="normal-case font-light">
                    {page}
                </span>
            </div>
        </div>}
        </div>
    )
}

export default TitleBanner