import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Trendzipper</div>
      <div className={styles.text}>
      Trendzipper © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
