import React from 'react';
import ReactRoundedImage from 'react-rounded-image';

function FriendRequest(props) {

    const token = localStorage.getItem("token");

    const response = (res) => {
        fetch("http://localhost:4000/friends/create", {
            method: 'POST',
            body: JSON.stringify({ decision: res, destination: props.email }),
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });
    };

    return (
        <div className="card bg-dark mt-2">
            <div className="card-body">
                <div className="row">
                    <ReactRoundedImage
                        image="https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
                        roundedColor="#64b5f6"
                        imageWidth="100"
                        imageHeight="100"
                        roundedSize="6"
                        hoverColor="#bbdefb"
                    />
                    <div className="col text-white">
                        <h4 className="card-title">{props.first} {props.last}</h4>
                        <h6 className="card-subtitle mb-2 text-muted">{props.username}</h6>
                        <button onClick={() => {response(true)}} type="button" className="btn btn-primary mr-2">Confirm</button>
                        <button onClick={() => {response(false)}} type="button" className="btn btn-secondary">Delete</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default FriendRequest;