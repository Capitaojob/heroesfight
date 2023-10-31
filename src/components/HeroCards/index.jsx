import { useHeroContext } from "../../contexts/HeroesContext";
import { useEffect, useState } from "react";
import HeroModal from "../HeroModal";
import HeroCard from "./HeroCard";
import style from "./HeroCards.module.css";

export default function HeroCards() {
  const { heroes, currentFilter } = useHeroContext();
  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const [visibleHeroes, setVisibleHeroes] = useState(100);
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHeroes([]);
  };

  const handleHeroClick = (heroId) => {
    // Check if the hero is already selected
    const heroIndex = selectedHeroes.indexOf(heroId);
    if (heroIndex === -1) {
      // If not in the list, add it
      setSelectedHeroes((lastSelectedHeroes) => [...lastSelectedHeroes, heroId]);
    } else {
      // If already in the list, remove it
      const newSelectedHeroes = [...selectedHeroes];
      newSelectedHeroes.splice(heroIndex, 1);
      setSelectedHeroes(newSelectedHeroes);
    }

    // Open the modal if there are selected heroes
    if (selectedHeroes.length > 0) openModal();
  };

  // useEffect to filter and update heroes when the data changes
  useEffect(() => {
    async function filterHeroes() {
      const filteredHeroes = heroes.filter((hero) => hero.name.toLowerCase().includes(currentFilter.toLowerCase()));
      setFilteredHeroes(filteredHeroes);
    }

    if (heroes) filterHeroes();
  }, [heroes, currentFilter]);

  const loadMoreHeroes = () => {
    setVisibleHeroes((prevVisibleHeroes) => prevVisibleHeroes + 100);
  };

  return (
    <section className={style.heroes__section}>
      {filteredHeroes.length > 0 ? (
        filteredHeroes.slice(0, visibleHeroes).map((hero) => <HeroCard key={hero.id} handleClick={handleHeroClick} hero={hero} />)
      ) : (
        <h3>Nenhum herói encontrado.</h3>
      )}
      {visibleHeroes < filteredHeroes.length && (
        <button onClick={loadMoreHeroes} className={style.show__more__button}>
          Carregar mais 100 heróis
        </button>
      )}
      <HeroModal open={isModalOpen} handleClose={closeModal} battleHeroesId={selectedHeroes} />
    </section>
  );
}
