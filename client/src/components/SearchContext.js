import React, { useState, createContext } from 'react';

export const SearchContext = createContext();

export const SearchProvider = props => {
    const [restaurants, setRestaurants] = useState([]);
    return (
        <SearchContext.Provider value={[restaurants, setRestaurants]}>
            {props.children}
        </SearchContext.Provider>
    );
}