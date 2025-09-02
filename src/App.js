import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Registeruserpage from './Pages/Registeruserpage';
import Productcreatepage from './Pages/Productcreatepage';
import Homepage from './Pages/Homepage';
import Adminviewpage from './Pages/Adminviewpage';
import Admineditpage from './Pages/Admineditpage';
import Navbar from './Components/Navbar';
import { useState } from 'react';
import CartView from './Pages/Cartpage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addtocart, setAddtocart] = useState([])

  return (
    <>
      <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setAddtocart={setAddtocart} />
      <Routes>
        {/* <Route path='/' element={<Homepage />} /> */}
        <Route path='/' element={<Homepage addtocart={addtocart} setAddtocart={setAddtocart}  isLoggedIn={isLoggedIn}/>} />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/register' element={<Registeruserpage />} />
        <Route path='/createproduct' element={<Productcreatepage />} />
        <Route path='/adminviewpage' element={<Adminviewpage />} />
        <Route path='/adminedit/:product_id' element={<Admineditpage />} />
        <Route path='/cartpage' element={<CartView addtocart={addtocart} />} />

      </Routes>

    </>
  );
}

export default App;

