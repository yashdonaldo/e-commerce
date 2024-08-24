import React, { Fragment, useEffect, useState } from 'react';
import './ProductAdd.scss';
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import {FiBriefcase, FiDollarSign, FiFileText, FiImage} from 'react-icons/fi'
import { MdAccountTree, MdStorage } from "react-icons/md";
import {useDispatch, useSelector} from 'react-redux'
import Alert from '@mui/material/Alert'
import { useNavigate } from 'react-router-dom';
import { CreateProductAction } from '../../Reducer/ProductReducer';
import { CreateProduct } from '../../actions/ProductActions';

const ProductAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {products, error, loading, success} = useSelector((state)=> state.CreateProduct)

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [MRP, setMRP] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(()=>{
    if(error){
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
        dispatch(CreateProductAction.Admin_Clear_Errors())
      }, 4000)
    }

    if(success){
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
        navigate("/admin/dashboard")
        dispatch(CreateProductAction.Admin_Create_Product_Reset())
      }, 4000);
    }
  },[dispatch, error, success, navigate])

  const CreateProductSubmitHandler = (e)=>{
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("Price", price);
    myForm.set("MRPRate", MRP);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((img) => {
      myForm.append("images", img)
    })


    dispatch(CreateProduct(myForm))
  }

  const createProductImageHandle = (e)=>{
    const files = Array.from(e.target.files)
    setImages([]);
    setImagesPreview([]);

    files.forEach(file=>{
      const reader = new FileReader();
      reader.onload = ()=>{
        if(reader.readyState === 2){
          setImagesPreview((old)=> [...old, reader.result]);
          setImages((old)=> [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  //   setOpen(true)
  // }, 5000);

  return (
    <Fragment>
      <MetaData tittle={"Create Product"}/>
      <div className="dashboard">
        <Sidebar/>
        <div className="newProductContainer">
          <form encType='multipart/form-data' className="crateProductForm" onSubmit={CreateProductSubmitHandler}>
        {open? <Alert severity={success? "success": "error" }>{success? "Product Create Successfully": error}</Alert> : ("")}
            <h1>Create Product</h1>
            <div>
              <FiFileText/>
              <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Product Name' />
            </div>
            <div>
              <FiDollarSign/>
              <input type="number" onChange={(e)=> setMRP(e.target.value)} placeholder='MRP Price' />
            </div>
            <div>
              <FiDollarSign/>
              <input type="number" onChange={(e)=> setPrice(e.target.value)} placeholder='Price' />
            </div>
            <div>
              <FiBriefcase/>
              <textarea name="discription" rows={2} cols="30" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Product Discription'></textarea>
            </div>
            <div>
              <MdAccountTree/>
              <select name="category" id="" onChange={(e)=>setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate)=>(
                  <option value={cate} key={cate}>{cate}</option>
                ))}
              </select>
            </div>
            <div>
              <MdStorage/>
              <input type="number" placeholder='Stock' onChange={(e)=>setStock(e.target.value)} />
            </div>
            <div>
              <input type="file" multiple accept='image/*' name='avatar' onChange={createProductImageHandle}/>
            </div>
            <div className="imagePreview">
              {imagesPreview.map((image, index)=>(
                <img key={index} src={image} alt='Avatar Image' />
              ))}
            </div>

            <button type='submit'>CREATE</button>
            
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default ProductAdd
