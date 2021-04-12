import React, { useState, useContext } from 'react';

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0 && password === repeat;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const data = 
            await fetch("http://localhost:4000/signup", {
                method: 'POST',
                body: JSON.stringify({email: email, password: password}),
                headers: {'Content-Type': 'application/json'}
            });
        console.log(data.json());
    }

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