import React, { useRef } from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import './Navbar.css';

function Navbar({ isDarkMode, toggleTheme }) {
  // const [isDarkMode, setIsDarkMode] = useState(false);

  // useEffect(() => {
	// 	const savedTheme = localStorage.getItem('isDarkMode');
	// 	if (savedTheme) {
	// 		setIsDarkMode(JSON.parse(savedTheme));
	// 	}
	// }, []);

  // const toggleTheme = () => {
  //   setIsDarkMode(!isDarkMode);
  //   localStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode));
  // };

  const sideMenu = useRef();

  const openMenu = () => {
    sideMenu.current.style.transform = 'translateX(-16rem)';
  }

  const closeMenu = () => {
    sideMenu.current.style.transform = 'translateX(16rem)';
  }

	return (
		<nav className={`navbar ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="logo">
        <a href="/">
          <Image src={assets.Logo} alt="Logo"/>
        </a>
        <strong className={isDarkMode ? 'dark-mode' : ''}>Adolph's Blog</strong>
      </div>
      <div className="nav-links">
        <Link href={"/"} className={`hidden md:block ${isDarkMode ? 'dark-mode' : ''}`}>Home</Link>
        <Link href={"/pages/Blog"} className={`hidden md:block ${isDarkMode ? 'dark-mode' : ''}`}>Blogs</Link>
        <Link href={"/pages/Updates"} className={`hidden md:block ${isDarkMode ? 'dark-mode' : ''}`}>Web log</Link>
        <div className={`theme-switch ${isDarkMode ? 'switch-on dark-mode' : ''}`} onClick={toggleTheme}>
          <div className={`switch ${isDarkMode ? 'switch-on' : ''}`}></div>
        </div>
        <button className='block md:hidden ml-4' onClick={openMenu}>
          <Image src={assets.SmallMenu} alt="Menu" className='small-screen-menu'/>
        </button>
      </div>
      {/*----------mobile menu----------- */}

      <ul ref={sideMenu} className={`mobile-menu ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className='flex justify-end'>
          <button className='block md:hidden ml-4' onClick={closeMenu}>
            <Image src={assets.Close} alt="Close" className='w-5 cursor-pointer'/>
          </button>
        </div>
        <div className='h-10'></div>
        <li><Link href={"/"} >Home</Link></li>
        <li><Link href={"/pages/Blog"} >Blogs</Link></li>
        <li><Link href={"/pages/Updates"} >Web log</Link></li>
        <li><a href="#Connect">Connect me</a></li>
      </ul>
    </nav>
	);
}

export default Navbar;