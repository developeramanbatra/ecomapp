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
const SiteRoutes=()=>
{
    return(
        <Routes>
            <Route path='/' element={<Navigate to="/homepage"/>}/>
            <Route path='/homepage' element={<Homepage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/thanks' element={<Thanks/>}/>
            <Route path='/viewmembers' element={<ViewMembers/>}/>
            <Route path='/searchuser' element={<SearchUser/>}/>
            <Route path='/categories' element={<ShowCategory/>}/>
            <Route path='/subcategories' element={<ShowSubCategory/>}/>
            <Route path='/products' element={<Showproducts/>}/>
            <Route path='/details' element={<ProductDetails/>}/>
            <Route path='/managecategory' element={<ManageCat/>}/>
            <Route path='/cart' element={<ShowCart/>}/>
            <Route path='/managesubcategory' element={<ManageSubCat/>}/>
            <Route path='/manageproduct' element={<ManageProduct/>}/>
            <Route path='/updatesubcategory' element={<UpdateSubCat/>}/>
            <Route path='/updateproduct' element={<UpdateProduct/>}/>
            <Route path='/changepassword' element={<UserRoutesProtector MyComp={ChangePassword}/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/ordersummary' element={<UserRoutesProtector MyComp={OrderSummary}/>}/>
            <Route path='/vieworders' element={<ViewOrders/>}/>
            <Route path='/orderproducts' element={<OrderProducts/>}/>
            <Route path='/updatestatus' element={<UpdateStatus/>}/>
            <Route path='/orderhistory' element={<UserOrders/>}/>
            <Route path='/searchproducts' element={<SearchProducts/>}/>
            <Route path='/adminhome' element={<AdminHomepage/>}/>
            <Route path='/createadmin' element={<CreateAdmin/>}/>
            <Route path='/*' element={<h1>Page Not Found</h1>}/>
        </Routes>
    )
}
export default SiteRoutes;