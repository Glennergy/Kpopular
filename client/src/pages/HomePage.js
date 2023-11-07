import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
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
