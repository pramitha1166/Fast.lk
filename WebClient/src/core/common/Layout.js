import React from 'react'
import Footer from './Footer'
import Menu from './Menu'

import { MDBJumbotron} from "mdbreact";


const Layout = ({className, title='Title', description='Enter description', children}) => {
    return (
        <div>
            <Menu />

            <MDBJumbotron>
                <h2 className="h1 display-3">{title}</h2>
                <p className="lead">
                    {description}
                </p>
            </MDBJumbotron>

            <div className={className}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout
