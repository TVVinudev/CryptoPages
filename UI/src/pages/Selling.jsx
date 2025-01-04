import React from 'react'
import bg from '../assets/images/2587.jpg'
import { Form } from 'react-router-dom'
import SellingForm from '../components/SellingForm'

const Selling = () => {
  return (
    <section className='h-auto py-10 w-auto flex justify-center bg-cover' style={{ backgroundImage: `url(${bg})` }}>
      <SellingForm />
    </section>

  )
}

export default Selling