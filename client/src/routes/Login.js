import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login(props) {
    const history = useHistory();
    const redirect = () => history.push("/");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    };

    async function handleSubmit(event) {
        event.preventDefault();

        await fetch("http://localhost:4000/login", {
            method: 'POST',
            body: JSON.stringify({email: email, password: password}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            if (res.status === 200) {
                res.json().then((data) => {
                    localStorage.setItem("token", data.accessToken);
                    props.setLoggedIn(true);
                    redirect();
                })
            };
        });      
    };

    return (
        <section className="login-block">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <form className="md-float-material form-material">
                            <div className="auth-box card login-card">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3 className="text-center heading">Login</h3>
                                        </div>
                                    </div>
                                    <div className="form-group form-primary"> 
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Email" 
                                            onChange={e => setEmail(e.target.value)}    
                                        /> 
                                    </div>
                                    <div className="form-group form-primary"> 
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            placeholder="Password"
                                            onChange={e => setPassword(e.target.value)}
                                        /> 
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12"> 
                                            <input 
                                                type="submit" 
                                                className="btn btn-primary btn-md btn-block waves-effect text-center m-b-20" 
                                                disabled={!validateForm()}
                                                onClick={handleSubmit}
                                            />
                                        </div>
                                    </div>
                                    <div className="or-container">
                                        <div className="line-separator" />
                                        <div className="or-label">or</div>
                                        <div className="line-separator" />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12"> 
                                            <a 
                                                className="btn btn-lg btn-google btn-block text-uppercase btn-outline" 
                                                href="/signup">
                                                <img src="https://img.icons8.com/color/16/000000/google-logo.png"/> 
                                                Login Using Google
                                            </a> 
                                        </div>
                                    </div> <br />
                                    <p className="text-inverse text-center">Don't have an account? <a href="/signup">Signup</a></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;