import React, {useState} from 'react'
import {MDBNavbar,MDBNavbarBrand,MDBNavbarToggler,MDBNavbarNav,MDBCollapse,MDBNavItem} from 'mdbreact'
import { Link,withRouter } from 'react-router-dom'

const Menu = ({history}) => {

    const [isOpen,setIsOpen] = useState(false)

    const isActive = (history,path) => {
        if(history.location.pathname===path) {
            return {color:"#ffffff"}
        }else {
            return {color:"#000000"}
        }
    }

    const toggleCollapse = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <MDBNavbar color="default-color" dark expand="md">
                <MDBNavbarBrand>
                    <Link className="nav-link white-text" to="/">Fast.Lk</Link>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={toggleCollapse}  />
                <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem>
                            <Link className="nav-link" style={isActive(history,'/')} to="/">Home</Link>
                        </MDBNavItem>
                        <MDBNavItem>
                            <Link className="nav-link" style={isActive(history,'/contactus')} to="/contactus">Contact</Link>
                        </MDBNavItem>
                    </MDBNavbarNav>

                 

                </MDBCollapse>
               
            </MDBNavbar>
        </div>
    )
}

export default withRouter(Menu)
