import React, { Fragment, useEffect, useState } from 'react';
import './ProductAdd.scss';
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import {FiBriefcase, FiDollarSign, FiFileText, FiImage} from 'react-icons/fi'
import { MdAccountTree, MdStorage } from "react-icons/md";
import {useDispatch, useSelector} from 'react-redux'
import Alert from '@mui/material/Alert'
import { useNavigate, useParams } from 'react-router-dom';
import { CreateProductAction, updateProductAction } from '../../Reducer/ProductReducer';
import { CreateProduct, getProductDetails, updateProduct } from '../../actions/ProductActions';

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const param = useParams()

  const {error:updateError, loading, isUpdated} = useSelector((state)=> state.UpdateProduct)
  const {error, product} = useSelector((state)=> state.Product_Details)

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
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(()=>{
    if(product && product._id !== param.id){
        dispatch(getProductDetails(param.id))
    }else{
        setName(product.name);
        setDescription(product.description);
        setPrice(product.Price);
        setMRP(product.MRPRate)
        setCategory(product.category);
        setStock(product.Stock);
        setOldImages(product.images)
    }

    if(error){
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
      }, 4000)
    }; 

    if(updateError){
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
        dispatch(updateProductAction.Update_Product_Clear_Errors())
      }, 4000)
    }

    if(isUpdated){
      setOpen(true)
      setTimeout(() => {
        setOpen(false)
        navigate("/admin/dashboard")
        dispatch(updateProductAction.Update_Product_Reset())
      }, 4000);
    }
  },[dispatch, error, isUpdated, navigate, param.id , product, updateError])

  const updateProductSubmitHandler = (e)=>{
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

    // console.log(myForm)

    dispatch(updateProduct(param.id ,myForm))
  }

  const updateProductImageHandle = (e)=>{
    const files = Array.from(e.target.files)
    // setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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

  return (
    <Fragment>
      <MetaData tittle={"Create Product"}/>
      <div className="dashboard">
        <Sidebar/>
        <div className="newProductContainer">
          <form encType='multipart/form-data' className="crateProductForm" onSubmit={updateProductSubmitHandler}>
        {open? <Alert severity={isUpdated? "success": "error" }>{isUpdated? "Update Product Successfully": error || updateError}</Alert> : ("")}
            <h1>Update Product</h1>
            <div>
              <FiFileText/>
              <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Product Name' />
            </div>
            <div>
              <FiDollarSign/>
              <input type="number" value={MRP} onChange={(e)=> setMRP(e.target.value)} placeholder='MRP Price' />
            </div>
            <div>
              <FiDollarSign/>
              <input type="number" value={price} onChange={(e)=> setPrice(e.target.value)} placeholder='Price' />
            </div>
            <div>
              <FiBriefcase/>
              <textarea name="discription" rows={2} cols="30" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Product Discription'></textarea>
            </div>
            <div>
              <MdAccountTree/>
              <select value={category} name="category" id="" onChange={(e)=>setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate)=>(
                  <option value={cate} key={cate}>{cate}</option>
                ))}
              </select>
            </div>
            <div>
              <MdStorage/>
              <input type="number" value={Stock} placeholder='Stock' onChange={(e)=>setStock(e.target.value)} />
            </div>
            <div>
              <input type="file" multiple accept='image/*' name='avatar' onChange={updateProductImageHandle}/>
            </div>
            <div className="imagePreview">
              {oldImages && oldImages.map((image, index)=>(
                <img key={index} src={image.url} alt='Old Avatar Image' />
              ))}
            </div>
            <div className="imagePreview">
              {imagesPreview && imagesPreview.map((image, index)=>(
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

export default UpdateProduct
