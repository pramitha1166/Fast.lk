import React from 'react'

const AddressForm = ({next}) => {
    return (
        <div>
            address Form
            <button className="btn btn-primary btn-sm" onClick={()=>next()}>Next</button>
        </div>
    )
}

export default AddressForm
