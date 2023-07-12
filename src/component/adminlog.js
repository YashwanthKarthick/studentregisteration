import React from 'react'
import "./formsignup.css";

const formsignup = () => {
    const handlechange = (e) => {
        console.log(e.target.value, e.target.name);
    }
    const handlesubmit = (event)=>{
        event.preventDefault()
    }
    return (
        <div className='container' >
            <form className='form' onSubmit={handlesubmit}>
                <h1>ADMIN LOGIN :</h1>
                <div className='form-inputs'>
                    <label htmlFor="username" className='form-label'>
                        Admin name
                    </label>
                    <input id="username" type='text' name='username' className='form-input' placeholder='Enter your user name' onChange={handlechange} />
                </div>
                <div className='form-inputs'>
                    <label htmlFor='password' className='form-label'>
                        Password
                    </label>
                    <input id='password' type='password' name='password' className='form-input' placeholder='Enter your password' onChange={handlechange} />
                </div>
                <div ><button className='form-button' type='submit'>Submit</button></div>
            </form>
        </div>
    )
}

export default formsignup