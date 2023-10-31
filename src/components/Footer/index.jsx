import style from "./Footer.module.css";
import { GitHub, Linkedin } from "react-feather";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <h6>Made By Joao Bataglia</h6>
      <div>
        <a href="https://github.com/Capitaojob">
          <GitHub />
        </a>
        <a href="https://linkedin.com/in/joao-bataglia">
          <Linkedin />
        </a>
      </div>
    </footer>
  );
}
