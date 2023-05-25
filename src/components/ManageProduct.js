import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
var ManageProduct=()=>
{
	
	const [cat,setcat] = useState();
	const [allcat,setallcat] = useState([]);
	const [subcat,setsubcat] = useState();
	const [allsubcat,setallsubcat] = useState([]);
	const [prodsdata,setprodsdata] = useState([]);
    const [prodname,setprodname] = useState();
    const [rate,setrate] = useState();
    const [discount,setdiscount] = useState();
    const [stock,setstock] = useState();
    const [description,setdescription] = useState();
    const [featured,setfeatured] = useState();
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
    useEffect(()=>
    {
        fetchsubcat();
    },[cat])

    useEffect(()=>
    {
        fetchprods();
    },[subcat])

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

    var fetchsubcat=async()=>
    {
        if(cat!==undefined)
        {
            try 
            {
                setallsubcat([]);
                setprodsdata([]);
                const resp = await fetch(`http://localhost:9000/api/fetchsubcatbycatid?cid=${cat}`)
                if(resp.ok)
                {
                    var result = await resp.json(); 
                    if(result.statuscode===0)
                    {
                        alert("No Sub Categories found");
                    }
                    else if(result.statuscode===1)
                    {
                        setallsubcat(result.subcatdata)
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

    var fetchprods=async()=>
    {
        if(subcat!==undefined)
        {
            try 
            {
                const resp = await fetch(`http://localhost:9000/api/fetchprodsbysubcatid/${subcat}`)
                if(resp.ok)
                {
                    var result = await resp.json(); 
                    if(result.statuscode===0)
                    {
                        toast.error("No products found");
                        setprodsdata([]);
                    }
                    else if(result.statuscode===1)
                    {
                        setprodsdata(result.prodsdata)
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
    var onupdate=(pid)=>
    {
        navigate({
            pathname: '/updateproduct',
            search: `?prodid=${pid}`,
          });
    }
	var onprodadd=async ()=>
	{
        var myform = new FormData();
        myform.append("catid",cat);
        myform.append("subcatid",subcat);
        myform.append("pname",prodname);
        myform.append("rate",rate);
        myform.append("discount",discount);
        myform.append("stock",stock);
        myform.append("description",description);
        myform.append("featured",featured);
        myform.append("picture",pic)
        try 
        {
            const resp = await fetch("http://localhost:9000/api/addproduct",
            {
                method:"post",
                body: myform
            })
            if(resp.ok)
            {
                var result = await resp.json(); 
                if(result.statuscode===1)
                {
                    toast.success("Product added successfully")
                }
                else if(result.statuscode===0)
                {
                    setmsg("Product not added successfully");
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

	return(
    <>
	    <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Manage Product</li>
			</ol>
		</div>
	    </div>

	<div className="register">
		<div className="container">
			<h2>Manage Product</h2>
			<div className="login-form-grids">
				<form name="form1">
                    <select name="cat" className="form-control" onChange={(e)=>setcat(e.target.value)}>
                        <option value="">Choose Category</option>
                        {
                            allcat.map((data,i)=>
                                <option value={data._id} key={i}>{data.catname}</option>
                            )
                        }
                    </select><br/>
                    <select name="subcat" className="form-control" onChange={(e)=>setsubcat(e.target.value)}>
                        <option value="">Choose Sub Category</option>
                        {
                            allsubcat.map((data,i)=>
                                <option value={data._id} key={i}>{data.subcatname}</option>
                            )
                        }
                    </select><br/>
					<input type="text" name="prodname" placeholder="Product Name..." required=" " onChange={(e)=>setprodname(e.target.value)}/><br/>

					<input type="text" name="rate" placeholder="Rate..." required=" " onChange={(e)=>setrate(e.target.value)}/><br/>

					<input type="text" name="discount" placeholder="Discount..." required=" " onChange={(e)=>setdiscount(e.target.value)}/><br/>

					<input type="text" name="stock" placeholder="Stock..." required=" " onChange={(e)=>setstock(e.target.value)}/><br/>

					<textarea name="description" className="form-control" placeholder="Description..." required=" " onChange={(e)=>setdescription(e.target.value)}></textarea><br/>

                    Featured Product &nbsp;
                    <label><input type="radio" onChange={(e)=>setfeatured(e.target.value)} name="featured" value="yes"/>Yes</label>&nbsp;
                    <label><input type="radio" onChange={(e)=>setfeatured(e.target.value)} name="featured" value="no"/>No</label><br/>

					<br/><input type="file" name="prodpic" onChange={onpicselect} required=" "/><br/>
					<input type="button" name="btn" onClick={onprodadd} value="Add Product"/><br/>
					{msg}
				</form>
			</div>

            {
                prodsdata.length>0?
                <div>
                <h2>Added Proucts</h2><br/>
                <table className="timetable_sub">
                    <tbody>
                        <tr>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Rate</th>
                            <th>Stock</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        {
                        prodsdata.map((data,i)=>
                            <tr key={i}>
                                <td><img alt="product_pic" src={`uploads/${data.prodpic}`} height='75'/></td>
                                <td>{data.prodname}</td>
                                <td>{data.rate}</td>
                                <td>{data.stock}</td>
                                <td><button onClick={()=>onupdate(data._id)}>Update</button></td>
                                <td><button>Delete</button></td>
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
export default ManageProduct;