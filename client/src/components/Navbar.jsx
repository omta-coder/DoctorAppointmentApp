import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const {token , setToken} = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);

  const logout = ()=>{
    setToken(false)
    localStorage.removeItem('token')
  }
  
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img onClick={()=>navigate("/")} className="w-44 cursor-pointer" src={assets.logo} alt="" />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="h-0.5 bg-primary w-3/5 m-auto border-none outline-none hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="h-0.5 bg-primary w-3/5 m-auto border-none outline-none hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="h-0.5 bg-primary w-3/5 m-auto border-none outline-none hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="h-0.5 bg-primary w-3/5 m-auto border-none outline-none hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-apointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white py-3 px-8 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}
        <img onClick={()=>setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="" />
        {/* ---Mebile Menu--- */}
        <div className={`${showMenu ? "fixed w-full" : "h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img className="w-7" onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className="flex flex-col items-start px-5 mt-5 gap-2 telg font-medium">
            <NavLink  onClick={()=>setShowMenu(false)} to='/'><p className='px-4  inline-block w-[94vw] sm:w-auto py-2 border border-gray-300  rounded transition-all cursor-pointer'>HOME</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/doctors'><p className='px-4  inline-block w-[94vw] sm:w-auto py-2 border border-gray-300  rounded transition-all cursor-pointer'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/about'><p className='px-4  inline-block w-[94vw] sm:w-auto py-2 border border-gray-300  rounded transition-all cursor-pointer'>ABOUT</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/contact'><p className='px-4  inline-block w-[94vw] sm:w-auto py-2 border border-gray-300  rounded transition-all cursor-pointer'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
