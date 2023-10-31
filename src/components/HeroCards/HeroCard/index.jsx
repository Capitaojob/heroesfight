import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import style from "./HeroCard.module.css";

export default function HeroCard({ hero, handleClick }) {
  return (
    <Card
      key={hero.id}
      data-hero={hero.id}
      className={style.hero__card}
      style={{
        borderColor: hero.appearance.eyeColor,
        borderWidth: "2px",
        borderRadius: "10px",
        boxShadow: `0 0 10px 3px ${hero.appearance.eyeColor}`,
      }}
      color="primary"
      variant="outlined"
      onClick={() => handleClick(hero.id)}
    >
      <CardContent>
        <img src={hero.images.md} alt={`${hero.name} picture`} />
        <Typography variant="h5" sx={{ whiteSpace: "nowrap", overflow: "hidden" }}>
          {hero.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small">
          Ver mais
        </Button>
      </CardActions>
    </Card>
  );
}
