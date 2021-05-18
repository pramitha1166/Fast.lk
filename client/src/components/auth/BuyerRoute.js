import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { isAuthenticated } from '.'

const BuyerRoute = ({component: Component, ...rest}) => {
    return (
        <Route 
            {...rest}
            render = {props => 
                isAuthenticated() && isAuthenticated().role === 1 ? (
                    <Component {...props}/>
                ): (
                    <Redirect
                        to={{
                            pathname: '/login'
                        }}
                    />
                )
            }
        >
           
        </Route>
    )
}

export default BuyerRoute
