import React, { useState, useEffect } from 'react';
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
    try {
      provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      if (signer) {
        toast.success(`The address ${signer.address} is connected!`);
        setSigner(signer);
        setConnect(true);
        localStorage.setItem('Signer', signer.address); // Save address to localStorage
      }
    } catch (error) {
      toast.error('Failed to connect to MetaMask. Make sure MetaMask is installed and unlocked.');
    }
  };

  const disconnectWallet = () => {
    provider = null;
    toast('Disconnected from wallet.');
    setConnect(false);
    localStorage.removeItem('Signer'); // Remove address from localStorage
    setSigner('');
  };

  // Automatically connect if there's a saved address in localStorage
  useEffect(() => {
    const savedAddress = localStorage.getItem('Signer');
    if (savedAddress) {
      setSigner(savedAddress);
      setConnect(true);
    }
  }, []);

  return (
    <>
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
          className={`lg:flex space-x-2 inline lg:space-x-6 ${isMenuOpen ? 'block' : 'hidden'} lg:block`}
        >
          {[
            { name: 'Home', href: '/', element: '<Home />' },
            { name: 'Shop', href: '/shop', element: '<Shope />' },
            { name: 'Sell Your Book', href: '/selling', element: '<Selling />' },
            { name: 'My Books', href: '/mybooks', element: '<MyBooks />' },
            { name: 'Order From Customer', href: '/orderFromCustomer', element: '<OrderFromCustomer />' },
            { name: 'My Orders', href: '/myOrders', element: '<MyOrders />' },
          ].map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                element={item.element}
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

        {connect ? (
          <button className="px-5 py-2 shadow-2xl" onClick={disconnectWallet}>
            Disconnect From MetaMask
          </button>
        ) : (
          <button className="px-5 py-2 shadow-2xl" onClick={onConnect}>
            Connect To MetaMask
          </button>
        )}
      </nav>
      <ToastContainer position="top-right" pauseOnHover />
    </>
  );
};

export default Navbar;
