import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

export default function Home() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem("NiveshNetra-app")) {
  //     navigate("/auth/login");
  //   }
  // }, [])
  return (
    <>
        <Navbar/>
        <SearchBar/>
    </>
  )
}
