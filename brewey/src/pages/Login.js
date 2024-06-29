import React from 'react'
import {Form, Input} from "antd"
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
import {useDispatch} from "react-redux"
import toast from "react-hot-toast"
import {showLoading,hideLoading} from "../redux/alertsSlice"

const Login = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
 
    const onFinish=async (values)=>{
      try{
  
        dispatch(showLoading())
        const response=await axios.post("/api/user/login",values);
     
        if(response.data.success){
          dispatch(hideLoading())
         
          
          toast.success(response.data.message);
         
          localStorage.setItem("token",response.data.data); 
          navigate("/");
         
        }else{
          dispatch(hideLoading())
          toast.error(response.data.message);
  
  
        }
  
      }
      catch(error){
        dispatch(hideLoading())
        toast.error("Something went wrong")
  
      }
  
      
  
    }

  
  return (
    <div>
       <div className='main-con'>
      <div className='card p-2'>
        <h1 className="card-title">Welcome Back</h1>

        <Form layout='vertical' onFinish={onFinish}>
          

          <Form.Item label="Email" name="email">
            <Input placeholder="Email"/>
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input placeholder="Enter password" type="password"/>
          </Form.Item>


          <button className="class-button my-2" type="submit">Login</button>
          <Link to="/register" className="link-element my-2" type="submit">Click here to Register</Link>
        



        </Form>

      </div>
     
    </div>
    </div>
  )
}

export default Login
