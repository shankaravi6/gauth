import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar'
import { Alert } from '@mui/material'

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
          "https://gauth-server-u4ww.onrender.com/send",
          sendData
        );
        //console.log(response);
        if(response.data == "Email Send Successfully!"){
        var newState = { vertical: 'top', horizontal: 'center' }
        setState({ ...newState, openAl: true })
        }
      } catch (error) {
        console.log(error)
      }
    } 

    const logout = () => {
        localStorage.clear();
        navigate("/");
    } 

    const [state, setState] = useState({
      openAl: false,
      vertical: 'top',
      horizontal: 'center'
    })
    const { vertical, horizontal, openAl } = state
  
    const handleAlClose = () => {
      setState({ ...state, openAl: false })
    }
  

  return (
    <div className='home'>
      <div className='card'>
        <img src={userData?.picture} width="100%" className='img-box' />
        <h1>{userData?.given_name} {userData?.family_name}</h1>
        <h2 style={{color:"gray"}}>{userData?.email}</h2>
        <p style={{width:"auto", textAlign:"center"}}><span style={{fontFamily:"unset !important"}}>&#9432;</span> These details are fetched from Google authentication, your data is confident, and we don't leak your data. If you need more details, click the below button we send them through your mail</p>
        <button type='button' className='btn' onClick={() => handleSubmit()}>Get Mail</button>
        <p className='logout' onClick={logout}>Logout</p>
      </div>
      <Snackbar
        variant='filled'
        anchorOrigin={{ vertical, horizontal }}
        open={openAl}
        autoHideDuration={2000}
        onClose={handleAlClose}
      >
        <Alert onClose={handleAlClose} severity='primary' variant='filled' sx={{ width: '100%' }}>
          Email Sent successfully!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Home
