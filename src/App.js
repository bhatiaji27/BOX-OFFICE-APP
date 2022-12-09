import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import Starred from "./components/Pages/Starred";
import Show from "./components/Pages/Show";
import { ThemeProvider } from 'styled-components';
import Title from "./components/UI/Title";

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
      <Title />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/starred" element={<Starred />} />
        <Route exact path="/show/:id" element={<Show />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
