import React from 'react'

const TableCard = ({items, feilds, title, description, values, type}) => {
    return (
        <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header card-header-warning">
                                    <h4 className="card-title">
                                        {title}
                                    </h4>
                                    <p className="card-category">
                                        {description}
                                    </p>
                                </div>
                                <div className="card-body table-responsive">
                                    <table className="table table-hover">
                                        <thead className="text-warning">
                                            <tr>
                                            {feilds.map((feild) => (
                                                <td>{feild}</td>
                                            ))}
                                            </tr>                                        
                                        </thead>
                                        <tbody>
                                            {items.map((item) => {
                                                if(type==='product') {
                                                    return (
                                                        <tr>
                                                            <td>{item.name}</td>
                                                            <td>{item.price}</td>
                                                            <td>{item.category}</td>
                                                            <td>{item.discription}</td>
                                                        </tr>
                                                    )
                                                }else if(type==='order') {
                                                    return (
                                                        <tr>
                                                            <td>{item.customer.firstname}</td>
                                                            <td>{item.amount}</td>
                                                            <td>{item.billing.street}</td>
                                                            <td>{item.billing.postal_zip_code}</td>
                                                        </tr>
                                                    )
                                                }
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                        </div>
                      
                    </div>
    )
}

export default TableCard
