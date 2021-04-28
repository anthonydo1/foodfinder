import React, { useState } from 'react';
import ReactRoundedImage from 'react-rounded-image';

function SearchFriendCard(props) {

    const token = localStorage.getItem("token");
    const [sent, setSent] = useState(false);

    const sendFriendRequest = async () => {
        if (sent) return;
        const data = 
            await fetch("http://localhost:4000/friends", {
                method: 'POST',
                body: JSON.stringify({ destination: props.email }),
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });
        setSent(true);
    };

    return (
        <div className="shadow card mt-2">
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
                    <div className="col">
                        <h4 className="card-title">{props.first} {props.last}</h4>
                        <h6 className="card-subtitle mb-2 text-muted">{props.username}</h6>
                        <button 
                            onClick={sendFriendRequest} 
                            type="button" 
                            className={sent ? "btn mr-2 btn-success" : "btn mr-2 btn-primary"}>
                            {sent ? "Sent" : "Send Friend Request"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SearchFriendCard;