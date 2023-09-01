import axios from "../axios";
import ErrorPage from "../pages/public/ErrorPage";
export const apiGetCategories = async() => {
    try {
        return await axios({
            url: '/productcategory',
            method: 'get'
        })
    
        // Work with the response...
    } catch (err) {
        // Handle error
        // console.log(err.message)
        return Promise.reject(err);
    }
}

export const apiGetProducts = async(params) => {
    try {
        return await axios({
            url: '/product',
            method: 'get',
            params
        })
        // Work with the response...
    } catch (err) {
        // Handle error
        // console.log(err.message)
        return Promise.reject(err);
    }
    
}
