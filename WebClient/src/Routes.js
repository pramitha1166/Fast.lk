import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Contact from './core/Contact'
import Home from './core/Home'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/contactus" exact component={Contact} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
