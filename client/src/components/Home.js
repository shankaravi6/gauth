import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Home = () => {

    const data = localStorage.getItem('userdet');
    var userData = JSON.parse(data);

    const navigate = useNavigate();

    useEffect(() => {
        if(userData === null || userData === undefined || userData === "") {
            navigate("/");
        }
    },[])


    const handleSubmit = async () => {

      const email = userData?.email;
      const sendData = {email}

      try {
        const response = await axios.post(
          // "http://localhost:7878/send",
          "https://gauth-server-u4ww.onrender.com",
          sendData
        );
        console.log(response);
      } catch (error) {
        console.log(error)
      }
    } 

    const logout = () => {
        localStorage.clear();
        navigate("/");
    } 

  return (
    <div className='home'>
      <div className='card'>
        <img src={userData?.picture} width="100%" className='img-box' />
        <h1>{userData?.given_name} {userData?.family_name}</h1>
        <h2 style={{color:"gray"}}>{userData?.email}</h2>
        <p style={{width:"auto", textAlign:"center"}}><span style={{fontFamily:"unset !important"}}>&#9432;</span> These details are fetched from Google authentication, your data is confident, and we don't leak your data. If you need more details, click the below button we send them through your mail</p>
        <button type='button' className='btn' onClick={() => handleSubmit()}>Got it</button>
        <p className='logout' onClick={logout}>Logout</p>
      </div>
    </div>
  )
}

export default Home
