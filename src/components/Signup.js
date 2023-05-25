import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
var Signup=()=>
{
	const [name,setname] = useState();
	const [phone,setphone] = useState();
	const [username,setusername] = useState();
	const [password,setpassword] = useState();
	const [cpassword,setcpassword] = useState();
	const [msg,setmsg] = useState();
	const navigate = useNavigate();
	var onsignup=async ()=>
	{
		if(password===cpassword)
		{
			const signupdata = {name,phone,username,password};
			try 
			{
				const resp = await fetch("http://localhost:9000/api/register",
				{
					method:"post",
					body: JSON.stringify(signupdata),
					headers:
					{
					'Content-type': 'application/json; charset=UTF-8',
					}
				})
				if(resp.ok)
				{
					var result = await resp.json(); 
					
					if(result.statuscode===1)
					{
						 	navigate("/thanks");
					}
					// else if(result.statuscode===0) // In which scenario this will excecute.....mongo de error vele maybe this will excecute
					// {
					// 	setmsg("Error while signing up, try again");
					// }
				}
				else
				{
					setmsg("Error Occured")
				}
			}
			catch (err) 
			{
				setmsg(err);
			}
		}
		else
		{
			setmsg("Password and confirm password does not match");
		}
		
	}

	return(
    <>
    <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/homepage"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Register Page</li>
			</ol>
		</div>
	</div>

	<div className="register">
		<div className="container">
			<h2>Register Here</h2>
			<div className="login-form-grids">
				<h5>profile information</h5>
				<form name="form1">
					<input type="text" name="pname" placeholder="Name..." required="" onChange={(e)=>setname(e.target.value)}/>
					<input type="text" name="phone" placeholder="Phone..." required="" onChange={(e)=>setphone(e.target.value)}/>
				<h6>Login information</h6>
					
					<input type="email" name="uname" placeholder="Email Address(Username)" required=" " onChange={(e)=>setusername(e.target.value)}/>
					<input type="password" name="pass" placeholder="Password" required=" " onChange={(e)=>setpassword(e.target.value)}/>
					<input type="password" name="cpass" placeholder="Password Confirmation" required=" " onChange={(e)=>setcpassword(e.target.value)}/>
					<div className="register-check-box">
						<div className="check">
							<label className="checkbox"><input type="checkbox" name="checkbox"/><i> </i>I accept the terms and conditions</label>
						</div>
					</div><br/>
					<div className="register-home a">
						<button name="btn" onClick={onsignup} value="Register">Register</button><br/>					</div>
					{msg}
				</form>
			</div>
			<div className="register-home">
				<Link to="/homepage">Home</Link>
			</div>
		</div>
	</div>
    </>)
}
export default Signup;