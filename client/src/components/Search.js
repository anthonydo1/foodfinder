import React, { useState, useContext } from 'react';
import { SearchContext } from './SearchContext';

function Search() {
    const [restaurants, setRestaurants] = useContext(SearchContext);
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");

    const searchRestaurant = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token");
        
        const data = 
            await fetch("http://localhost:4000/search", {
                method: 'POST',
                body: JSON.stringify({searchQuery: query, location: location}),
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });
            
        data.json()
            .then(json => setRestaurants(json.data.search.business))
            .catch(e => console.log(e));
    };

    return (
        <header className="masthead text-white text-center">
            <div className="overlay" />
            <div className="container">
                <div className="row">
                    <div className="col-xl-9 mx-auto">
                        <h1 className="mb-5">Food Finder</h1>
                    </div>
                    <div className="col-md-10 col-lg-10 mx-auto">
                        <form>
                            <div className="form-row">
                                <div className="col-12 col-md-7 mb-2 mb-md-0">
                                    <input onChange={e => setQuery(e.target.value)} type="text" className="form-control form-control-lg" placeholder="Find a restaurant..." />
                                </div>
                                <div className="col-12 col-md-3 mb-2 mb-md-0">
                                    <input onChange={e => setLocation(e.target.value)} type="text" className="form-control form-control-lg" placeholder="Location" />
                                </div>
                                <div className="col-12 col-md-2">
                                    <button onClick={searchRestaurant} className="btn btn-block btn-lg btn-primary">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Search;