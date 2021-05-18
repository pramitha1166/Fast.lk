import React from 'react'

const SellerLayout = ({img='../assets/img/pexels-vlada-karpovich-4050388.jpg', children}) => {
    return (
        <>
            {/* <div
            class="page-header header-filter smooth_load"
            style={{
            backgroundImage:
            `url('${img}')`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
                }}
            >
               
            </div> */}
             <div class="wrapper ">
                   <div class="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/pexels-vlada-karpovich-4050388.jpg">
                       
                   </div>
             </div>
        </>
    )
}

export default SellerLayout
