import React, { useContext } from "react";
import Tasks from "./Tasks";


const Home = () => {
    
  return (
    <div>
        

      {/* To do Work */}
      <h2 className="text-center my-3 pb-3">To Do App</h2>

      <Tasks/>
    </div>
  );
};

export default Home;
