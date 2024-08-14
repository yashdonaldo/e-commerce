// HomePage.js
import React, { Fragment, useEffect } from 'react';
import Banner from './Banner';
import Slider from './Slider.jsx';
import Featured from './Featured.jsx';
import MetaData from '../layout/MetaData.jsx'
import { getProduct } from '../../actions/ProductActions.jsx'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../layout/Loading.jsx';
import Footer from '../Footer/Footer.jsx';



const HomePage = () => {
  const dispatch = useDispatch()
  const { loading, error, product, productCount } = useSelector((state) => {
    return state.Store
  })

  useEffect(() => {
    dispatch(getProduct())
  }, [dispatch]);


  return (
    <Fragment>
      {!loading ? <Loading/> : (
        <Fragment>
        <MetaData tittle="Home Page"/>
        <div className="home-page">
        <Slider />
          <h2 className='heading'>Featured Product</h2>
  
          <div className="container" id="container">
            {product && product.map((product) => (<Featured product={product}  key={product._id}/>))}
          </div>
          
        </div>
      </Fragment>
      )}
      <Footer/>
    </Fragment>
  );
};

export default HomePage;
