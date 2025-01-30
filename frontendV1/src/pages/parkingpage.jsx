import { SiteHeader } from "../components/siteheader";
import { ParkingCard } from "../components/parkingcard";
// import styles from "../pages/page.module.css"

const parkingData = [
  {
    id: 1,
    location: "Parking 1",
    description: "Backside of D Building",
    availableSpots: 45,
    totalSpots: 100,
  },
  {
    id: 2,
    location: "Parking 2",
    description: "Beside Sports Ground",
    availableSpots: 30,
    totalSpots: 100,
  },
  {
    id: 3,
    location: "Parking 3",
    description: "Near Main Gate",
    availableSpots: 20,
    totalSpots: 100,
  },
]

export default function Page() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className={`container ${styles.main}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>Campus Parking</h1>
          <p className={styles.subtitle}>Select a parking section to view and book available spots</p>
        </div>
        <div className={styles.grid}>
          {parkingData.map((parking) => (
            <ParkingCard key={parking.id} {...parking} />
          ))}
        </div>
      </main>
    </div>
  )
}

