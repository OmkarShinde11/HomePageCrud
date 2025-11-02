import React from 'react'
import { useAuthUser } from '../feature/users/useAuthUser';
import { NavLink, useLocation } from 'react-router-dom';

export default function Header() {
  const {isLoading,authUser={},isError}=useAuthUser();
  console.log(authUser);
  const location = useLocation();
  // check if the user is inside CrudLayout routes
  const isCrudPage =
    location.pathname.startsWith("/banners") ||
    location.pathname.startsWith("/keyDifferenciators") ||
    location.pathname.startsWith("/core-usp") ||
    location.pathname.startsWith("/awards") ||
    location.pathname.startsWith("/insurance-partner") ||
    location.pathname.startsWith("/faq") ||
    location.pathname.startsWith("/experties") ||
    location.pathname.startsWith("/createAdmin");
  return (
    <header className='w-full bg-neutral-900 bg-opacity-95 py-4 px-6 flex justify-between items-center'>
        <div className="flex items-center space-x-3">
            <img src='src/assets/dental-logo-design-vector-templatecreative-dentist-logo-dental-clinic-vector-logo_607588-10199.jpg' className='w-10 rounded-full bg-amber-100'/>
            <span className='text-2xl text-amber-100 font-semibold'>Dummy Dentist Website</span>
        </div>
        <div className='flex gap-9 items-center'>
        {authUser?.role === "admin" && !isError && (
          <>
            {isCrudPage ? (
              <NavLink
                to="/home"
                className="px-3 py-1 text-xl text-amber-100 font-semibold border border-amber-100 rounded-lg"
              >
                Go Home
              </NavLink>
            ) : (
              <NavLink
                to="/banners"
                className="px-3 py-1 text-xl text-amber-100 font-semibold border border-amber-100 rounded-lg"
              >
                Admin Dashboard
              </NavLink>
            )}
          </>
        )}
        {isError && (
          <NavLink to="/login" className="px-3 py-1 text-xl text-amber-100 font-semibold border border-amber-100 rounded-lg">LogIn
          </NavLink>  
        )}
        {!isError &&
        <p className='text-xl text-amber-100 font-semibold'>{authUser?.name}</p>
        }
        </div>
    </header>
  )
}
