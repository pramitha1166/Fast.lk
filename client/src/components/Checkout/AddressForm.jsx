import { Button, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import React, {useState,useEffect} from 'react'

import {FormProvider, useForm} from 'react-hook-form'
import { Link } from 'react-router-dom'
import FormInput from './FormInput'
import places from 'places.js'

const AddressForm = ({next}) => {

    const [data,setData] = useState({
        firstName: '',
        lastname: '',
        address: '',
        email: '',
        city: '',
        zip: ''
    })
    const [shippingCountries,setShippingCountries] = useState([]);
    const [shippingCountry,setShippingCountry] = useState('');
    const [shippingSubdivisions,setShippingSubdivisions] = useState([
        'Kandy','Colombo','Kurunagala','Jaffna','Galle'
    ]);
    const [shippingSubdivision,setShippingSubdivision] = useState('');
    const [shippingOptions,setShippingOptions] = useState([
    ]);
    const [shippingOption,setShippingOption] = useState('');

    const {register, handleSubmit, formState: {errors}} = useForm()

    const countries = Object.entries(shippingCountries).map(([code,name]) => ({id: code, label: name}));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code,name]) => ({id: code, label: name}));
    const options = shippingOptions.map((sO) => ({id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}));

    const address_input = () => (
        <TextField fullWidth label="search place" type="search" id="address_input" placeholder="Where are we going?" />
    )
     
    const handleForm = name => event => {
        setData({
            ...data, [name]: event.target.value
        })
    }


    useEffect(()=> {
        // const placesAutocomplete = places({
        //     appId: 'GAIEZA7JKO',
        //     apiKey: '60ae77aea2fa6adc9cd300bebf583161',
        //     container: document.querySelector('#address_input')
        // })
    })

   

    const submitForm = (event) => {
        event.preventDefault()
        next({...data})
    }


    return (
        <div>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            
                <form onSubmit={submitForm}>
                    <Grid container spacing={3}>

                        {/* <Grid item xs={12} sm={6}>
                           
                            {
                                address_input()
                            }
                          
                              
                        </Grid> */}

                        {/* <Grid item xs={12} sm={6}>
                            <TextField id="firstname" required  aria-invalid={errors.firstName ? "true" : "false"} fullWidth label="First Name" {...register('firstname', {required: true, maxLength: 30})}  />   
                            {errors.firstName && (
                                <span role="alert">
                                This field is required
                              </span>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField id="lastname" required fullWidth label="Last Name" {...register('lastname', {required: true, maxLength: 30})}  />   
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField id="address" required fullWidth label="Address" {...register('address', {required: true, maxLength: 30})}  />   
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField id="email" required fullWidth label="Email" {...register('email', {required: true, maxLength: 30})}  />   
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField id="city" required fullWidth label="City" {...register('city', {required: true, maxLength: 30})}  />   
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <TextField id="zip" required fullWidth label="ZIP" {...register('zip', {required: true, maxLength: 30})}  />   
                        </Grid> */}
                        {/* <FormInput required name='firstname' label='First Name' /> */}
                      
                        {/* <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                            {countries.map((country) => (
                                <MenuItem key={country.id} value={country.id}>
                                    {country.label}    
                                </MenuItem>
                            ))}
                        </Select>
                        </Grid> */}

                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>
                                        {subdivision.label}
                                    </MenuItem>
                                ))}
                                
                            </Select>
                        </Grid> */}

                        
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                               
                            </Select>
                        </Grid> */}

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
