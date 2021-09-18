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

let browser;

if (typeof browser === "undefined") {
    browser = chrome;
}


if (!localStorage.on) {
    localStorage.on = '1';
}

if (localStorage.on == '1') {
	browser.browserAction.setIcon({path: "images/icon19.png"});
} else {
	browser.browserAction.setIcon({path: "images/icon19-disabled.png"});
}

browser.browserAction.onClicked.addListener(function(tab) {
	if (localStorage.on == '1') {
		browser.browserAction.setIcon({path: "images/icon19-disabled.png"});
		localStorage.on = '0';
	} else {
		browser.browserAction.setIcon({path: "images/icon19.png"});
		localStorage.on = '1';
	}
});


browser.webRequest.onBeforeRequest.addListener(function(details) {
	if (localStorage.on == '1') {
		return {redirectUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="}; 
	}
}, { urls: communitySites, types: ["image", "object", "media", "sub_frame"]}, ["blocking"]);  //stylesheet


browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (localStorage.on == '1'){
		communityKeywordList.forEach( function(s) { 
			if (tab.url.indexOf(s) > -1) {
				if ( changeInfo.status === "loading" ){
					browser.tabs.insertCSS(null, {code: "html{display:none;}", runAt: "document_start"}); 
				}
				if ( changeInfo.status === "complete" ){
					browser.tabs.insertCSS(null, {code: "html{display:block;} img{display: none; visibility: hidden;} video{display: none} "}); 
				}
				browser.tabs.executeScript(null, {code: "document.querySelectorAll('video').forEach(video => video.remove()); document.querySelectorAll('iframe').forEach(iframe => iframe.remove()); document.querySelectorAll('embed').forEach(embed => embed.remove());", runAt: "document_end"});   
				return;
			}
		})
	}
}); 
