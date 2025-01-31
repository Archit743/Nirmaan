document.addEventListener("DOMContentLoaded", () => {
    const parkingGrid = document.querySelector(".parking-grid")
    const selectedSpotElement = document.getElementById("selected-number")
    const confirmBtn = document.querySelector(".confirm-btn")
    const cancelBtn = document.querySelector(".cancel-btn")
    let selectedSpot = null
  
    // Create parking spots
    for (let i = 1; i <= 100; i++) {
      const spot = document.createElement("div")
      spot.className = "spot"
      spot.textContent = i
  
      spot.addEventListener("click", () => {
        // Remove previous selection
        const previousSelected = document.querySelector(".spot.selected")
        if (previousSelected) {
          previousSelected.classList.remove("selected")
        }
  
        // Select new spot
        spot.classList.add("selected")
        selectedSpot = i
        selectedSpotElement.textContent = i
      })
  
      parkingGrid.appendChild(spot)
    }
  
    // Handle booking confirmation
    confirmBtn.addEventListener("click", () => {
      if (selectedSpot) {
        alert(`Booking confirmed for spot ${selectedSpot}`)
      } else {
        alert("Please select a parking spot first")
      }
    })
  
    // Handle cancellation
    cancelBtn.addEventListener("click", () => {
      const selectedSpotDiv = document.querySelector(".spot.selected")
      if (selectedSpotDiv) {
        selectedSpotDiv.classList.remove("selected")
      }
      selectedSpot = null
      selectedSpotElement.textContent = "-"
    })
  })
  
  