import React from 'react';
import StarRatings from 'react-star-ratings';

function RestaurantInfoCard(props) {

    const openYelpLink = () => {
        window.open(props.info.url, "_blank");
    };

    return (
        <div className="card bg-dark text-white card-animation mt-4 shadow-sm">
            <div className="card-body" onClick={openYelpLink}>
                <div className="row">
                    <div className="col-sm-auto">
                        <img src={props.info.photos[0]} className="rounded fit-object" width="200px" height="200px" alt=""></img>
                    </div>
                    <div className="col">
                        <div className="row justify-content-between">
                            <h5 className="col-8">{props.info.name}</h5>
                            <p className="col-4 card-text text-muted text-right">
                                {props.info.location.city}, {props.info.location.state}
                            </p>
                        </div>

                        <h6 className="card-subtitle mb-2 text-muted">
                            <StarRatings
                                rating={props.info.rating}
                                starRatedColor="gold"
                                numberOfStars={5}
                                name="rating"
                                starDimension="20px"
                            />
                            ({props.info.review_count})
                        </h6>
                        
                        <p className="card-text text-muted">"{props.info.reviews[0].text}"</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestaurantInfoCard;