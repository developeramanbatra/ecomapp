import { Link } from "react-router-dom";

var Footer = () => {
    return (
        <>
        <div className="footer">
            <div className="container">
                <div className="w3_footer_grids">
                    <div className="col-md-3 w3_footer_grid">
                        <h3>Contact</h3>

                        <ul className="address">
                            <li><i className="glyphicon glyphicon-map-marker" aria-hidden="true"></i>Jalandhar,  <span>INDIA</span></li>
                            <li><i className="glyphicon glyphicon-envelope" aria-hidden="true"></i><a href="mailto:info@example.com">developer@gmail.com</a></li>
                            <li><i className="glyphicon glyphicon-earphone" aria-hidden="true"></i>+91 70800-75800</li>
                        </ul>
                    </div>
                    <div className="col-md-3 w3_footer_grid">
                        <h3>Category</h3>
                        <ul className="info">
                            <li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/subcategories?catid=647043548e54f7076d8003f3">Electronics</Link></li>     
                            <li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/subcategories?catid=6470439c8e54f7076d8003fa">Fashion</Link></li>     
                            <li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/subcategories?catid=647043e58e54f7076d8003fd">Appliances</Link></li>     
                            <li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/subcategories?catid=647044338e54f7076d800400">Mobiles</Link></li>     
                           </ul>
                    </div>
                    <div className="col-md-3 w3_footer_grid">
                        <h3>Grocery</h3>
                        <ul className="info">
                            <li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/products?subcatid=64808ad679e18555334c47fd">Household</Link></li>     
                            <li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/products?subcatid=64808b1479e18555334c4808">Snacks & Beverages</Link></li>     
                            <li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/products?subcatid=64808ba579e18555334c4813">Oils & Flour</Link></li>
                            <li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/subcategories?catid=6470447f8e54f7076d800406">More</Link></li>     
     
                           </ul>
                    </div>
                    <div className="col-md-3 w3_footer_grid">
                        <h3>Profile</h3>
                        <ul className="info">
                            <li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/contactus">Contact Us</Link></li>
                            <li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/cart">My Cart</Link></li>
                            <li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/login">Login</Link></li>
                            <li><i className="fa fa-arrow-right" aria-hidden="true"></i><Link to="/signup">Create Account</Link></li>
                        </ul>
                    </div>
                    <div className="clearfix"> </div>
                </div>
            </div>

            <div className="footer-copy">

                <div className="container">
                    <p>© 2023. All rights reserved | Design by <a>Aman Batra</a></p>
                </div>
            </div>

        </div>
        </>
    )
}
export default Footer;



// | Design by <a>Aman Batra</a>