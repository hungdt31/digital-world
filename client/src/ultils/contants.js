import path from "./path"
import icons from "./icons"
const {ImTruck, FaShieldAlt, BsFillGiftFill, GiReturnArrow, BsPhoneVibrateFill} = icons
export const navagation = [
    {
        id:1,
        value:'HOME',
        path:`${path.HOME}`
    },
    {
        id:2,
        value:'PRODUCTS',
        path:`${path.PRODUCTS}`
    },
    {
        id:3,
        value:'BLOGS',
        path:`${path.BLOGS}`
    },
    {
        id:4,
        value:'OUR SERVICES',
        path:`${path.OUR_SERVICE}`
    },
    {
        id:5,
        value:'FAQ',
        path:`${path.FAQ}`
    },
]
export const obj = [
    {
        title:"Guarantee",
        des:"Quality checked",
        icon:<FaShieldAlt/>
    },
    {
        title:"Free Shipping",
        des:"Free on all products",
        icon:<ImTruck/>
    },
    {
        title:"Special gift cards",
        des:"Special gift cards",
        icon:<BsFillGiftFill/>
    },
    {
        title:"Free return",
        des:"Within 7 days",
        icon:<GiReturnArrow/>
    },
    {
        title:"Consultancy",
        des:"Lifetime 24/7/356",
        icon:<BsPhoneVibrateFill/>
    }
]