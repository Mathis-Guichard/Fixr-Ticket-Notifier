// Function to retrieve the "Tickets sold" value from the page
function getTicketsSoldValue() {
  // Find all div elements
  let elements = document.querySelectorAll("div");
  for (let element of elements) {
    // Check if the element's text is "Tickets sold"
    if (element.textContent.trim() === "Tickets sold") {
      // Get the parent element
      let parent = element.parentElement;
      // Find the span containing the number
      let valueElement = parent.querySelector("span");
      if (valueElement) {
        // Extract the number and return it
        return parseInt(valueElement.textContent.replace(/[^\d]/g, ''));
      }
    }
  }
  return null;
}

let previousValue = null;

// Initialize the script
function initialize() {
  previousValue = getTicketsSoldValue();
  if (previousValue !== null) {
    // Start checking for updates every 5 seconds
    setInterval(checkForUpdate, 5000);
  } else {
    // If the value isn't available yet, try again in 1 second
    setTimeout(initialize, 1000);
  }
}

// Function to check for updates
function checkForUpdate() {
  let currentValue = getTicketsSoldValue();
  if (currentValue !== null && previousValue !== null && currentValue > previousValue) {
    // The value has increased
    previousValue = currentValue;
    playSound();
  } else if (currentValue !== null) {
    // Update the previous value
    previousValue = currentValue;
  }
}

// Function to play the notification sound
function playSound() {
  let audio = new Audio(browser.runtime.getURL("sound.mp3"));
  audio.play();
}

// Start the script
initialize();
