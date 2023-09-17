import axios from "../axios";
import Swal from "sweetalert2";
export const signUp = async(data) => {
    try {
        return await axios({
            url: '/user/register',
            method: 'post',
            data
        })
    
        // Work with the response...
    } catch (err) {
        // Handle error
        // console.log(err.message)
        return Promise.reject(err);
    }
}
export const login = async(data) => {
    try {
        return await axios({
            url: '/user/login',
            method: 'post',
            data
        })
    
        // Work with the response...
    } catch (err) {
        // Handle error
        console.log(err.message)
        if(err.message) {
            Swal.fire({title:err.message})
            return
        }
        // return Promise.reject(err);
    }
}
