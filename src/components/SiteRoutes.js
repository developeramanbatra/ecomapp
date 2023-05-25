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
            <Route path='/changepassword' element={<ChangePassword/>}/>
            <Route path='/*' element={<h1>Page Not Found</h1>}/>
        </Routes>
    )
}
export default SiteRoutes;