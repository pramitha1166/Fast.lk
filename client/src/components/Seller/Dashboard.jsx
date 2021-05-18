import axios from 'axios'
import React, {useState, useEffect} from 'react'
import LoaderSpinner from '../Comman/LoaderSpinner'
import Layout from '../layout/Layout'
import SellerLayout from '../layout/SellerLayout'
import TableCard from './TableCard'


const Dashboard = () => {

    const [products,setProducts] = useState([])
    const [orders,setOrders] = useState([])
    const [productLoading,setProductLoading] = useState(false)
    const [orderLoading,setOrderLoading] = useState(false)

    let tableValue = new Map()

    const generateTableValues = (values) => {
        orders.map((data) => {
            Object.keys(data).forEach((props) => {
                // if(props==keys[0]) {

                // }
                console.log(props)
            })
        })
    }

    useEffect(() => {
        window.scroll(0,0);
        setProductLoading(true)
        setOrderLoading(true)
        axios
          .get("/api/products/view?page=1&limit=4")
          .then((res) => {
            setProducts(res.data.result.results);
            console.log(products)
            setProductLoading(false)
          })
          .catch((err) => console.log(err));

        axios
          .get("/api/orders/order")
          .then((res) => {
              setOrders(res.data)
              console.log(orders)
              setOrderLoading(false)

          })
          .catch((err) => {
            console.log(err)
          })

      }, []);

    return (
        <Layout img="../assets/img/pexels-vlada-karpovich-4050388.jpg" title="Seller Dashboard">
            <br />
           
                <div>
                <div className="row" style={{marginBottom:'60px',justifyContent: 'center'}}>
                    <ul
                    class="nav nav-pills nav-pills-icons justify-content-center"
                    role="tablist"
                    >
                        <li className="nav-item">
                            <a
                                class="nav-link active"
                                href="#products"
                                role="tab"
                                data-toggle="tab"
                            >
                                <i class="material-icons">
                                    inventory_2
                                    </i> Products
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                class="nav-link"
                                href="#customers"
                                role="tab"
                                data-toggle="tab"
                            >
                                <i class="material-icons">people_alt</i> Customers
                            </a>
                        </li>
                        <li className="nav-item">
                        <a
                            class="nav-link"
                            href="#orders"
                            role="tab"
                            data-toggle="tab"
                        >
                            <i class="material-icons">
                                dvr</i> Orders
                        </a>
                        </li>
                        <li className="nav-item">
                        <a
                            class="nav-link"
                            href="#studio"
                            role="tab"
                            data-toggle="tab"
                        >
                            <i class="material-icons">
                            category</i> Category
                        </a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content tab-space">
                    <div className="tab-pane active text-center" id="products">
                        {productLoading ? (
                            <LoaderSpinner />
                        ) : (
                            <TableCard title="All Products" type="product" items={products} feilds={['Name','Price','Category','Description']} description="Add, Delete, Update Products" />
                        )}
                    </div>

                    <div className="tab-pane text-center" id="orders">
                        {orderLoading ? (
                            <LoaderSpinner />
                        ) : (
                            <TableCard title="All Orders" type="order" items={orders} feilds={['Name','Price','Category','Description']} description="Add, Delete, Update Categories" />
                        )}
                        
                    </div> 

                    <div className="tab-pane text-center" id="customers">
                        {orderLoading ? (
                            <LoaderSpinner />
                        ) : (
                            <TableCard title="All Customers" type="order" items={orders} feilds={['Name','Price','Category','Description']} description="Add, Delete, Update Categories" />
                        )}
                        
                    </div> 
                </div>

            </div>
            
            
           
        </Layout>
    )
}

export default Dashboard
