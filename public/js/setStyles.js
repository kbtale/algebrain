// setStyles.js: Handles the creation and styling of UI elements
function createCard(title, imageUrl) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const h3 = document.createElement('h3');
    h3.textContent = title;
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = title;
    img.style.width = '100%';
    img.style.borderRadius = '8px';
    img.style.marginTop = '10px';
    
    card.appendChild(h3);
    card.appendChild(img);
    
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
