import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
var ManageSubCat=()=>
{
	const [subcatname,setsubcatname] = useState();
	const [cat,setcat] = useState();
	const [allcat,setallcat] = useState([]);
	const [subcatlist,setsubcatlist] = useState([]);
	const [pic,setpic] = useState();
	const [msg,setmsg] = useState();
    const navigate = useNavigate();
    function onpicselect(event) 
    {
        setpic(event.target.files[0])
    }
    useEffect(()=>
    {
        fetchallcat();
    },[])
    var fetchallcat=async()=>
    {
        try 
        {
            const resp = await fetch("http://localhost:9000/api/fetchallcategories")
            if(resp.ok)
            {
                var result = await resp.json(); 
                if(result.statuscode===0)
                {
                    alert("No Categories found");
                }
                else if(result.statuscode===1)
                {
                    setallcat(result.catdata)
                }
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
    useEffect(()=>
    {
        fetchsubcat();
    },[cat])
    var fetchsubcat=async()=>
    {
        if(cat!==undefined)
        {
            setsubcatlist([]);
            try 
            {
                const resp = await fetch(`http://localhost:9000/api/fetchsubcatbycatid?cid=${cat}`)
                if(resp.ok)
                {
                    var result = await resp.json(); 
                    if(result.statuscode===0)
                    {
                        toast.error("No Sub Categories added")
                    }
                    else if(result.statuscode===1)
                    {
                        setsubcatlist(result.subcatdata)
                    }
                }
                else
                {
                    toast.error("Error Occured")
                }
            }
            catch (err) 
            {
                setmsg(err);
            }
        }
    }
    var onupdate=(scid)=>
    {
        navigate({
            pathname: '/updatesubcategory',
            search: `?subcatid=${scid}`,
          });
    }
	var onsubcatadd=async ()=>
	{
        var myform = new FormData();
        myform.append("catid",cat);
        myform.append("scname",subcatname);
        myform.append("picture",pic)
        try 
        {
            const resp = await fetch("http://localhost:9000/api/addsubcategory",
            {
                method:"post",
                body: myform
            })
            if(resp.ok)
            {
                var result = await resp.json(); 
                if(result.statuscode===1)
                {
                    setmsg("Sub Category added successfully")
                }
                else if(result.statuscode===0)
                {
                    setmsg("Sub Category not added successfully");
                }
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
    const del = async (uid) => 
	{
		const uchoice = window.confirm("Are you sure to delete ?")
		if (uchoice)
		 {
            try
            {
                const resp = await fetch(`http://localhost:9000/api/delsubcat/${uid}`, 
                {
                        method: "delete"
                })
                if (resp.ok)
                {
                    const result = await resp.json()
                    if (result.statuscode === 1)
                    { 
                        toast.success("Sub Category Deleted Succesfully")
                        fetchsubcat()
                        setsubcatlist([]) //// Due to Asynchrous...up or down fetchmembers() doesn't make any diff AND if asynchronous then without reload working possible
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
				<li className="active">Manage Sub Category</li>
			</ol>
		</div>
	    </div>

	<div className="register">
		<div className="container">
			<h2>Manage Sub Category</h2>
			<div className="login-form-grids">
				<form name="form1">
                    <select name="cat" className="form-control" onChange={(e)=>setcat(e.target.value)}>
                        <option value="">Choose Category</option>
                        {
                            allcat.map((data,i)=>
                                <option value={data._id} key={i}>{data.catname}</option>
                            )
                        }
                    </select>
					<input type="text" name="subcatname" placeholder="Sub Category Name..." required=" " onChange={(e)=>setsubcatname(e.target.value)}/>
					<br/><input type="file" name="subcatpic" onChange={onpicselect} required=" "/><br/>
					<input type="button" name="btn" onClick={onsubcatadd} value="Add Sub Category"/><br/>
					{msg}
				</form>
			</div>
            {
                subcatlist.length>0?
                <div>
                <h2>Added Sub Categories</h2><br/>
                <table className="timetable_sub">
                    <tbody>
                        <tr>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        {
                        subcatlist.map((data,i)=>
                            <tr key={i}>
                                <td><img alt="subcategorypic" src={`uploads/${data.subcatpic}`} height='75'/></td>
                                <td>{data.subcatname}</td>
                                {/* <td><Link to={`/updatesubcategory?scid=${data._id}`}><button>Update</button></Link></td> */}
                                <td><button onClick={()=>onupdate(data._id)}>Update</button></td>
                                <td><button onClick={()=>del(data._id)}>Delete</button></td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
                </div>:null
            }	


		</div>
	</div>
    </>)
}
export default ManageSubCat;