import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Login.css"
import axios from "axios";

export default function ULoginPage() {
    const initialValues = { employeeId: '', password: '' };
    const [formValue, setFormValue] = useState(initialValues);
    const Navigate = useNavigate();
    const handleChange = (e) => {
        e.preventDefault();
        const { id, value } = e.target;
        setFormValue({ ...formValue, [id]: value });
    }
    const LoginSubmit = async () => {
        if (Validate()) {
            try {
                console.log(formValue);
                const res = await axios.get(`http://localhost:8900/user/login/${formValue.employeeId}/${formValue.password}`);
                setFormValue(initialValues);
                if (res.data !== null && res.data !== '')  {
                     Navigate("/home")
                } else {
                   alert("Enter the valid user!");
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }
    const Validate = () => {
        if (formValue.employeeId === '' || formValue.employeeId === null) {
            alert("Enter the employeeId");
            return false;
        } else if (formValue.password === '' || formValue.password === null) {
            alert("Enter the Password");
            return false;
        }
        else {
            return true;
        }
    }
    return (
        <>
            <div className="panda">
                <div className="ear"></div>
                <div className="face">
                    <div className="eye-shade"></div>
                    <div className="eye-white">
                        <div className="eye-ball"></div>
                    </div>
                    <div className="eye-shade rgt"></div>
                    <div className="eye-white rgt">
                        <div className="eye-ball"></div>
                    </div>
                    <div className="nose"></div>
                    <div className="mouth"></div>
                </div>
                <div className="body"> </div>
                <div className="foot">
                    <div className="finger"></div>
                </div>
                <div className="foot rgt">
                    <div className="finger"></div>
                </div>
            </div>
            <form>
                <div className="hand"></div>
                <div className="hand rgt"></div>
                <h1>Login</h1>
                <div className="form-group">
                    <input type="text" required="required" id="employeeId" value={formValue.employeeId} onChange={handleChange} placeholder="EmployeeId" className="textfield"/>
                </div>
                <div className="form-group">
                    <input id="password" type="password" onChange={handleChange} value={formValue.password} placeholder="Password" className="textfield" />
                </div>
                <button className="btn" type="button" onClick={LoginSubmit}>Login </button>
            </form>
        </>
    )
}