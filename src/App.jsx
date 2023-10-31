import Header from "./components/Header";
import HeroCards from "./components/HeroCards";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import { HeroContextProvider } from "./contexts/HeroesContext";
import { ThemeProvider, Typography, createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <HeroContextProvider>
        <Header />
        <Layout>
          <Typography variant="h2" sx={{ fontSize: 30, fontWeight: "700", margin: "30px 0" }}>
            Explore Sua Galeria de Heróis e Crie Batalhas Épicas!
          </Typography>
          <HeroCards />
        </Layout>
        <Footer />
      </HeroContextProvider>
    </ThemeProvider>
  );
}

export default App;
