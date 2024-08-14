import React, { Fragment, useEffect, useState } from 'react'
import Loading from '../layout/Loading'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../actions/ProductActions'
import Featured from '../Home/Featured'
import './Product.scss'
import Pagination from 'react-js-pagination'
import SidebarNavigation from '../Header/SidebarNavigation'
import MetaData from '../layout/MetaData'


const Product = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0, 25000])
  const [ratings, setRatings] = useState(0)
  const [category, setCategoy] = useState("")

  const param = useParams()
  const { product, loading, productsCount, resultPerPage, filteredProductsCount, error } = useSelector((state) => state.Store)

  const keyword = param.keyword;

  const currentPageNo = (e) => {
    setCurrentPage(e)
  }

  const PriceData = (data)=>{
    setPrice(data)
  }
  const categoriesData = (data)=>{
    setCategoy(data)
  }
  const RatingStar = (data)=>{
    setRatings(data)
  }

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, ratings))

  }, [dispatch, keyword, currentPage, price, category, ratings, error])

  let count = filteredProductsCount
  return (
    <Fragment>
      {!loading ? (<Loading />) : (
        <Fragment>
          <MetaData tittle={`PRODUCTS---- VR LIFESTYLE`} />
          <h2 className="productHeading">Produts</h2>
          {/* <Alert severity='error'>This is alert</Alert> */}

          {/* SideBar Filter Navigation */}
          <SidebarNavigation sendPrice={PriceData} totalProduct={productsCount} sendCategory={categoriesData} sendRating={RatingStar}/>

          {/* All Products */}
          <div className="container" id="container">
            {product && product.map((product) => <Featured key={product._id} product={product} />)}
          </div>

          {/* Paginaton */}
          {resultPerPage <= count && (
            <div className="paginationBox">
              <Pagination activePage={currentPage} itemsCountPerPage={resultPerPage} totalItemsCount={productsCount} onChange={currentPageNo} nextPageText="Next"
                prevPageText="Prev"
                firstPageText="first"
                lastPageText="last"
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='PageLinkActive'
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default Product
