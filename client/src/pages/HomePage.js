import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const HomePage = () => {
  useEffect(() => {
    axios.get(`${serverUrl}/album`, { withCredentials: true }).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <section>
      <div>
        <h1>Welcome to Kpopular!</h1>
        <p>Your go to source for all things related to Kpop Albums.</p>
      </div>
    </section>
  );
};

export default HomePage;
