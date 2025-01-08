import { Navigate, useNavigate } from "react-router-dom";
import pb, { isUserValid, signout } from "../lib/pocketbase"
import { useEffect } from "react";
import NotFoundPage from "./NotFoundPage";



export default function Dashboard(){
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/login');
        signout();
    }
    
    if(!pb.authStore.isValid){
        return(
            <Navigate to='/login'/>
        )
    }
    return(
        <div>
            <h1>{pb.authStore.record?.email}</h1>
            <h1>{pb.authStore.record?.name}</h1>
        <h1>Dashboard</h1>
        <button onClick={handleSubmit}>Sign out</button>
    </div>
    )
    
}