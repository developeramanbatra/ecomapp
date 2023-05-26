import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
var ManageCat=()=>
{
	const [catname,setcatname] = useState();
	const [catid,setcatid] = useState();
	const [pic,setpic] = useState(null);
	const [msg,setmsg] = useState();
	const [catpic,setcatpic] = useState();
	const [editmode,seteditmode] = useState(false);
	const [catlist,setcatlist] = useState([]);
    function onpicselect(event) 
    {
        setpic(event.target.files[0])
    }
    useEffect(()=>
    {
        fetchcategories();
    },[])

    var fetchcategories=async ()=>
    {
        try 
        {
            const resp = await fetch("http://localhost:9000/api/fetchallcategories")
            if(resp.ok)
            {
                var result = await resp.json(); 
                if(result.statuscode===0)
                {
                    toast.error("No categories found");
                }
                else if(result.statuscode===1)
                {
                    setcatlist(result.catdata);
                }
                
            }
            else
            {
                toast.error("Error Occured")
            }
        }
        catch (err) 
        {
            toast.error(err);
        }
    }
    var onupdate=(catinfo)=>
    {
        setcatid(catinfo._id);
        setcatname(catinfo.catname);
        setcatpic(catinfo.catpic);
        seteditmode(true);
    }
    var oncancel=()=>
    {
        setcatname("");
        setcatpic("");
        seteditmode(false);
        setmsg("")
        setpic(null);

    }
	var onsubmit=async ()=>
	{
        var myform = new FormData();
        if(editmode===false)
        {
            myform.append("cname",catname);
            myform.append("picture",pic)
            try 
            {
                const resp = await fetch("http://localhost:9000/api/addcategory",
                {
                    method:"post",
                    body: myform
                })
                if(resp.ok)
                {
                    var result = await resp.json(); //result={msg:"Signup Successfull"}
                    if(result.statuscode===1)
                    {
                        toast.success("Category added successfully")
                        fetchcategories();
                    }
                    else if(result.statuscode===0)
                    {
                        toast.error("Category not added successfully");
                    }
                }
                else
                {
                    toast.error("Error Occured")
                }
            }
            catch (err) 
            {
                toast.error(err);
            }
        }
        else
        {
            myform.append("cid",catid);
            myform.append("cname",catname);//either oldname/newname
            if(pic!==null)
            {
                myform.append("picture",pic)
            }
            myform.append("oldpicname",catpic);
            try 
            {
                const resp = await fetch("http://localhost:9000/api/updatecategory",
                {
                    method:"put",
                    body: myform
                })
                if(resp.ok)
                {
                    result = await resp.json(); //result={msg:"Signup Successfull"}
                    if(result.statuscode===1)
                    {
                        toast.success("Category updated successfully")
                    }
                    else if(result.statuscode===0)
                    {
                        toast.error("Category not updated successfully");
                    }
                }
                else
                {
                    toast.error("Error Occured")
                }
            }
            catch (err) 
            {
                toast.error(err);
            }
        }	
	}

    const del = async (uid) => 
	{
		const uchoice = window.confirm("Are you sure to delete ?")
		if (uchoice)
		 {
            try
            {
                const resp = await fetch(`http://localhost:9000/api/delcat/${uid}`, 
                {
                        method: "delete"
                })
                if (resp.ok)
                {
                    const result = await resp.json()
                    if (result.statuscode === 1)
                    { 
                        toast.success("Category Deleted Succesfully")
                        fetchcategories()
                        setcatlist([]) //// Due to Asynchrous...up or down fetchmembers() doesn't make any diff AND if asynchronous then without reload working possible
                    }
                    else if (result.statuscode === 0)
                    {
                        toast.error("Error While Deleting...Try Again")

                    }
                }
                else
                {
                    toast.error("Error Occured")
                }
            }
            catch (err)
            {
                toast.error(err)
            }
            }
	}

	return(
    <>
	    <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Manage Category</li>
			</ol>
		</div>
	    </div>

	<div className="register">
		<div className="container">
			<h2>Manage Category</h2>
			<div className="login-form-grids">
				<form name="form1">
					<input type="text" name="catname" value={catname} placeholder="Category Name..." required=" " onChange={(e)=>setcatname(e.target.value)}/><br/>

                   {editmode?<img alt="catpic" src={`uploads/${catpic}`} height="75"/>:null}<br/>

					<br/><input type="file" name="catpic" onChange={onpicselect} required=" "/><br/>
					<input type="button" name="btn" onClick={onsubmit} value={editmode?"Update":"Add"}/>&nbsp;
                    {editmode?<input type="button" name="btn2" onClick={oncancel} value="Cancel"/>:null}<br/>
					{msg}
				</form>
			</div>
            <br/>
            {
                catlist.length>0?
                <div>
                <h2>Added Categories</h2><br/>
                <table className="timetable_sub">
                    <tbody>
                        <tr>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        {
                        catlist.map((data,i)=>
                            <tr key={i}>
                                <td><img alt="categorypic" src={`uploads/${data.catpic}`} height='75'/></td>
                                <td>{data.catname}</td>
                                <td><button onClick={()=>onupdate(data)}>Update</button></td>
                                <td><button onClick={()=>del(data._id)}>Delete</button></td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
                </div>:<h2>No categories found</h2>
            }	

		</div>
	</div>
    </>)
}
export default ManageCat;