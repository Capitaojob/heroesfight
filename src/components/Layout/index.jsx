import style from "./Layout.module.css";

export default function Layout({ children }) {
  return <main className={style.main__container}>{children}</main>;
}
