import React, { useEffect, useState } from 'react';
import FriendRequest from './FriendRequest';
import { AnimatedList } from 'react-animated-list';

function FriendRequests() {
    const token = localStorage.getItem("token");
    const [friends, setFriends] = useState([]);

    useEffect( () => {
        async function fetchData() {
            const data = 
            await fetch(`http://localhost:4000/friends`, {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });

            data.json()
                .then(json => {
                    setFriends(json);
                    console.log(json);
                })
                .catch(e => console.log(e));
        };
        fetchData();
    }, []);

    const friendRequest = (request) => (
        <FriendRequest
            first={request.first_name}
            last={request.last_name}
            username={request.username}
            email={request.email}
            key={request.username} />
    );

    return (
        <div className="container">
            <AnimatedList animation={"zoom"}>
                { friends.map(request => friendRequest(request)) }
            </AnimatedList>
        </div>
    );
}

export default FriendRequests;