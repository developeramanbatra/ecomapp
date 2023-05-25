//Hii this is
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';
var UpdateProduct=()=>
{
	
	const [cat,setcat] = useState();
	const [allcat,setallcat] = useState([]);
	const [subcat,setsubcat] = useState();
	const [allsubcat,setallsubcat] = useState([]);
    const [prodname,setprodname] = useState();
    const [rate,setrate] = useState();
    const [discount,setdiscount] = useState();
    const [stock,setstock] = useState();
    const [description,setdescription] = useState();
    const [featured,setfeatured] = useState();
	const [pic,setpic] = useState();
	const [msg,setmsg] = useState();
	const [picname,setpicname] = useState();
    const [params] = useSearchParams();
    const pid = params.get("prodid");

    function onpicselect(event) 
    {
        setpic(event.target.files[0])
    }
    useEffect(()=>
    {
        fetchprodbyid();
    },[])
    useEffect(()=>
    {
        fetchallcat();
    },[])
    useEffect(()=>
    {
        fetchsubcat();
    },[cat])


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

    var fetchprodbyid=async()=>
    {
        try 
        {
            const resp = await fetch(`http://localhost:9000/api/fetchprodbyid/${pid}`)
            if(resp.ok)
            {
                var result = await resp.json(); 
                if(result.statuscode===0)
                {
                    toast.error("No product details found");
                }
                else if(result.statuscode===1)
                {
                    setcat(result.proddata.catid);
                    setsubcat(result.proddata.subcatid);
                    setprodname(result.proddata.prodname);
                    setrate(result.proddata.rate);
                    setdiscount(result.proddata.discount);
                    setstock(result.proddata.stock);
                    setdescription(result.proddata.descritpion);
                    setfeatured(result.proddata.featured);
                    setpicname(result.proddata.prodpic);
         
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
	var onprodupdate=async ()=>
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
				<li className="active">Update Product</li>
			</ol>
		</div>
	    </div>

	<div className="register">
		<div className="container">
			<h2>Update Product</h2>
			<div className="login-form-grids">
				<form name="form1">
                    <select name="cat" className="form-control" value={cat} onChange={(e)=>setcat(e.target.value)}>
                        <option value="">Choose Category</option>
                        {
                            allcat.map((data,i)=>
                                <option value={data._id} key={i}>{data.catname}</option>
                            )
                        }
                    </select><br/>
                    <select name="subcat" className="form-control" value={subcat} onChange={(e)=>setsubcat(e.target.value)}>
                        <option value="">Choose Sub Category</option>
                        {
                            allsubcat.map((data,i)=>
                                <option value={data._id} key={i}>{data.subcatname}</option>
                            )
                        }
                    </select><br/>
					<input type="text" name="prodname" value={prodname} placeholder="Product Name..." required=" " onChange={(e)=>setprodname(e.target.value)}/><br/>

					<input type="text" name="rate" value={rate} placeholder="Rate..." required=" " onChange={(e)=>setrate(e.target.value)}/><br/>

					<input type="text" name="discount" value={discount} placeholder="Discount..." required=" " onChange={(e)=>setdiscount(e.target.value)}/><br/>

					<input type="text" name="stock" value={stock} placeholder="Stock..." required=" " onChange={(e)=>setstock(e.target.value)}/><br/>

					<textarea name="description" value={description} className="form-control" placeholder="Description..." required=" " onChange={(e)=>setdescription(e.target.value)}></textarea><br/>

                    Featured Product &nbsp;
                    <label><input type="radio" checked={featured==='yes'} onChange={(e)=>setfeatured(e.target.value)} name="featured" value="yes"/>Yes</label>&nbsp;
                    <label><input type="radio" checked={featured==='no'}  onChange={(e)=>setfeatured(e.target.value)} name="featured" value="no"/>No</label><br/><br/>

                    <img src={`/uploads/${picname}`} alt='prodpic"' height="100"/><br/><br/><b>Choose new image, if required</b><br/>
					<br/><input type="file" name="prodpic" onChange={onpicselect} required=" "/><br/>
					<input type="button" name="btn" onClick={onprodupdate} value="Update Product"/><br/>
					{msg}
				</form>
			</div>
		</div>
	</div>
    </>)
}
export default UpdateProduct;