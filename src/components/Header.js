import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { useContext, useState } from "react";

var Header = () => {
	const[term,setterm] = useState();
	const {user, setUser} = useContext(UserContext);
	const navigate = useNavigate();
	var onlogout=()=>
	{
		setUser(null);
		sessionStorage.clear();
		navigate("/login");
	}
	
	var onsearch=()=>
	{
		navigate({
            pathname: '/searchproducts',
            search: `?query=${term}`,
          });
	}

    return (
        <>
        <div className="agileits_header">
		<div className="container">
			<div className="w3l_offers">
			{
				user?
				<p>
					<span>Welcome {user.name}</span>
				</p>:
				<p>
					<span>Welcome Guest</span>
				</p>
			}
			</div>
			<div className="agile-login">
				<ul>
				{
					user?
					<>
						<li><Link to="/changepassword"> <h5>Change Password</h5> </Link></li>
						<li><Link to="/orderhistory"> My orders </Link></li>
						<li><button className="btn btn-danger" onClick={onlogout}> <h5>Logout </h5></button></li>
					</>:
					<>
						<li><Link to="/signup"><h5>✍️Create Account </h5> </Link></li>
						<li><Link to="/login"><h5>🙋Login</h5></Link></li>
					</>
				}
				</ul>
			</div>
			<div className="product_list_header">  
						{
						user?
						<Link to="/cart"><button className="w3view-cart" type="submit" name="submit" value=""><i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
						</button>
						</Link>:null
						} 
			</div>
			<div className="clearfix"> </div>
		</div>
	</div>

	<div className="logo_products">
		<div className="container">
		<div className="w3ls_logo_products_left1">
				<ul className="phone_email">
				<li><i className="fa fa-phone" aria-hidden="true"></i>Order Online or call us : (+91) 70800-75800</li>
					
				</ul>
			</div>
			<div className="w3ls_logo_products_left">
				<h1><Link to="/">Shopping Plaza</Link></h1>
			</div>
		<div className="w3l_search">
			<input onChange={(e)=>setterm(e.target.value)} type="search" name="Search" placeholder="Search for a Product..." required="" />
			<button type="submit" onClick={onsearch} className="btn btn-default search" aria-label="Left Align">
			<i className="fa fa-search" aria-hidden="true"> </i>
			</button>
				<div className="clearfix"></div>
		</div>
			
			<div className="clearfix"> </div>
		</div>
	</div>

	<div className="navigation-agileits">
		<div className="container">
			<nav className="navbar navbar-default">
				<div className="navbar-header nav_2">
					<button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
				</div> 
				<div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
					<ul className="nav navbar-nav">
						<li><Link to="/">🏠Home</Link></li>	
						<li><Link to="/products">🎧Products</Link></li>	
						<li><Link to="/contactus">Contact</Link></li>     
					</ul>
				</div>
			</nav>
		</div>
	</div>
    </>
    )
}
export default Header;