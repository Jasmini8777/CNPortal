import React from 'react';
// import './Index.css';
import Navbar from './Navbar';
import DisplayRecord from './DisplayRecord';
import DisplayData from './DisplayData';
import Footer from './Footer';
import Mission from './Mission';
import Card from './Card';


function Index() {
  return (
    <>
    <Navbar />
    <div>
    <DisplayData/>
    <DisplayRecord/>
    <Card/>
    <Mission/>
    <Footer/>
    </div>
    </>
  );
}

export default Index;
