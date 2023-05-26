import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { toast } from "react-toastify";
var Checkout = () => {
	const [pmode, setpmode] = useState();
	const [address, setaddress] = useState();
	const [hname, sethname] = useState();
	const [cardno, setcardno] = useState();
	const [expiry, setexpiry] = useState();
	const [cvv, setcvv] = useState();
	const [flag, setflag] = useState(false);
	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	const [cartdata, setcartdata] = useState();
	useEffect(() => {
		if (pmode === "Credit/Debit Card") {
			setflag(true);
		}
		else {
			setflag(false);
		}
	}, [pmode])
	var fetchcart = async () => {
		try {
			const resp = await fetch(`http://localhost:9000/api/fetchcart/${user.username}`)
			if (resp.ok) {
				var result = await resp.json();
				if (result.statuscode === 1) {
					setcartdata(result.cartdata);
				}
			}
			else {
				toast.error("Error Occured")
			}
		}
		catch (err) {
			toast.error(err);
		}
	}
	var oncheckout = async () => {
		fetchcart();
	}
	useEffect(() => {
		if (cartdata) 
		{
			saveorder();
		}
	}, [cartdata])

	var saveorder = async () => {
		var carddetails = [hname, cardno, expiry, cvv];

		var orderdata = { address, orderamt: sessionStorage.getItem("billamt"), pmode, uname: user.username, carddetails, status: "Payment Received, processing", cartdata }

		try {
			const resp = await fetch("http://localhost:9000/api/saveorder",
				{
					method: "post",
					body: JSON.stringify(orderdata),
					headers:
					{
						'Content-type': 'application/json; charset=UTF-8',
					}
				})
			if (resp.ok) {
				var result = await resp.json();
				if (result.statuscode === 1) {
					navigate("/ordersummary");
				}
				else if (result.statuscode === 0) {
					toast.error("Incorrect Username/Password");
				}
			}
			else {
				toast.error("Error Occured")
			}
		}
		catch (err) {
			toast.error(err);
		}
	}

	return (
		<>
			<div className="breadcrumbs">
				<div className="container">
					<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
						<li><Link to="/homepage"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
						<li className="active">Checkout</li>
					</ol>
				</div>
			</div>

			<div className="login">
				<div className="container">
					<h2>Checkout</h2>

					<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">

						<textarea className="form-control" name="saddr" placeholder="Shipping Address" onChange={(e) => setaddress(e.target.value)}></textarea>
						<br />

						<select name="pmode" className="form-control" onChange={(e) => setpmode(e.target.value)}>
							<option value="">Choose Payment Mode</option>
							<option>Cash on Delivery</option>
							<option>Credit/Debit Card</option>
						</select><br />
						{
							flag ?
								<>
									<input type="text" name="holdername" onChange={(e) => sethname(e.target.value)} placeholder="Holder Name" className="form-control" /><br />
									<input type="text" name="cardno" onChange={(e) => setcardno(e.target.value)} placeholder="Card No" className="form-control" /><br />
									<input type="text" name="expiry" onChange={(e) => setexpiry(e.target.value)} placeholder="Expiry Date" className="form-control" />
									<input type="password" name="cvv" onChange={(e) => setcvv(e.target.value)} placeholder="CVV" className="form-control" /><br />
								</> : null
						}
						<input type="button" className="btn btn-primary" onClick={oncheckout} value="Checkout" /><br /><br />
					</div>

				</div>
			</div>
		</>)
}
export default Checkout;