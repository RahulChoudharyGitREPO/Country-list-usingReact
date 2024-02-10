// Countries.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountriesRow from './CountriesRow';
import LoadingIndicator from './LoadingIndicator';
import Pagination from './Pagination';

const API_URL = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries`;

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL, {
          params: {
            page: currentPage,
            limit: 10,
            orderBy: 'asc'
          }
        });
        setCountries(response.data.data);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {loading && <LoadingIndicator />}
      {!loading && (
        <div>
          <h1 data-testid="countries-header">Countries List</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>COUNTRY</th>
                <th>POPULATION</th>
                <th>RANK</th>
              </tr>
            </thead>
            <tbody data-testid="countries-container">
              {countries.map((country) => (
                <CountriesRow
                  key={country.id}
                  country={country.country}
                  population={country.population} 
                  rank ={country.Rank}
                />
              ))}
            </tbody>
          </table>
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            total={totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default Countries;
