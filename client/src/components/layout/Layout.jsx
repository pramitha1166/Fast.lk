import React from 'react'
import './Layout.css'

const Layout = ({title="title", children}) => {
    return (
        <div>
            <div 
            className="page-header header-filter smooth_load layout-page-header"
            data-parallax="true"
            style={{backgroundImage: "url('https://cdn.shopify.com/s/files/1/0437/0454/9536/files/slider_2000x.png?v=1595597573"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h2>
                                {title}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main main-raised">
                <div className="container">
                    {children}
                </div>
            </div>
              
        </div>
    )
}

export default Layout
