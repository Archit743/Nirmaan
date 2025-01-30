"use client"

import { useState } from "react"
import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/site-header"
import styles from "./page.module.css"

function ParkingSpot({ number, isSelected, onSelect }) {
  return (
    <button onClick={() => onSelect(number)} className={`${styles.parkingSpot} ${isSelected ? styles.selected : ""}`}>
      {number}
    </button>
  )
}

export default function ParkingSection({ params }) {
  const [selectedSpot, setSelectedSpot] = useState(null)

  const handleSpotSelect = (number) => {
    setSelectedSpot(number === selectedSpot ? null : number)
  }

  const spots = Array.from({ length: 100 }, (_, i) => i + 1)

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className={`container ${styles.main}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>Parking Section {params.id}</h1>
          <Link href="/" className={styles.backButton}>
            Back to Sections
          </Link>
        </div>

        <div className={styles.parkingGrid}>
          {spots.map((number) => (
            <ParkingSpot
              key={number}
              number={number}
              isSelected={selectedSpot === number}
              onSelect={handleSpotSelect}
            />
          ))}
        </div>

        {selectedSpot && (
          <div className={styles.confirmation}>
            <div className={styles.confirmationText}>
              Selected Spot: <span className={styles.selectedSpot}>{selectedSpot}</span>
              <p className={styles.confirmationSubtext}>Click confirm to book this spot</p>
            </div>
            <div className={styles.confirmationButtons}>
              <button className={`${styles.button} ${styles.cancelButton}`} onClick={() => setSelectedSpot(null)}>
                Cancel
              </button>
              <button
                className={`${styles.button} ${styles.confirmButton}`}
                onClick={() => alert("Booking confirmed!")}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

