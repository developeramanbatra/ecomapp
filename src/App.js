import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SiteRoutes from "./components/SiteRoutes";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import AdminHeader from "./components/AdminHeader";
function App() {
  const [user,setUser] = useState(null);
  const [utype, setutype] = useState("guest");
  useEffect(()=>
  {
    if(sessionStorage.getItem("userinfo")!==null)
    {
      setUser(JSON.parse(sessionStorage.getItem("userinfo")));
    }
  },[])

  useEffect(()=>
  {
    if(user)
    {
      if(user.usertype==="admin")
      {
        setutype("admin");
      }
      else if(user.usertype==="normal")
      {
        setutype("normal");
      }
    }
    else
    {
      setutype("guest");
    }
  },[user])

  return (
    <>
      <ToastContainer theme="colored" />
      <UserContext.Provider value={{ user, setUser}}>
        {
          utype==="admin"?
          <AdminHeader/>:
          <Header />
        }
        <SiteRoutes/>
        <Footer/>
      </UserContext.Provider>
    </>
  );
}

export default App;
