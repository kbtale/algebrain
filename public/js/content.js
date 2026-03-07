// Content retrieval and display logic
const cardStyle = window.setCardStyle || {
    0: (name, imgUrl) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `<h3>${name}</h3><img src="${imgUrl}" style="width:100%; border-radius:8px; margin-top:10px;">`;
        return div;
    }
};

// Getting data
function showBranches (container){
	console.log("Loading branches...");
	window.electronAPI.send('branches'); 
	
	window.electronAPI.on('complete', function (event, response){
		const branches = response[0];
		container.innerHTML = ''; // Clear container
		
		for (let i = 0; i < branches.length; i++){
			let imageURL = './images/img' + (1+i) + '.png'; 
			let card = cardStyle[0](branches[i].BrName, imageURL);
			let brId = branches[i].BranchID;
			let brName = branches[i].BrName;
			
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
	window.electronAPI.on('complete', function (event, response){
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