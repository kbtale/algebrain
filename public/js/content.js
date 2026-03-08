// Content retrieval and display logic
const cardStyle = window.setCardStyle || {
    0: (name, imgUrl) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `<h3>${name}</h3><img src="${imgUrl}" style="width:100%; border-radius:8px; margin-top:10px;">`;
        return div;
    }
};

function createBackButton(container, callback) {
    const btn = document.createElement('div');
    btn.className = 'back-btn';
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>';
    btn.title = 'Back';
    btn.onclick = () => {
        container.innerHTML = '';
        callback();
    };
    return btn;
}

function showBranches (container){
	console.log("Loading branches...");
	window.electronAPI.send('branches'); 
	
	window.electronAPI.once('complete', function (event, response){
		const branches = response[0];
		container.innerHTML = '';
		
		for (let i = 0; i < branches.length; i++){
            const branch = branches[i];
            const slug = branch.BrName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
			let imageURL = './images/' + slug + '.png'; 
			
            let card = cardStyle[0](branch.BrName, imageURL, branch.BrDescription);
			let brId = branch.BranchID;
			let brName = branch.BrName;
			
			card.setAttribute("brId", brId);
			card.addEventListener('click', () => {
				showChapters(container, brId, brName);
			});
			
			container.insertAdjacentElement("beforeend", card);
		}
	});
}

function showChapters(container, brId, brName){
	container.innerHTML = '';
    container.appendChild(createBackButton(container, () => showBranches(container)));
    
    const header = document.createElement('h2');
    header.textContent = brName;
    container.appendChild(header);

	const listContainer = document.createElement('div');
    listContainer.id = 'chapters-list';
    listContainer.innerHTML = 'Loading chapters...';
    container.appendChild(listContainer);

	window.electronAPI.send('chapters', brId);
	window.electronAPI.once('complete', function (event, response){
		const chapters = response[0] || [];
		listContainer.innerHTML = '';
		
		if (chapters.length === 0) {
			listContainer.innerHTML = '<div class="coming-soon"><h3>Coming Soon</h3><p>Content for this branch is under development.</p></div>';
			return;
		}

		chapters.forEach(chapter => {
			const div = document.createElement('div');
			div.className = 'card chapter-item';
            div.style.textAlign = 'left';
            div.style.alignItems = 'flex-start';
			div.innerHTML = `<h3>${chapter.ChName}</h3><p class="description">${chapter.ChDescription || ''}</p>`;
			
			div.addEventListener('click', () => {
				showSections(container, chapter.ChapterID, chapter.ChName, () => showChapters(container, brId, brName));
			});
			
			listContainer.appendChild(div);
		});
	});
} 

function showSections(container, chId, chName, backCallback){
	container.innerHTML = '';
    container.appendChild(createBackButton(container, backCallback));

    const header = document.createElement('h2');
    header.textContent = chName;
    container.appendChild(header);

    const listContainer = document.createElement('div');
    listContainer.id = 'sections-list';
    listContainer.className = 'coming-soon';
    listContainer.innerHTML = '<h3>Coming Soon</h3><p>Sections for this chapter are arriving shortly.</p>';
    container.appendChild(listContainer);
}
