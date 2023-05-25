import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SiteRoutes from "./components/SiteRoutes";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import UserContext from "./UserContext";
function App() {
  const [user,setUser] = useState(null);
  useEffect(()=>
  {
    if(sessionStorage.getItem("userinfo")!==null)
    {
      setUser(JSON.parse(sessionStorage.getItem("userinfo")));
    }
  },[])
  return (
    <>
      <ToastContainer theme="colored" />
      <UserContext.Provider value={{ user, setUser}}>
        <Header/>
        <SiteRoutes/>
        <Footer/>
      </UserContext.Provider>
    </>
  );
}

export default App;