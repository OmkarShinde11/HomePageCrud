import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function usehandleTokenExpiry(){
    const navigate=useNavigate();

    function handleTokenExpiry(){
        localStorage.removeItem('token');
        navigate('/home');
        toast.error('Token is expired. Please login again.');
    };

    return handleTokenExpiry;
}