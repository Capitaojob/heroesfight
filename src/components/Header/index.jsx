import { TextField, Typography } from "@mui/material";
import style from "./Header.module.css";
import { useHeroContext } from "../../contexts/HeroesContext";

export default function Header() {
  const { currentFilter, updateFilter } = useHeroContext();
  return (
    <header className={style.header}>
      <Typography variant="h1" sx={{ fontSize: 30, fontWeight: 900 }}>
        HEROESfight
      </Typography>
      <TextField
        variant="outlined"
        color="primary"
        value={currentFilter}
        onChange={(e) => updateFilter(e.target.value)}
        sx={{ marginLeft: "20px" }}
        label="Filtrar"
      />
    </header>
  );
}
