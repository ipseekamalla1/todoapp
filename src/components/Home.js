import React from "react";
import Tasks from "./Tasks";


const Home = (props) => {

    
  return (
   
    <div>
     
        

      {/* To do Work */}
      <h2 className="text-center my-3 pb-3">To Do App</h2>

      <Tasks showAlert={props.showAlert}/>
    </div>
  );
};

export default Home;
