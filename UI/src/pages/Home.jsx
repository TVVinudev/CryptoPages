import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import MainBanner from '../components/MainBanner'
import Grid from '../components/Grid'
import SectionBanner from '../components/SectionBanner'

const Home = () => {
    return (
        <>
            <MainBanner />
            <SectionBanner/>
            <h2 className='font-delius font-semibold ml-24 my-10 text-2xl underline'>Books For You</h2>
            <Grid home={true}/>
            
        </>

    )
}

export default Home