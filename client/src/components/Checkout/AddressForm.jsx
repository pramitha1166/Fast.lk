import { Button, Grid, Typography } from '@material-ui/core'
import React, {useState} from 'react'

import {FormProvider, useForm} from 'react-hook-form'
import { Link } from 'react-router-dom'
import FormInput from './FormInput'

const AddressForm = ({next}) => {

    const methods = useForm()

    return (
        <div>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({...data}))}>
                    <Grid container spacing={3}>
                        <FormInput required name='firstname' label='First Name' />
                        <FormInput required name='lastName' label='Last Name'  />
                        <FormInput required name='address' label='Address'  />
                        <FormInput required name='email' label='Email'  />
                        <FormInput required name='city' label='City'  />
                        <FormInput required name='zip' label='ZIP'  />
                    </Grid>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '60px'}}>
                        <Button component={Link} to={'/'} color="action" variant="outlined">Back to Home</Button>
                        <Button type="submit" color="primary" variant="contained">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default AddressForm
