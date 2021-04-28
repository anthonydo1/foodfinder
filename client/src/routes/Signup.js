import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Signup() {
    const history = useHistory();
    const redirect = () => history.push("/login");

    const [validUsername, setValidUsername] = useState(true);
    const [validEmail, setValidEmail] = useState(true);

    const [username, setUsername] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0 && password === repeat;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("submitted");
        const data = 
            await fetch("http://localhost:4000/signup", {
                method: 'POST',
                body: JSON.stringify({username: username, first: first, last: last, email: email, password: password}),
                headers: {'Content-Type': 'application/json'}
            }).then(res => {
                if (res.status === 201) {
                    redirect();
                } else if (res.status === 501) {
                    console.log("email taken");
                    setValidEmail(false);
                    setValidUsername(true);
                } else {
                    setValidEmail(true);
                    setValidUsername(false);
                }
            });
    }

    const InvalidUsername = () => {
        return (
            <div className="text-danger">
                Sorry, that username's taken. Try another?
            </div>
        );
    };

    const InvalidEmail = () => {
        return (
            <div className="text-danger">
                Sorry, that email's taken. Try another?
            </div>
        );
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
                                            <h3 className="text-center heading">Create an Account</h3>
                                        </div>
                                    </div>
                                    <div className="form-group form-primary"> 
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Username" 
                                            onChange={e => setUsername(e.target.value)}    
                                        /> 
                                        { validUsername ? null : <InvalidUsername />}
                                    </div>
                                    <div className="form-group form-primary"> 
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="First name" 
                                            onChange={e => setFirst(e.target.value)}    
                                        /> 
                                    </div>
                                    <div className="form-group form-primary"> 
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Last name" 
                                            onChange={e => setLast(e.target.value)}    
                                        /> 
                                    </div>
                                    <div className="form-group form-primary"> 
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Email" 
                                            onChange={e => setEmail(e.target.value)}     
                                        /> 
                                        { validEmail ? null : <InvalidEmail /> }
                                    </div>
                                    <div className="form-group form-primary"> 
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            placeholder="Password"
                                            onChange={e => setPassword(e.target.value)}
                                        /> 
                                    </div>
                                    <div className="form-group form-primary"> 
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            placeholder="Repeat password"
                                            onChange={e => setRepeat(e.target.value)}
                                        /> 
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12"> 
                                            <input 
                                                type="submit" 
                                                className="btn btn-primary btn-md btn-block waves-effect text-center m-b-20" 
                                                onClick={handleSubmit}
                                                disabled={!validateForm()}
                                            />
                                        </div>
                                    </div>
                                    <div className="or-container">
                                        <div className="line-separator" />
                                        <div className="or-label">or</div>
                                        <div className="line-separator" />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12"> <a className="btn btn-lg btn-google btn-block text-uppercase btn-outline" href="/signup"><img src="https://img.icons8.com/color/16/000000/google-logo.png" /> Signup Using Google</a> </div>
                                    </div> <br />
                                    <p className="text-inverse text-center">Already have an account? <a href="/login">Login</a></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup;