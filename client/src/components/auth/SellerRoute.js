import React, { useContext } from 'react'
import {Route, Redirect} from 'react-router-dom'
import { isAuthenticated } from '.'
import { LoginContext } from '../../context/LoginContext';


const SellerRoute = ({component: Component, ...rest}) => {

    const [islLoggedIn, setIslLoggedIn] = useContext(LoginContext);

    return (
        <Route
            {...rest}
            render={props=>
            isAuthenticated()&&isAuthenticated().role === 0 || islLoggedIn.status === 'seller' ? ( 
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

export default SellerRoute
