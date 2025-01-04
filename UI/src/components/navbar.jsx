import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';

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
      alert(`The address ${signer.address} is connected!`);
      setSigner(signer);
      setConnect(true);
      localStorage.setItem('Signer', JSON.stringify(signer.address));
    } else {
      alert("Error Occurred!");
    }
  };

  const disconnectWallet = () => {
    provider = null;
    console.log("Disconnected from wallet.");
    setConnect(false);
    localStorage.setItem('Signer', JSON.stringify(''));
  };

  return (
    <nav className="text-black p-4 flex items-center justify-between font-delius">
      {/* Logo */}
      <Link to={"/"} onClick={() => setSelectedPage('/')}>
        <div className="flex items-center">
          <img src={logo} alt="Logo" width={40} height={40} />
          <div className="text-2xl font-bold">Crypto Pages</div>
        </div>
      </Link>

      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden text-yellow-500"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? '✖' : '☰'}
      </button>

      {/* Navigation Links */}
      <ul
        className={`lg:flex space-x-2 inline lg:space-x-6 ${
          isMenuOpen ? 'block' : 'hidden'
        } lg:block`}
      >
        {[
          { name: 'Home', href: '/' },
          { name: 'Shop', href: '/shop' },
          { name: 'Sell Your Book', href: '/selling' },
          { name: 'My Books', href: '/mybooks' },
          { name: 'Order From Customer', href: '/orderFromCustomer' },
          { name: 'My Orders', href: '/myOrders' },
        ].map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              onClick={() => setSelectedPage(item.href)}
              className={`block lg:inline font-bold ${
                selectedPage === item.href
                  ? 'text-[#604CC3] border-b-2 border-[#604CC3]'
                  : 'hover:text-[#604CC3]'
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Wallet Connection */}
      <div className="hidden lg:block">
        {connect ? (
          <button
            onClick={disconnectWallet}
            className="text-white md:px-4 md:py-2 rounded-2xl shadow-2xl bg-[#604CC3]"
          >
            MetaMask Connected
          </button>
        ) : (
          <button
            onClick={onConnect}
            className="text-black md:px-4 md:py-2 rounded-md shadow-2xl"
          >
            Connect MetaMask
          </button>
        )}
      </div>

      {/* Mobile Wallet Connection */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4">
          {connect ? (
            <button
              onClick={disconnectWallet}
              className="text-white md:px-4 md:py-2 rounded-2xl shadow-2xl bg-[#604CC3] w-full"
            >
              MetaMask Connected
            </button>
          ) : (
            <button
              onClick={onConnect}
              className="text-black md:px-4 md:py-2 rounded-md shadow-2xl w-full"
            >
              Connect MetaMask
            </button>
          )}
        </div>
      )}

      {/* Current Page Display */}
      {/* <div className="absolute top-4 right-4 text-sm lg:text-base text-gray-700">
        <span className="font-bold">Current Page:</span> {selectedPage}
      </div> */}
    </nav>
  );
};

export default Navbar;
