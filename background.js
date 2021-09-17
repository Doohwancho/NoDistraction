let communitySites = [
	"*://*.dcinside.com/*"
	,"*://*.fmkorea.com/*"
	,"*://*.ilbe.com/*"
	,"*://*.ruliweb.com/*"
	,"*://*.ppomppu.co.kr/*"
	,"*://*.inven.co.kr/*"
	,"*://*.theqoo.net/*"
	,"*://*.clien.net/*"
	,"*://*.pann.nate.com/*"
	,"*://*.humoruniv.com/*"
	,"*://mlbpark.donga.com/*"
	,"*://*.instragram.com/*"
	,"*://*.facebook.com/*"
	,"*://*.fomos.kr/*"
];

communityKeywordList = [
	'dcinside',
	'fmkorea',
	'ilbe',
	'ruliweb',
	'ppomppu',
	'inven',
	'theqoo',
	'clien',
	'pann',
	'nate',
	'humoruniv',
	'mlbpark',
	'donga',
	'instagram',
	'facebook',
	'fomos'
];




if (!localStorage.on) {
    localStorage.on = '1';
}

if (localStorage.on == '1') {
	chrome.browserAction.setIcon({path: "images/icon19.png"});
} else {
	chrome.browserAction.setIcon({path: "images/icon19-disabled.png"});
}

chrome.browserAction.onClicked.addListener(function(tab) {
	if (localStorage.on == '1') {
		chrome.browserAction.setIcon({path: "images/icon19-disabled.png"});
		localStorage.on = '0';
	} else {
		chrome.browserAction.setIcon({path: "images/icon19.png"});
		localStorage.on = '1';
	}
});


chrome.webRequest.onBeforeRequest.addListener(function(details) {
	if (localStorage.on == '1') {
		return {redirectUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="}; 
	}
}, { urls: communitySites, types: ["image", "object", "media", "sub_frame"]}, ["blocking"]);  //stylesheet



chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (localStorage.on == '1'){

		communityKeywordList.forEach( function(s) { 
			if (tab.url.indexOf(s) > -1) {
				chrome.tabs.insertCSS(null, {code: "img{display: none; visibility: hidden;}", runAt: "document_start"});  //document_start, document_end, document_idle
				chrome.tabs.executeScript(null, {code: "document.querySelectorAll('iframe').forEach(iframe => iframe.remove()); document.querySelectorAll('embed').forEach(iframe => iframe.remove());", runAt: "document_end"});   //document_end this is the best
				return;
			}
		})
	}
}); 
