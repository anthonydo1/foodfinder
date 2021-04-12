import React, { useContext } from 'react';
import { SearchContext } from './SearchContext';
import { AnimatedList } from 'react-animated-list';
import RestaurantInfoCard from './RestaurantInfoCard';

function RestaurantList() {
    const [restaurants] = useContext(SearchContext);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-8" >
                    <AnimatedList animation={"zoom"}>
                        {restaurants.map(restaurant => (
                            <RestaurantInfoCard info={restaurant} key={restaurant.url}/>
                        ))}
                    </AnimatedList>
                </div>
                <div className="col-sm-2"></div>
            </div>
        </div>
    );
}

export default RestaurantList;