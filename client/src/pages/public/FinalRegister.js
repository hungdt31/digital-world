import {useParams} from "react-router-dom";
import path from "../../ultils/path";
import Swal from "sweetalert2";

const FinalRegister = () => {
    const {status} = useParams();
    console.log(status);
    if (status === "success") {
        Swal.fire({
            title: "Congraluation",
            icon: "success",
            text: "Register is successfully. Please go login",
            timer: 2000,
            timerProgressBar: true,
            showCancelButton: false,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then(async () => {
            window.location.href = path.LOGIN;
        });
    } else {
        Swal.fire({
            title: "Failed",
            icon: "warning",
            text: "Đăng ký thất bại",
            timer: 2000,
            timerProgressBar: true,
            showCancelButton: false,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then(async () => {
            window.location.href = path.HOME;
        });
    }
};

export default FinalRegister;
