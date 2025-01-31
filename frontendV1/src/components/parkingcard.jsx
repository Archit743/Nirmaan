import { Link } from "react-router-dom";
import styles from "./parkingcard.module.css"

export function ParkingCard({ id, location, availableSpots, totalSpots, description }) {
  return (
    <Link href={`/parking/${id}`} className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>Parking {id}</h2>
        <span className={styles.badge}>{availableSpots} Available</span>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.description}>{description}</p>
        <p className={styles.totalSpots}>Total Spots: {totalSpots}</p>
      </div>
    </Link>
  )
}

