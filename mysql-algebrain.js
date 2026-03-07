// The algebrain-related MySQL functions

const db = require("./sqlite-handling"),
	  conn = db.CrCnn(); // Creates the SQLite connection

function retrieveBranches (event){
	db.MkSlQr(conn,'*','Branches',undefined,function(err,rslt) {
			if(err)
				console.error("Database Error (Branches):", err.message); 	
			else {
				event.sender.send('complete',rslt);
			}
		});
}

function retrieveChapters (event, brId){
	db.MkSlQr(conn,'ChapterID, ChName, ChDescription','Chapters','IdBranch = ' + brId,function(err,rslt) {
			if(err)
				console.error("Database Error (Chapters):", err.message); 	
			else {
				event.sender.send('complete', rslt);
			}
		});
}

function retrieveSections (event, chId){
	db.MkSlQr(conn,'sectionID, secName','Sections','IdChapter = ' + chId,function(err,rslt) {
			if(err)
				console.error("Database Error (Sections):", err.message); 	
			else {
				event.sender.send('complete', rslt);
			}
		});
}

function retrieveSectionContent (event, secId){
	db.MkSlQr(conn,'content','Sections','sectionID = ' + secId,function(err,rslt) {
			if(err)
				console.error("Database Error (Content):", err.message); 	
			else {
				event.sender.send('complete', rslt);
			}
		});
}

exports.retrieveBranches = retrieveBranches;
exports.retrieveChapters = retrieveChapters;
exports.retrieveSections = retrieveSections;
exports.retrieveSectionContent = retrieveSectionContent;