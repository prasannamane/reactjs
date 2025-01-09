// App.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Counter from './components/Counter';

const App = () => {
    return (
        <div>
            <Header title="Welcome to My React App" />
            <p>This is the main content of the page.</p>
            <Counter />
            <Footer />
        </div>
    );
};

export default App;


