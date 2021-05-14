import { Button, Grid, TextField, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'



export default class AddressForms extends Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
        this.state = {
                name: '',
                street_address: '',
                city: '',
                state: '',
                zip_code: '',    
            
        }
        this.autocomplete = null
       
    }

    handlePlaceSelect() {
        let addressObject = this.autocomplete.getPlace()
        let address = addressObject.address_components
        this.setState({
          name: addressObject.name,
          street_address: `${address[0].long_name} ${address[1].long_name}`,
          city: address[4].long_name,
          state: address[6].short_name,
          zip_code: address[8].short_name,
          googleMapLink: addressObject.url
        })
      }

    // initialState() {
    //     return {
    //         name: '',
    //         street_address: '',
    //         city: '',
    //         state: '',
    //         zip_code: '',
    //         googleMapLink: ''
    //     }
    // }
    
    componentDidMount() {

        this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})


        this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
    }

    handleChange= event => {
        this.setState({
                [event.target.name]: event.target.value
        })
    }


    handleSubmit(event) {
        event.preventDefault()
        this.props.next(this.state)
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <Typography variant="h6" gutterBottom>Shipping Address</Typography>
               
                    <form onSubmit={this.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField id="autocomplete" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label='Name' name={'name'} required onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label='Street Address' name={'street_address'} required onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label='City' name={'city'} required onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label='State' name={'state'} required onChange={this.handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label='ZIP Code' name={'zip_code'} required onChange={this.handleChange} />
                            </Grid>
                        </Grid> 
                        <br />
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button component={Link} to={'/cart'} color="action" variant="outlined">Back to Cart</Button>
                            <Button type="submit" color="primary" variant="contained">Next</Button>
                        </div>      
                    </form>
                
            </div>
        )
    }
}
