function createCard(title, imageUrl, description) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = title;
    
    // Fallback for missing images
    img.onerror = () => {
        img.style.display = 'none';
    };
    
    const h3 = document.createElement('h3');
    h3.textContent = title;
    
    card.appendChild(img);
    card.appendChild(h3);
    
    if (description) {
        const p = document.createElement('p');
        p.className = 'description';
        p.textContent = description;
        card.appendChild(p);
    }
    
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
