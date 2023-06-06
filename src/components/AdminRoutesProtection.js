import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

var AdminRoutesProtection=(props)=>
{
    const {user} = useContext(UserContext);
    const mynavigate = useNavigate();
    useEffect(()=>
    {
        if(!user)
        {
            mynavigate("/login");
        }
        else
        {
            if(user.usertype!="admin")
            {
                mynavigate("/login");
            }
        }
    },[user])

    return(
        <>
            <props.MyComp/>
        </>
    )
}
export default AdminRoutesProtection;