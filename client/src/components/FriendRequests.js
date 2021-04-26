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

    return (
        <div className="container">
            <AnimatedList animation={"zoom"}>
                {friends.map(friend => (
                    <FriendRequest
                        first={friend.first_name}
                        last={friend.last_name}
                        username={friend.username}
                        email={friend.email}
                        key={friend.username} />
                ))}
            </AnimatedList>
        </div>
    );
}

export default FriendRequests;