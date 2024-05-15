import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Watchlist from '../components/Watchlist';

export default function Layout() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("NiveshNetra-app")) {
      navigate("/auth/login");
    }
  }, [])
  return (
    <>
        <Navbar/>
        <Watchlist/>
    </>
  )
}
