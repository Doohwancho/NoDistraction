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
}, { urls: communitySites, types: ["image", "object"]}, ["blocking"]); 