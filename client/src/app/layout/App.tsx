import { ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { useState } from "react";
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




function App() {
  
  const[darkMode, setDarkMode] = useState(false);
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

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
        <Container>
          <Routes>         
          <Route path='*' element={<HomePage/>}/>
          <Route path='/catalog' element={<Catalog/>}/>
          <Route path='/catalog/:id' element={<ProductDetails/>}/>
          <Route path='/aboutus' element={<AboutPage/>}/>
          <Route path='/contact' element={<ContactPage/>}/>
          </Routes>
          </Container>
      </ThemeProvider>
  );
}

export default App;

