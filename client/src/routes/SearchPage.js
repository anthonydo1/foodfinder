import React from 'react';
import RestaurantList from '../components/RestaurantList';
import Search from '../components/Search';
import { SearchProvider } from '../components/SearchContext';

function SearchPage() {
    return (
        <SearchProvider>
            <Search />
            <RestaurantList />
        </SearchProvider>
    );
}

export default SearchPage;