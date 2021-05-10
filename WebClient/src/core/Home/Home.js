import React from 'react'
import Layout from './../common/Layout'
import CarouselPage from './CarouselPage';
import EcommercePage from './EcommercePage';

const Home = () => {
    return (
        <Layout title="Home" description="welcome to home" className="">
            <CarouselPage />
            <EcommercePage />
        </Layout>
    )
}

export default Home
