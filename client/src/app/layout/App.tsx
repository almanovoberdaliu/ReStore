import { ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/catalog";
import Header from "./Header";
import HomePage from '../../features/home/HomePage';
import ProductDetails from '../../features/catalog/ProductDetails';
import AboutPage from '../../features/aboutus/AboutPage';
import ContactPage from '../../features/contact/Contact';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BasketPage from '../../features/basket/BasketPage';
import { UseStoreContext } from '../../context/StoreContext';
import { getCookie } from '../util/util';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import CheckOutPage from '../../features/checkout/CheckOutPage';




function App() {
  
  const {setBasket} = UseStoreContext();
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if(buyerId){
      agent.Basket.get()
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
    }else{
      setLoading(false);
    }
  }, [setBasket])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if(loading) return <LoadingComponent message='Initialising app...'/>

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Routes>
          <Route path='*' element={<HomePage />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/catalog/:id' element={<ProductDetails />} />
          <Route path='/aboutus' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/basket' element={<BasketPage/>}/>          
          <Route path='/checkout' element={<CheckOutPage/>}/>

        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;

