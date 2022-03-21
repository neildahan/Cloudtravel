import React, { useEffect, useState } from "react";
import "./vacation.css";
import SearchBar from "material-ui-search-bar";
import VacationCard from "./VacationCard";
import Header from "./Header";
import Loader from "react-loader-spinner";

export default function VacationList() {
  const [vacationsArr, setVacationsArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("http://localhost:1000/vacations", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setVacationsArr(data));
      setTimeout(() => {setLoading((loading) => !loading)}
      , 500);
  }, []);

  if (loading) {
    return  <div className='spinner'>
    <Loader type="ThreeDots" color="#303f9f" height="100" width="100" />
</div>}
  
else {
    return( 
    <div className="main-list">
      <Header setVacationsArr={setVacationsArr} />
      <div className="search">
        
        <h1 className="search-headline">Discover New Destinations</h1>
       
        <SearchBar
          value={searchTerm}
          onChange={(event) => setSearchTerm(event)}
        />
      </div>
      <div className="fav-headline">
        <h3>Vacations</h3>
      </div>
      <div className="vac-list">
        {vacationsArr
          .filter((vac) =>
            vac.destination.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((vacation) => (
            <VacationCard
              setVacationsArr={setVacationsArr}
              vacation={vacation}
            />
          ))}
      </div>
    </div>
  );
}}
