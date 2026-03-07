// setStyles.js: Handles the creation and styling of UI elements
function createCard(title, imageUrl) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = title;
    
    const h3 = document.createElement('h3');
    h3.textContent = title;
    
    card.appendChild(img);
    card.appendChild(h3);
    
    return card;
}

const setCardStyle = {
    0: createCard
};

// Exporting functionality
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { setCardStyle };
} else {
    window.setCardStyle = setCardStyle;
}
