import React, { useEffect, useState } from 'react';
import { AnimatedList } from 'react-animated-list';
import ReactRoundedImage from 'react-rounded-image';
import FriendCard from '../components/FriendCard';

function FriendList(props) {
    const [friends, setFriends] = useState([]);
    const token = localStorage.getItem("token");

    useEffect( () => {
        async function fetchData() {
            const data = 
            await fetch(`http://localhost:4000/friendlist`, {
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

    const friendCard = (friend) => (
        <div className="shadow card mb-2 mr-4">
            <div className="card-body">
                <div className="row">
                    <div className="col text-center">
                        <ReactRoundedImage
                            image="https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
                            roundedColor="#64b5f6"
                            imageWidth="100"
                            imageHeight="100"
                            roundedSize="6"
                            hoverColor="#bbdefb"
                        />
                        <h4 className="card-title">{friend.first_name} {friend.last_name}</h4>
                        <h6 className="card-subtitle mb-2 text-muted">{friend.username}</h6>
                    </div>
                </div>

            </div>
        </div>
    );

    return (
        <div className="container">
            <div className="row">
                <AnimatedList animation={"zoom"}>
                    {friends.map(friend =>
                        <FriendCard 
                            first_name={friend.first_name}
                            last_name={friend.last_name}
                            username={friend.username}
                            key={friend.username}
                        />
                    )}
                </AnimatedList>
            </div>
        </div>
    );
}

export default FriendList;