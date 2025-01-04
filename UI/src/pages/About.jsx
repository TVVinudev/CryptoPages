import React from 'react'
import bg from '../assets/images/rb_2249.png'

const About = () => {
  return (
    <>

      <section className='md:h-[80vh] w-full h-auto'>
        <div class=" h-64 w-full bg-cover bg-center pt-10" style={{ backgroundImage: `url(${bg})` }}>
         
        </div>
        <h1 className="text-black font-bold mb-4 ml-24 text-left mt-5 ">
            <span className='font-delius text-2xl text-[#604CC3] underline '>ABOUT US</span>
          </h1>
        <div className='flex justify-center md:mx-40 md:my-10 mx-10 my-4'>
       
          <p className='text-justify font-serif text-lg text-gray-500'>

            Welcome to our decentralized platform for pre-owned books—a revolutionary way to buy and sell books securely and transparently. Built on the Ethereum blockchain, our dApp connects book enthusiasts from around the world, eliminating intermediaries and empowering users to engage in direct, trustworthy transactions.

            <br /> <br />At the heart of our platform are smart contracts that automate essential processes such as book listings, order placements, and ownership transfers. Sellers can easily list their books with detailed descriptions, pricing, and condition notes, while buyers can explore a wide range of options, place bids, or make instant purchases. Payments are seamlessly conducted using Ethereum, ensuring quick, cost-effective, and borderless transactions.

            <br /><br /> To establish trust, we integrate decentralized identity verification, enabling users to transact confidently. Our blockchain-based escrow mechanism further ensures secure transactions by holding funds until all sale conditions are met. Each transaction is immutably recorded on the blockchain, creating a transparent and tamper-proof audit trail.

            <br /><br /> Beyond convenience and security, we are committed to promoting sustainability by encouraging the reuse of books. Our platform fosters a global community of book lovers, offering a fair, user-driven marketplace that champions eco-conscious practices.

            <br /> <br />Join us in transforming the second-hand book market into a vibrant, sustainable, and blockchain-powered ecosystem. Together, let’s redefine how books find their next home!
          </p>
        </div>
      </section>

    </>
  )
}

export default About