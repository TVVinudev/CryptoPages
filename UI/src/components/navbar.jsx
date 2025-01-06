import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [connect, setConnect] = useState(false);
  const [selectedPage, setSelectedPage] = useState('/'); // Track the selected page
  const [signer, setSigner] = useState('');
  let provider;

  const onConnect = async () => {
    provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log(signer);

    if (signer) {
      toast.success(`The address ${signer.address} is connected!`);
      setSigner(signer);
      setConnect(true);
      localStorage.setItem('Signer', JSON.stringify(signer.address));
    } else {
      toast("Error Occurred!");
    }
  };

  const disconnectWallet = () => {
    provider = null;
    toast("Disconnected from wallet.");
    setConnect(false);
    localStorage.setItem('Signer', JSON.stringify(''));
  };

  return (
    <nav className="text-black p-4 flex items-center justify-between font-delius">
     
      <Link to={"/"} onClick={() => setSelectedPage('/')}>
        <div className="flex items-center">
          <img src={logo} alt="Logo" width={40} height={40} />
          <div className="text-2xl font-bold">Crypto Pages</div>
        </div>
      </Link>

      
      <button
        className="lg:hidden text-yellow-500"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? '✖' : '☰'}
      </button>

     
      <ul
        className={`lg:flex space-x-2 inline lg:space-x-6 ${isMenuOpen ? 'block' : 'hidden'
          } lg:block`}
      >
        {[
          { name: 'Home', href: '/',element:'<Home />' },
          { name: 'Shop', href: '/shop',element:'<Shope />'  },
          { name: 'Sell Your Book', href: '/selling',element:'<Selling />'  },
          { name: 'My Books', href: '/mybooks',element:'<MyBooks />'  },
          { name: 'Order From Customer', href: '/orderFromCustomer',element:'<OrderFromCustomer />'  },
          { name: 'My Orders', href: '/myOrders',element:'<MyOrders />'  },
        ].map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              element = {item.element}
              onClick={() => setSelectedPage(item.href)}
              className={`block lg:inline font-bold ${selectedPage === item.href
                ? 'text-[#604CC3] border-b-2 border-[#604CC3]'
                : 'hover:text-[#604CC3]'
                }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

     

     <ToastContainer
        position="top-right"
        pauseOnHover
      />

      {/* Current Page Display */}
      {/* <div className="absolute top-4 right-4 text-sm lg:text-base text-gray-700">
        <span className="font-bold">Current Page:</span> {selectedPage}
      </div> */}
    </nav>
  );
};

export default Navbar;
