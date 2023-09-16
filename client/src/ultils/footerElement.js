import { mxhIcons } from "./icons"
import icons from "./icons"
const {MdLocationOn, BsPhoneVibrateFill, MdEmail} = icons
const footerElement = [
    {
        title:"About us",
        des:[
            {
                icon:<MdLocationOn/>,
                first:" Address: ",
                second:"474 Ontario St Toronto, ON M4X 1M7 Canada"
            },
            {
                icon:<BsPhoneVibrateFill/>,
                first:"Phone: ",
                second:"(+1234)56789xxx"
            },
            {
                icon:<MdEmail/>,
                first:"Mail: ",
                second:"tadathemes@gmail.com"
            },
        ],
        icons:mxhIcons
    },
    {
        title:"Information",
        des:[
            {
                second:"Typography",
            },
            {
                second:"Gallery",
            },
            {
                second:"Store Location",
            },
            {
                second:"Today's Deals",
            },
            {
                second:"Contact",
            }
        ]
    },
    {
        title:"Who you are",
        des:[
            {
                second:"Help",
            },
            {
                second:"Free Shipping",
            },
            {
                second:"FAQs",
            },
            {
                second:"Return & Exchange",
            },
            {
                second:"Testimonials"
            }
        ]
    },
    {
        title:"#DigitalWorldS"
    }
]
export default footerElement