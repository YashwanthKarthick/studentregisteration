import React from 'react';
import Dashboard from '../Components/Dashboard';
import '../App.css';
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  return (
    <div>
      <Dashboard>
          <h1 className='curvedtexts'>Welcome</h1>
          <div className="srchbtncon">
          <input
            type="text"
            placeholder="search ....."
            className="pinkimps"
          />
          <button className="srchbtn">
            <SearchIcon />
          </button>
        </div>

      </Dashboard>
    </div>
  );
};

export default Home;
