// Content retrieval and display logic
const cardStyle = window.setCardStyle || {
    0: (name, imgUrl) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `<h3>${name}</h3><img src="${imgUrl}" style="width:100%; border-radius:8px; margin-top:10px;">`;
        return div;
    }
};

function showBranches (container){
	console.log("Loading branches...");
	window.electronAPI.send('branches'); 
	
	window.electronAPI.once('complete', function (event, response){
		const branches = response[0];
		container.innerHTML = '';
		
		for (let i = 0; i < branches.length; i++){
            const branch = branches[i];
            // Slugify name for image lookup and trim underscores
            const slug = branch.BrName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
			let imageURL = './images/' + slug + '.png'; 
			
            let card = cardStyle[0](branch.BrName, imageURL, branch.BrDescription);
			let brId = branch.BranchID;
			let brName = branch.BrName;
			
			card.setAttribute("brId", brId);
			card.addEventListener('click', () => {
				console.log("Clicked branch:", brName);
				showChapters(container, brId, brName);
			});
			
			container.insertAdjacentElement("beforeend", card);
		}
	});
}

function showChapters(container, brId, brName){
	console.log("Loading chapters for branch:", brId);
	container.innerHTML = '<h2>' + brName + '</h2><div id="chapters-list">Loading chapters...</div>';
	const listContainer = document.getElementById('chapters-list');

	window.electronAPI.send('chapters', brId);
	window.electronAPI.once('complete', function (event, response){
		const chapters = response[0] || [];
		listContainer.innerHTML = '';
		
		if (chapters.length === 0) {
			listContainer.innerHTML = '<p>No chapters found for this branch.</p>';
			return;
		}

		chapters.forEach(chapter => {
			const div = document.createElement('div');
			div.className = 'chapter-item';
			div.style.padding = '10px';
			div.style.borderBottom = '1px solid #ccc';
			div.style.cursor = 'pointer';
			div.innerHTML = `<strong>${chapter.ChName}</strong><p>${chapter.ChDescription || ''}</p>`;
			
			div.addEventListener('click', () => {
				console.log("Clicked chapter:", chapter.ChName);
				// showSections(container, chapter.ChapterID);
			});
			
			listContainer.appendChild(div);
		});
	});
} 

function showSections(container, chId){
	// To be implemented
}