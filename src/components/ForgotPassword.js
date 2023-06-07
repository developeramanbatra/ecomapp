import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
var ForgotPassword=()=>
{
	const [email,setemail] = useState();
	var onsubmit=async()=>
	{
		try 
		{
			const resp = await fetch(`http://localhost:9000/api/forgotpassword?username=${email}`)
			if(resp.ok)
			{
				var result = await resp.json();
				toast.info(result.msg)
			}
			else
			{
				toast.error("Error Occured...")
			}
		}
		catch (err) 
		{
			toast.error(err);
		}
	}
	return(
    <>
	    <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/homepage"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Forgot Password</li>
			</ol>
		</div>
	    </div>

	<div className="login">
		<div className="container">
			<h2>Forgot Password</h2>
		
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1">
					
					<input type="email" placeholder="Email Address(Username)" name="email" onChange={(e)=>setemail(e.target.value)} required=" "/><br/>
					
					<input type="button" className="btn btn-primary" onClick={onsubmit} value="Submit"/><br/><br/>
				</form>
			</div>
			
		</div>
	</div>
    </>)
}
export default ForgotPassword;