import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

   const handleChange = (e)=>{
       setFormData({
           ...formData,
           [e.target.name]: e.target.value
       })
   }

   const handleSubmit = async (e)=>{
       e.preventDefault()
       try{
           const response = await axios.post('http://localhost:5000/api/users/login', formData)
           if(response.status === 200){
               alert('User logged in successfully')
               localStorage.setItem('token', response.data.token);
           }
           console.log(response.data)
       }catch(error){
           console.error(error)
       }
   }

   return(
       <form onSubmit={handleSubmit}>
           <label>
               Email:
               <input
                   type="email"
                   name="email"
                   value={formData.email}
                   onChange={handleChange}
                   placeholder='Enter your email'
                   required
               />
           </label>
           <br />
           <label>
               Password:
               <input
                   type="password"
                   name="password"
                   value={formData.password}
                   onChange={handleChange}
                   placeholder='Enter your password'
                   required
               />
           </label>
           <br />
           <button type="submit">Login</button>
       </form>
   )

}

export default LoginForm