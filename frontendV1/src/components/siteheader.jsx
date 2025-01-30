import { Link } from "react-router-dom";
import styles from "./siteheader.module.css"

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContent}`}>
        <Link href="/" className={styles.logo}>
          CampusHub
        </Link>
        <nav className={styles.nav}>
          <button className={styles.navButton}>Profile</button>
          <button className={styles.navButton}>Your Receipts</button>
        </nav>
      </div>
    </header>
  )
}

