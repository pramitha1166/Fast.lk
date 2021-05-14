import { Button, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core'
import React, {useState,useEffect} from 'react'

import { Link } from 'react-router-dom'

const AddressForm = ({next,cart_data}) => {

    const [data,setData] = useState({
        firstName: '',
        lastname: '',
        address: '',
        email: '',
        city: '',
        zip: '',    
        amount: 1000
    })
 
    
     
    const handleForm = name => event => {
        setData({
            ...data, [name]: event.target.value
        })
    }


    useEffect(()=> {
   
    })

   

    const submitForm = (event) => {
        event.preventDefault()
        next({...data})
    }


    return (

        <div>
            <Typography variant="h6" gutterBottom>Order Summery</Typography>
            <Paper style={{marginBottom: '40px',marginTop: '20px'}}>
                <Grid container spacing={3}>
                    {JSON.stringify(cart_data)}
                    {cart_data.map((data) => {
                        return (
                            <Grid item sm={6}>
                                <Typography variant="overline" gutterBottom>{data.name}</Typography>
                            </Grid>
                        )
                    })}
                   
                    <Grid item sm={6}>
                        3
                    </Grid>
                </Grid>
            </Paper>

           

            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            
                <form onSubmit={submitForm}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} sm={6}>
                            <TextField id="firstname" required  fullWidth label="First Name" onChange={handleForm('firstname')}  />   
                            
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField id="lastname" required fullWidth label="Last Name" onChange={handleForm('lastname')} />   
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField id="address" required fullWidth label="Address"  onChange={handleForm('address')} />   
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField id="email" required fullWidth label="Email" onChange={handleForm('email')}  />   
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField id="city" required fullWidth label="City" onChange={handleForm('city')} />   
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <TextField id="zip" required fullWidth label="ZIP" onChange={handleForm('zip')}  />   
                        </Grid>

                    </Grid>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '60px'}}>
                        <Button component={Link} to={'/'} color="action" variant="outlined">Back to Home</Button>
                        <Button type="submit" color="primary" variant="contained">Next</Button>
                    </div>
                </form>
            
        </div>
    )
}

export default AddressForm
