import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import logo from "../../images/common/logo.png";
import '../../css/component/login.scss';

function Login() {
  const {
    auth: { authed },
    setAuth,
  } = useAuth();
  const axios = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [spinner,setSpinner]  = useState({ cor: false , pos:false});
  const [formError,setFormError]  = useState(null);

  useEffect(() => {
    if (authed) {
      navigate("/routing", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const validateForm = () => {
    if(formData.username ===''){
      setFormError('UserName cannot be empty');
      return;
    }else if(formData.password ===''){
      setFormError('PassWord cannot be empty');
      return;
    }
    return true;
  }
  
  const Login = async (e) => {
    e.preventDefault();
    let loginType  = e.target.value;
    setSpinner((prev) => {
       return {...prev ,[loginType] : true }
    });
    
    if(!validateForm()){
      setSpinner((prev) => {
        return {...prev ,[loginType] : false }
      });
      return;
    }
    let response;
    try{
       response = await axios.post("auth/login/", formData);
    }catch(error){
      response = {
        data:{
          error:error.message
        }
      }
      console.log(error);
    }
    
    
    if(!response?.data?.success){
      setSpinner((prev) => {
        return {...prev ,[loginType] : false }
      });
      setFormError(response.data.error);
      return;
    }

    let  {user_name , auth_key }   = response.data.data.account_info;
    let  { userID , username }   = response.data.data;
    let authData = {
      authed: true,
      X_AUTH_KEY: auth_key,
      X_AGENT_ID: userID,
      X_USERNAME: user_name,
      X_API_SOURCE: "WEB",
      userID: userID,
      userName:username
    };
    
    sessionStorage.setItem("authData", JSON.stringify(authData));
    setAuth(authData);
    let urlString  = (loginType === 'cor') ? '/routing' : '/pos';
    
    const goto = location?.state?.from ? location?.state?.from : urlString;
    navigate(goto, { replace: true });
    
  };

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center loginMainWrapper">
      <img className="mb-2" src={logo} alt="hiecor" />
      <div className="loginFormContianer">
        <div className="secureLogin">
          <h3>Secure Login</h3>
        </div>
        <div className="p-3">
          <div className="formError">{formError}</div>
          <form>
            <div className="mb-3">
              <label htmlFor="txtUsername" className="form-label">
                Username <span style={{color :'red'}}>*</span>:
              </label>
              <input
                type="text"
                className="form-control"
                id="txtUsername"
                autoComplete="off"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pwdPassword" className="form-label">
                Password <span style={{color :'red'}}>*</span>:
              </label>
              <input
                type="password"
                className="form-control"
                id="pwdPassword"
                autoComplete="off"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div id="emailHelp" className="form-text mb-2 text-center">
              By click the login button to enter the members website you agree
              to abide by the following <Link to="">term of use</Link>
            </div>
            <div className="loginButtons clearfix">
              <button
                type="button"
                className="btn btn-primary btn-lg float-start btnCorLogin"
                onClick={Login}
                disabled={spinner.cor}
                value="cor"
              >
                COR LOGIN{" "}
                <span
                  className={spinner.cor ? 'spinner-border spinner-border-sm' : ''}
                  role="status"
                  aria-hidden="true"
                  
                ></span>
              </button>

              <button
                type="button"
                className="btn btn-success btn-lg float-end btnPosLogin"
                onClick={Login}
                disabled={spinner.pos}
                value="pos"
              >
                POS LOGIN{" "}
                <span
                  className={spinner.pos ? 'spinner-border spinner-border-sm' : ''}
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
            </div>
            <div className="mt-3 text-center">
              <button
                type="button"
                className="btn btn-light btn-sm"
                disabled={false}
              >
                Reset Password{" "}
                
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
