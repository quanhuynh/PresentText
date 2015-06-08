function executeContent() {
	chrome.tabs.executeScript({file: 'jquery-2.1.4.js'}, function() {
		chrome.tabs.executeScript({
			file: 'content_script.js'
		});
	});
};

document.getElementById("button").addEventListener('click', executeContent);