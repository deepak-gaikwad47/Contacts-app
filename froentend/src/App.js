import './App.css';
import { ContactForm } from './components/ContactForm';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home data={data} setData={setData} />} />
        <Route path="/newContact" element={<ContactForm />} />
      </Routes>
    </>
  );
}

export default App;
