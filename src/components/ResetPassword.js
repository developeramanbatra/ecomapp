import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
var ResetPassword=()=>
{
    const [myparams] = useSearchParams();
	const token = myparams.get("token");
    const [uname,setuname] = useState();
    const [flag,setflag] = useState();
    const [newpass,setnewpass] = useState();
    const [cnewpass,setcnewpass] = useState();
    function fetchdata() {
		fetch(`http://localhost:9000/api/checktoken?token=${token}`)
			.then(resp => resp.json())
			.then(result => {
				if(result.statuscode===1)
				{
					setuname(result.username);
					setflag(true);
				}
				else
				{
					toast.error(result.msg)
					setflag(false);
				}
			}).catch((err) => {
				console.log(err);
				toast.error("Error Occured");
			})
	}
    useEffect(()=>
    {
        fetchdata();
    },[])


	var onsubmit=async()=>
	{
        if(newpass===cnewpass)
        {
            var resetdata = {username:uname,pass:newpass}
           //api call for resetting password
        }
        else
        {
            toast.error("Password & Confirm Password doesn't match")
        }
	}
	return(
    <>
	    <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/homepage"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Reset Password</li>
			</ol>
		</div>
	    </div>

	<div className="login">
		<div className="container">
            {
            flag?
            <>
			<h2>Reset Password</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1">
					
					<input type="password" placeholder="New Password" name="newpass" onChange={(e)=>setnewpass(e.target.value)} required=" "/><br/>

					<input type="password" placeholder="Confirm New Password" name="newpass" onChange={(e)=>setcnewpass(e.target.value)} required=" "/><br/>
					
					<input type="button" className="btn btn-primary" onClick={onsubmit} value="Reset Password"/><br/><br/>
				</form>
			</div>
			</>:<h2>Reset Link Expired. Link is valid for 15 mins only. Request new link</h2>
            }
		</div>
	</div>
    </>)
}
export default ResetPassword;