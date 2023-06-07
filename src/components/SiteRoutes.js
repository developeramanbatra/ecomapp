import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Homepage from './Homepage';
import Login from './Login';
import Thanks from './Thanks';
import ViewMembers from './ViewMembers';
import SearchUser from './SearchUser';
import ManageCat from './ManageCat';
import ManageSubCat from './ManageSubCat';
import ManageProduct from './ManageProduct';
import UpdateSubCat from './UpdateSubCat';
import UpdateProduct from './UpdateProduct';
import ChangePassword from './ChangePassword';
import ShowCategory from './ShowCategory';
import ShowSubCategory from './ShowSubCategory';
import Showproducts from './Showproducts';
import ProductDetails from './ProductDetails';
import ShowCart from './ShowCart';
import Checkout from './Checkout';
import OrderSummary from './OrderSummary';
import ViewOrders from './ViewOrders';
import OrderProducts from './OrderProducts';
import UpdateStatus from './UpdateStatus';
import UserOrders from './UserOrders';
import SearchProducts from './SearchProducts';
import AdminHomepage from './AdminHomepage';
import CreateAdmin from './CreateAdmin';
import UserRoutesProtector from './UserRoutesProtector';
import AdminRoutesProtection from './AdminRoutesProtection';
import ContactUs from './ContactUs';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
const SiteRoutes=()=>
{
    return(
        <Routes>
            <Route path='/' element={<Navigate to="/homepage"/>}/>
            <Route path='/homepage' element={<Homepage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/thanks' element={<Thanks/>}/>
            <Route path='/viewmembers' element={<AdminRoutesProtection MyComp={ViewMembers}/>}/>
            <Route path='/searchuser' element={<AdminRoutesProtection MyComp={SearchUser}/>}/>
            <Route path='/categories' element={<ShowCategory/>}/>
            <Route path='/subcategories' element={<ShowSubCategory/>}/>
            <Route path='/products' element={<Showproducts/>}/>
            <Route path='/details' element={<ProductDetails/>}/>
            <Route path='/managecategory' element={<AdminRoutesProtection MyComp={ManageCat}/>}/>
            <Route path='/cart' element={<UserRoutesProtector MyComp={ShowCart}/>}/>
            <Route path='/managesubcategory' element={<AdminRoutesProtection MyComp={ManageSubCat}/>}/>
            <Route path='/manageproduct' element={<AdminRoutesProtection MyComp={ManageProduct}/>}/>
            <Route path='/updatesubcategory' element={<AdminRoutesProtection MyComp={UpdateSubCat}/>}/>
            <Route path='/updateproduct' element={<AdminRoutesProtection MyComp={UpdateProduct}/>}/>
            <Route path='/changepassword' element={<UserRoutesProtector MyComp={ChangePassword}/>}/>
            <Route path='/checkout' element={<UserRoutesProtector MyComp={Checkout}/>}/>
            <Route path='/ordersummary' element={<UserRoutesProtector MyComp={OrderSummary}/>}/>
            <Route path='/vieworders' element={<AdminRoutesProtection MyComp={ViewOrders}/>}/>
            <Route path='/orderproducts' element={<UserRoutesProtector MyComp={OrderProducts}/>}/>
            <Route path='/updatestatus' element={<AdminRoutesProtection MyComp={UpdateStatus}/>}/>
            <Route path='/orderhistory' element={<UserRoutesProtector MyComp={UserOrders}/>}/>
            <Route path='/searchproducts' element={<SearchProducts/>}/>
            <Route path='/adminhome' element={<AdminRoutesProtection MyComp={AdminHomepage}/>}/>
            <Route path='/createadmin' element={<AdminRoutesProtection MyComp={CreateAdmin}/>}/>
            <Route path='/contactus' element={<ContactUs/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/resetpassword' element={<ResetPassword/>}/>
            <Route path='/*' element={<h1>OOPS!...Page Not Found. Please Check Your Link.</h1>}/>
        </Routes>
    )
}
export default SiteRoutes;