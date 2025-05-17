import React from 'react';
import BMICalculator from './components/BMICalculator';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <BMICalculator />
      </main>
      <Footer />
    </div>
  );
}

export default App;