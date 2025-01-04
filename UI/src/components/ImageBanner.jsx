import React from 'react'
import bg from '../assets/images/bgbanner.png'

const ImageBanner = () => {
  return (
    <section className='h-[50vh] w-full bg-no-repeat bg-cover bg-inherit' style={{ backgroundImage: `url(${bg})` }} >
    </section>
  )
}

export default ImageBanner