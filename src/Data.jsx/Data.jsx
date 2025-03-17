import React, { useEffect, useState } from "react";
import "./Data.css"; // Import CSS file

function Data() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByTitle, setSortByTitle] = useState(null);
  const [sortByUserId, setSortByUserId] = useState(null);
  const [userIdFilter, setUserIdFilter] = useState("");

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // 🔍 Search by title
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // 🔄 Sort by title
  const handleSortByTitle = () => {
    const sortedData = [...data].sort((a, b) =>
      sortByTitle ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)
    );
    setData(sortedData);
    setSortByTitle(!sortByTitle);
  };

  // 🔄 Sort by userId
  const handleSortByUserId = () => {
    const sortedData = [...data].sort((a, b) =>
      sortByUserId ? b.userId - a.userId : a.userId - b.userId
    );
    setData(sortedData);
    setSortByUserId(!sortByUserId);
  };

  // 🔍 Filter by userId
  const handleFilterByUserId = (e) => {
    setUserIdFilter(e.target.value);
  };

  // Apply search and filter
  const filteredData = data.filter(
    (ele) =>
      ele.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (userIdFilter ? ele.userId.toString() === userIdFilter : true)
  );

  return (
    <div className="container">
      <h2>Data Management</h2>
      
      <div className="controls">
        <input
          type="text"
          placeholder="Search by Title..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />

        <input
          type="number"
          placeholder="Filter by User ID"
          value={userIdFilter}
          onChange={handleFilterByUserId}
          className="filter-input"
        />

        <button onClick={handleSortByTitle} className="btn">
          Sort by Title {sortByTitle ? "↓" : "↑"}
        </button>

        <button onClick={handleSortByUserId} className="btn">
          Sort by User ID {sortByUserId ? "↓" : "↑"}
        </button>
      </div>

      <div className="card-container">
        {filteredData.length > 0 ? (
          filteredData.map((ele) => (
            <div className="card" key={ele.id}>
              <h4>{ele.title}</h4>
              <p>{ele.body}</p>
              <span>User ID: {ele.userId}</span>
            </div>
          ))
        ) : (
          <h3>No data found...</h3>
        )}
      </div>
    </div>
  );
}

export default Data;
