import React, { useState } from 'react';
import axios from 'axios';
import BreweryItem from '../components/BreweryItem';
import { setSearchResults } from "../redux/breweriesSlice" 
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
    const dispatch=useDispatch();
    
    const [searchBy, setSearchBy] = useState('city');
    const [searchTerm, setSearchTerm] = useState('');
  

    const results = useSelector(state => state.breweries.results);

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`/api/breweries`, {
                params: {
                    [searchBy === 'city' ? 'by_city' : searchBy === 'name' ? 'by_name' : 'by_type']: searchTerm,
            
                    per_page: 3 
                }
            });
            console.log(response.data);
            dispatch(setSearchResults({ results: response.data }));
         
        } catch (error) {
            console.error('Error fetching breweries:', error);
        }
    };

    return (
        <div className="con">
            <h1 className="mb-4">Brewery Search</h1>

            <form onSubmit={handleSearch}>
                <div className="form-group">
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="searchBy"
                                value="city"
                                checked={searchBy === 'city'}
                                onChange={(e) => setSearchBy(e.target.value)}
                            />
                            By City
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="searchBy"
                                value="name"
                                checked={searchBy === 'name'}
                                onChange={(e) => setSearchBy(e.target.value)}
                            />
                            By Name
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="searchBy"
                                value="type"
                                checked={searchBy === 'type'}
                                onChange={(e) => setSearchBy(e.target.value)}
                            />
                            By Type
                        </label>
                    </div>
                </div>

                <div className="form-group search-bar-group">
                    <input
                        type="text"
                        className="form-control search-bar"
                        placeholder={`Enter ${searchBy.replace('_', ' ')}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                      <button type="submit" className="btn btn-primary class-button">
                        Search
                    </button>
                  
                </div>
            </form>

            <div className="mt-4">
                {results.length > 0 ? (
                    <ul className="list-group results">
                        {results.map((brewery) => (
                            <BreweryItem brewery={brewery} key={brewery.id} />
                        ))}
                    </ul>
                ) : (
                    <p className='results-text'>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
