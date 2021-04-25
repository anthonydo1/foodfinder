import React from 'react';
import FriendRequests from '../components/FriendRequests';

function Friends() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-5">
                    <FriendRequests />
                </div>
            </div>
        </div>
    );
}

export default Friends;