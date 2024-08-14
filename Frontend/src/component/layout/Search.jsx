import React, { Fragment, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import MetaData from './MetaData'

const Search = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState("")
  const searchSubmitHandler = (e)=>{
    e.preventDefault();
    if(keyword.trim()){
      navigate(`/products/${keyword}`)
    }else{
      navigate("/products")
    }
  }
  return (
    <div>
      <MetaData tittle="Search a Product---VR LIFESTYLE"/>
      <Fragment>
        <form className='searchBox' onSubmit={searchSubmitHandler}>
          <input type="text" placeholder='Search a Product...' onChange={(e)=> setKeyword(e.target.value)} />
          <input type="submit" value="Search" />
        </form>
      </Fragment>
    </div>
  )
}

export default Search
