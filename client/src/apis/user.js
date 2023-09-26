import axios from "../axios";

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
        // console.log(err.message)
        // if(err.message) {
        //     Swal.fire({title:err.message})
        //     return
        // }
        return Promise.reject(err);
    }
}
export const apiGetCurrentUser = async(auth) => {
    try {
        return await axios({
            url: '/user/current',
            method: 'get',
            headers:{
                'Authorization':`Bearer ${auth}`
            }
        })
    
        // Work with the response...
    } catch (err) {
        // Handle error
        // console.log(err.message)
        return Promise.reject(err);
        // const navigate = useNavigate()
        // navigate(`${path.LOGIN}`)
    }
}
export const apiForgotPassword = async(email) => {
    try {
        return await axios({
            url: 'user/forgotpassword',
            method: 'get',
            params:{
                email
            }
        })
    
        // Work with the response...
    } catch (err) {
        // Handle error
        // console.log(err.message)
        return Promise.reject(err);
        // const navigate = useNavigate()
        // navigate(`${path.LOGIN}`)
    }
}
export const apiResetPassword = async(data) => {
    try {
        return await axios({
            url: 'user/resetpassword',
            method: 'put',
            data
        })
    
        // Work with the response...
    } catch (err) {
        return Promise.reject(err);
    }
}