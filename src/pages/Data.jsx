import React, { useEffect, useState } from "react";

function Data() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState(false);
  // Fetch data from API
  // fetch('https://jsonplaceholder.typicode.com/posts')
  //  .then(response => response.json())
  //  .then(json => setData(json))
  //  .catch(error => console.error('Error:', error));
  useEffect(() => {
    async function fetchdata() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, []);

// search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // sort functionality
  const handleSort = () => {
    setSort(!sort);
    setData(data.sort((a, b) => (sort? a.title.localeCompare(b.title) : b.title.localeCompare(a.title))));
  };

  console.log(data);
  if (!data.length > 0) {
    return <h1>Loading...</h1>; // Show loading message until data is fetched and ready.  // If there's no data, display a message.  // For a real-world application, you might want to replace this with a loading spinner or a more user-friendly message.  // Also, consider adding error handling for failed API requests.  // You might want to add pagination or infinite scrolling for handling large amounts of data.  // You might want to add sorting or filtering functionality.  // You might want to add a search bar or filter options.  // You might want to add a button to refresh the data.  // You might want to add a button to view more data.  // You might want to add a button to view less data.  // You might want to add a button to view the data in a different format.  // You might want to add a button to view the data in a different language.  // You might want to
  }
  return (
    <>
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        />
        <button onClick={handleSort}>Sort by Title</button>
        
    </div>
      <div
       id="container"
      >
        {data.map((ele) => (
          <div id="card" key={ele.id}>
            <h4>{ele.title}</h4>
            <p>{ele.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Data;
