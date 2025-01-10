// App.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Counter from './components/Counter';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterList from './components/RegisterList';

const App = () => {
    return (
        <div>
            <Header title="Welcome to My React App" />
            <p>This is the main content of the page.</p>
            <Counter />
            <Footer />
            <Router>
                <Routes>
                    <Route path="/profile" element={<RegisterList />} />
                    { /* Add more routes here */}
                </Routes>
            </Router>
        </div>
    );
};

export default App;