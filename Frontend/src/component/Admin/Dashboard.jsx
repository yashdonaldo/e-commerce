import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import './dashboard.scss'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie, PieChart, Bar, BarChart } from 'recharts';
// import items from 'razorpay/dist/types/items';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProdcutAdmin } from '../../actions/ProductActions';
import { getAllOrders } from '../../actions/OrderAction';

const Dashboard = () => {
  const { products } = useSelector((state) => state.AdminProducts);
  const { orders } = useSelector((state) => state.allOrder);
  const { users } = useSelector((state) => state.allUser)
  const dispatch = useDispatch()

  let OutOfStock = 0;

  products && products.forEach(items => {
    if(items.Stock <= 0){
      OutOfStock += 1
    }
  });


  useEffect(() => {
    dispatch(getAllProdcutAdmin())
    dispatch(getAllOrders())
}, [dispatch]);

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      // amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const data01 = [
    {
      "name": "Out Of Stock",
      "value": OutOfStock
    },
  ];
  const data02 = [
    {
      "name": "In Stock",
      "value": products.length - OutOfStock
    },
  ];

  const Bardata = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300
    }
  ]

  return (
    <div className='dashboard'>
      <Sidebar />

      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <p>Total Amount <span>₹2000</span></p>

        <div className="product-list">
          <div className="product">
            <p>Product</p>
            <p>{products && products.length}</p>
          </div>
          <div className="orders">
            <p>Orders</p>
            <p>{orders && orders.length}</p>
          </div>
          <div className="user">
            <p>Users</p>
            <p>{users && users.length}</p>
          </div>
        </div>

        <div className="linechart">
          {/* <Line data={lineState} /> */}
          <LineChart width={730} height={250} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            <Line type="monotone" dataKey="amt" stroke="#82ca9d" />
          </LineChart>

          <BarChart width={730} height={250} data={Bardata}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </div>

        <div className="doughnoutchart">
          <PieChart width={730} height={350}>
            <Pie data={data01} dataKey="value" nameKey="Out of Stock" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label/>
            <Pie data={data02} dataKey="value" nameKey="In Stock" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
            <Tooltip/>
            <Legend/>
          </PieChart>
        </div>
      </div>
    </div>

  )
}

export default Dashboard
