import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from "../src/pages/UserPage";  
import AdminDashboard from "../src/pages/AdminPage";  

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
