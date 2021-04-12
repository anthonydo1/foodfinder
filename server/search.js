import fetch from 'node-fetch';

const API_KEY = process.env.YELP_API_KEY;

export async function search(req, res) {
    console.log(req.body);
    const query = `
        {
            search(term: "${req.body.searchQuery}",
                    location: "${req.body.location}",
                    limit: 10) {
                total
                business {
                    id
                    name
                    url
                    photos
                    rating
                    review_count
                    reviews {
                        text
                    }
                    location {
                        city
                        state
                    }
                }
            }
        }
    `;

    fetch('https://api.yelp.com/v3/graphql', {
        method: 'POST',
        body: query,
        headers: { 
            'Content-Type': 'application/graphql',
            'Authorization': `Bearer ${API_KEY}` 
        }
    })  
        .then(resp => resp.json()
        .then(json => {
            console.log(json);
            console.log(json.data.search.business);
            res.json(json);
        })).catch(e => res.status(401));
}