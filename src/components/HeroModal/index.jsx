/* eslint-disable */
import { useEffect, useState } from "react";
import { Modal, Typography, Button, Paper } from "@mui/material";
import { useHeroContext } from "../../contexts/HeroesContext";
import style from "./HeroModal.module.css";

export default function HeroModal({ open, handleClose, battleHeroesId }) {
  const { heroes } = useHeroContext();
  const [heroesObjectArray, setHeroesObjectArray] = useState([]);
  const [winner, setWinner] = useState({});

  // useEffect to update the selected heroes based on IDs
  useEffect(() => {
    if (battleHeroesId && battleHeroesId.length === 2 && heroes) {
      const hero1 = heroes.find((hero) => hero.id === battleHeroesId[0]);
      const hero2 = heroes.find((hero) => hero.id === battleHeroesId[1]);
      setHeroesObjectArray([hero1, hero2]);
    } else {
      setHeroesObjectArray([]);
    }
  }, [battleHeroesId, heroes]);

  // useEffect to calculate the winner based on power stats
  useEffect(() => {
    if (heroesObjectArray.length === 2) {
      const totalPower1 = calculateTotalPower(heroesObjectArray[0]);
      const totalPower2 = calculateTotalPower(heroesObjectArray[1]);
      setWinner(checkWinner(totalPower1, totalPower2));
    }
  }, [heroesObjectArray]);

  // If there are not exactly 2 battle heroes, return null
  if (!battleHeroesId || battleHeroesId.length !== 2) {
    return null;
  }

  // Função para calcular a soma dos atributos
  const calculateTotalPower = (hero) => {
    const powerstats = hero.powerstats;
    return powerstats.combat + powerstats.durability + powerstats.intelligence + powerstats.power + powerstats.speed + powerstats.strength;
  };

  const checkWinner = (totalPower1, totalPower2) => {
    return totalPower1 === totalPower2 ? { name: "Empate!" } : totalPower1 > totalPower2 ? heroesObjectArray[0] : heroesObjectArray[1];
  };

  const closeAndResetWinner = () => {
    handleClose();
    setWinner({});
  };

  return (
    <Modal open={open} onClose={closeAndResetWinner} className={window.innerWidth <= 600 ? `${style.full__width__modal}` : ""}>
      <Paper
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          minHeight: "70%",
          padding: "20px",
        }}
      >
        {winner && (
          <Typography variant="h4" gutterBottom>
            Vencedor: {winner.name}
          </Typography>
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }} className={style.heroes__container}>
          {heroesObjectArray.map((hero) => (
            <div key={hero.id}>
              <img src={hero.images.md} alt={`${hero.name} picture`} style={{ width: "100%" }} />
              <div>
                <Typography variant="h6">{hero.name}</Typography>
                <Typography variant="subtitle1">Combat: {hero.powerstats.combat}</Typography>
                <Typography variant="subtitle1">Durability: {hero.powerstats.durability}</Typography>
                <Typography variant="subtitle1">Intelligence: {hero.powerstats.intelligence}</Typography>
                <Typography variant="subtitle1">Power: {hero.powerstats.power}</Typography>
                <Typography variant="subtitle1">Speed: {hero.powerstats.speed}</Typography>
                <Typography variant="subtitle1">Strength: {hero.powerstats.strength}</Typography>
                <Typography variant="subtitle1">Total Power: {calculateTotalPower(hero)}</Typography>
              </div>
            </div>
          ))}
        </div>
        <Button onClick={onClose}>Fechar</Button>
      </Paper>
    </Modal>
  );
}
