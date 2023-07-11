import React from 'react'
import "./formsignup.css";

const formsignup = () => {
  return (
    <div  className='container' >
        <form>
        <h1>STUDENT LOGIN :</h1>
        <div className='form-inputs'>
            <label htmlFor="username" className='form-label'>
                Username
            </label>
            <input id="username" type='text' name='username' className='form-input' placeholder='Enter your user name'/>
        </div>
        <div className='form-inputs'>
            <label htmlFor='rollno' className='form-label'>
                Roll Number
            </label>
            <input id='rollno' type='text' name='rollno' className='form-input' placeholder='Enter your roll no'/>
        </div>
        <div className='form-inputs'>
            <label htmlFor='password' className='form-label'>
                Password
            </label>
            <input id='password' type='password' name='password' className='form-input' placeholder='Enter your password'/>
        </div>
        <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default formsignup