import { createContext, useState, useContext, useEffect } from "react";

const HeroContext = createContext();
HeroContext.displayName = "Hero Context";

export const HeroContextProvider = ({ children }) => {
  const [currentFilter, setCurrentFilter] = useState("");
  const [heroes, setHeroes] = useState(null);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await fetch("http://homologacao3.azapfy.com.br/api/ps/metahumans");
        if (response.ok) {
          const data = await response.json();
          setHeroes(data);
        } else {
          console.error("Erro ao buscar dados");
        }
      } catch (error) {
        console.error("Ocorreu um erro:", error);
      }
    };

    fetchHeroes();
  }, []);

  const updateFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  return <HeroContext.Provider value={{ heroes, currentFilter, updateFilter }}>{children}</HeroContext.Provider>;
};

export const useHeroContext = () => {
  return useContext(HeroContext);
};
