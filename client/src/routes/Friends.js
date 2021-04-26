import React, { useState } from 'react';
import FriendRequests from '../components/FriendRequests';
import SearchFriendCard from '../components/SearchFriendCard';
import { AnimatedList } from 'react-animated-list';

function Friends() {
    const [query, setQuery] = useState("");
    const [searchData, setSearchData] = useState([]);

    const searchFriend = async (e) => {
        e.preventDefault()
        if (query === "" || query == null || query == undefined) return;

        const token = localStorage.getItem("token");
        
        const data = 
            await fetch(`http://localhost:4000/search/friends/${query}`, {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });

        data.json()
            .then(json => {
                let jsonParsed = JSON.parse(json);
                if (jsonParsed == null) jsonParsed = [];
                setSearchData(jsonParsed);
            })
            .catch(e => console.log(e));
    };
    
    return (
        <div className="container">
            <div className="row">

                <div className="col-5">
                    <h2 className="text-white text-center mt-4 mb-4">Friend Requests</h2>
                    <FriendRequests />
                </div>

                <div className="col-7">
                    <div className="container mt-4 mb-4">
                        <h2 className="text-white text-center mb-5">Search for people</h2>
                        <form>
                            <div className="form-row">
                                <div className="col-10">
                                    <input onChange={e => setQuery(e.target.value)} 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        placeholder="Enter username or email" />
                                </div>
                                <div className="col-2">
                                    <button onClick={searchFriend} className="btn btn-lg btn-primary">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                        <a className="text-white">{searchData.length} search results found</a>
                        <AnimatedList animation={"zoom"}>
                            {searchData.map(friend => (
                                <SearchFriendCard 
                                    first={friend.first_name}
                                    last={friend.last_name}
                                    username={friend.username} 
                                    email={friend.email}
                                    key={friend.username}>
                                </SearchFriendCard>
                            ))}
                        </AnimatedList>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Friends;