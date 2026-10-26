import React, { useState, useEffect } from 'react'
import { Sidebar } from 'flowbite-react'
import { useLocation } from 'react-router-dom'
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

function DashSidebar({isSideBarOpen, setIsSideBarOpen}) {
  const location = useLocation()
  const [tab, setTab] = useState("")
  const dispatch = useDispatch()
 
  const menuItems = [
    { name: 'Dashboard', tabKey: 'dashboard', icon: <HiChartPie />, href: '/dashboard?tab=dashboard' },
    { name: 'Complaints', tabKey: 'complaints', icon: <HiInbox />, href: '/dashboard?tab=complaints' },
    { name: 'View Complaints', tabKey: 'viewcomplaints', icon: <HiInbox />, href: '/dashboard?tab=viewcomplaints' },
    { name: 'Feedback', tabKey: '', icon: <HiUser />, href: 'https://forms.gle/NTo64xXcaSTKpaks7', target: '_blank' },
    { name: 'Profile', tabKey: 'profile', icon: <HiUser />, href: '/dashboard?tab=profile' },
  ];
 
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    //console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/student/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      
      {isSideBarOpen && (
      <aside className="w-[100%] h-screen bg-sidebar  flex flex-col text-sidebartext">
        {/* Logo */}
        <div className="flex items-center px-4 py-[1rem] space-x-3 border-b border-blue-500">
          <img src="/SKCET.jpg" alt="SKCET Institute logo" className="h-8 w-auto max-w-32 object-contain" />
          <span className=" text-md md:text-lg font-bold">SKCET Institute Hostel</span>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="space-y-2">
            {menuItems.map(({ name, tabKey, icon, href, target }) => (
              <li key={name}>
                <a
                  href={href}
                  target={target}
                  rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                  className={`flex items-center p-2 rounded-lg transition-all hover:bg-blue-400 ${tab === tabKey ? 'bg-blue-500' : ''
                    }`}
                >
                  <span className="text-sm md:text-xl mr-3">{icon}</span>
                  <span className='text-sm md:text-md'>{name}</span>
                </a>
              </li>
            ))}

            {/* Signout */}
            <li>
              <button
                onClick={handleSignout}
                className="w-full text-left flex items-center p-2 rounded-lg transition-all hover:bg-red-600"
              >
                <HiShoppingBag className="text-xl mr-3" />
                <span>Signout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      )}
    </>
  );
}

export default DashSidebar
