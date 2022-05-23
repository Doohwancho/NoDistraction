let obj = {};


function main(){

  setBrowserToChrome();
  setCommunitySites();
  setCommunityKeyWordList();

  setToggle();
  
  blockImageBeforeRequest();
  removeDistractionOnUpdate();
}





//* functions *//

function setBrowserToChrome(){
  if (typeof obj.browser === "undefined") {
    obj.browser = window.chrome;
  }
}

function setCommunitySites(){
  obj.communitySites = [
    "*://*.dcinside.com/*",
    "*://*.fmkorea.com/*",
    "*://*.ilbe.com/*",
    "*://*.ruliweb.com/*",
    "*://*.ppomppu.co.kr/*",
    "*://*.inven.co.kr/*",
    "*://*.theqoo.net/*",
    "*://*.clien.net/*",
    "*://*.pann.nate.com/*",
    "*://*.humoruniv.com/*",
    "*://mlbpark.donga.com/*",
    "*://*.instragram.com/*",
    "*://*.facebook.com/*",
    "*://*.fomos.kr/*",
  ];
}

function setCommunityKeyWordList(){
  obj.communityKeywordList = [
    "dcinside.",
    "fmkorea.",
    "ilbe.",
    "ruliweb.",
    "ppomppu.",
    "inven.",
    "theqoo.",
    "clien.",
    "pann.",
    "nate.",
    "humoruniv.",
    "mlbpark.",
    "donga.",
    "instagram.",
    "facebook.",
    "fomos.",
  ];
}

function setToggle(){
  if (!localStorage.on) {
    localStorage.on = "1";
  }
  
  if (localStorage.on == "1") {
    obj.browser.browserAction.setIcon({ path: "images/icon19.png" });
  } else {
    obj.browser.browserAction.setIcon({ path: "images/icon19-disabled.png" });
  }
  
  obj.browser.browserAction.onClicked.addListener(function () {
    if (localStorage.on == "1") {
      obj.browser.browserAction.setIcon({ path: "images/icon19-disabled.png" });
      localStorage.on = "0";
    } else {
      obj.browser.browserAction.setIcon({ path: "images/icon19.png" });
      localStorage.on = "1";
    }
  });
}

function blockImageBeforeRequest(){
  obj.browser.webRequest.onBeforeRequest.addListener(
    function () {
      if (localStorage.on == "1") {
        return {
          redirectUrl:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==",
        };
      }
    },
    { urls: obj.communitySites, types: ["image", "object", "media", "sub_frame"] },
    ["blocking"]
  ); 
}

function removeDistractionOnUpdate(){
  obj.browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    removeDistractions(tabId, changeInfo.status, tab.url);
  });
}

function removeDistractions(tabId, status, url) {
  if (localStorage.on == "1") {
    obj.communityKeywordList.forEach(function (s) {
      if (url.indexOf(s) > -1) {
        if (status === "loading") {
            insertCss(tabId);
            addCssTag();
        }
        removeVideo();
      }
    });
  }
}

function insertCss(tabId){
  obj.browser.tabs.insertCSS(tabId, {
    file: "src/block_style.css",
    allFrames: true,
    runAt: "document_start",
  });
}

function addCssTag(){
  obj.browser.tabs.executeScript({
    code: "document.documentElement.classList.add('black-and-white-mode');",
    allFrames: true,
  });
}

function removeVideo(){
  obj.browser.tabs.executeScript(null, {
    code: "document.querySelectorAll('video').forEach(video => video.remove()); document.querySelectorAll('iframe').forEach(iframe => iframe.remove()); document.querySelectorAll('embed').forEach(embed => embed.remove()); document.getElementsByTagName('html')[0].style.display='block';",
    runAt: "document_end",
  });
}


main();