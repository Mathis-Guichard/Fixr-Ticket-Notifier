(function() {
    let previousTicketsSold = null;

    function getTicketsSold() {
        // Locate elements containing 'Tickets sold'
        let elements = document.querySelectorAll("div");
        for (let element of elements) {
            if (element.textContent.trim() === 'Tickets sold') {
                // Find the number in the sibling element
                let parentDiv = element.parentElement;
                if (parentDiv) {
                    let numberSpan = parentDiv.querySelector("span");
                    if (numberSpan) {
                        let ticketsSoldText = numberSpan.textContent.trim().replace(/\s/g, '');
                        let ticketsSold = parseInt(ticketsSoldText);
                        if (!isNaN(ticketsSold)) {
                            return ticketsSold;
                        }
                    }
                }
            }
        }
        return null;
    }

    function checkTicketsSold() {
        let currentTicketsSold = getTicketsSold();
        if (currentTicketsSold !== null) {
            if (previousTicketsSold !== null && currentTicketsSold > previousTicketsSold) {
                // Tickets sold has increased, play sound
                playSound();
            }
            previousTicketsSold = currentTicketsSold;
        }
    }

    function playSound() {
        let audio = new Audio(browser.runtime.getURL("sound/notification.mp3"));
        audio.play();
    }

    // Check every 2 seconds
    setInterval(checkTicketsSold, 2000);

    // Initial check
    checkTicketsSold();
})();
