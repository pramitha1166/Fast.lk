import axios from 'axios'
import React, {useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode'

const SellerOrderData = () => {

    const [sellerOrders, setSellerOrders] = useState([])

    useEffect(() => {

        const token = localStorage.getItem('token')
        const decoded = jwt_decode(token);

        var config = {
            method: 'get',
            url: `/api/orders/order`,
            headers: { 
              'token': token
            }
        };

        axios(config).then(res=> {
            setSellerOrders(res.data)
        }).catch(err=> {
            console.log(err)
        })

    },[])


    return (
        <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Images</th>
          <th scope="col">Change</th>
        </tr>
      </thead>
      <tbody>
        {sellerOrders.map((order, index) => (
          <tr>
            <th scope="row">{index + 1}</th>
            <td>{order.name}</td>
            
            <td>
              <button class="btn btn-outline-success" style={{ padding: 10 }}>
                Edit Images
              </button>
            </td>
            <td style={{ display: "flex" }}>
              <button
                class="btn btn-outline-success"
                style={{ padding: 10 }}
                onClick={() => saveDataTemp(product)}
              >
                Update
              </button>
              <button
                class="btn btn-outline-danger"
                style={{ padding: 10, marginLeft: 10 }}
                onClick={deleteItem}
                id={product._id}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    )
}

export default SellerOrderData
