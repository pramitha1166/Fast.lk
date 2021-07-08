import { Table, TableCell, TableHead, TableRow } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import Layout from '../layout/Layout'

const SelectSeller = () => {

    const [cartData,setCartData] = useContext(CartContext)
    const [dataByRef,setDataByRef] = useState([])

    useEffect(() => {
        let temp = {}
        console.log(cartData)
        cartData.map((data) => {
            var owner = data.owner
            temp = {
                ref: owner,
                item: cartData.filter(function() {
                    
                })
            }
            setDataByRef(temp)
        })

        console.log(temp)

    },[])

    return (
        <Layout title="Order Details">
           <div className="row">
           <div class="col-md-6">
                <div class="card">
                    <div class="card-header-danger">
                        <h4 class="card-title">#Seller Ref</h4>
                        <p class="category">asdsafasfas323sd</p>
                    </div>
                    <div class="card-body">
                        {cartData.map(data=> (
                             <div class="row">
                             <div class="col-sm-4">
                                 <img style={{width:'100px',height: '100px', borderRadius: '20px'}} src={data.img} />
                             </div>
                             <div class="col-sm-4">
                                 asd
                             </div>
                             <div class="col-sm-4">
                                 asd
                             </div>
                         </div>
                        ))}
                       
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary">Parchase</button>
                    </div>
                </div>
            </div>
           </div>
        </Layout>
    )
}

export default SelectSeller
