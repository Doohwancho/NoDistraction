let communitySites = [
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

let communityKeywordList = [
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

let browser;

if (typeof browser === "undefined") {
  browser = window.chrome;
}

if (!localStorage.on) {
  localStorage.on = "1";
}

if (localStorage.on == "1") {
  browser.browserAction.setIcon({ path: "images/icon19.png" });
} else {
  browser.browserAction.setIcon({ path: "images/icon19-disabled.png" });
}

browser.browserAction.onClicked.addListener(function () {
  if (localStorage.on == "1") {
    browser.browserAction.setIcon({ path: "images/icon19-disabled.png" });
    localStorage.on = "0";
  } else {
    browser.browserAction.setIcon({ path: "images/icon19.png" });
    localStorage.on = "1";
  }
});

browser.webRequest.onBeforeRequest.addListener(
  function () {
    if (localStorage.on == "1") {
      return {
        redirectUrl:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==",
      };
    }
  },
  { urls: communitySites, types: ["image", "object", "media", "sub_frame"] },
  ["blocking"]
); //stylesheet

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (localStorage.on == "1") {
    communityKeywordList.forEach(function (s) {
      if (tab.url.indexOf(s) > -1) {
        if (changeInfo.status === "loading") {
          browser.tabs.insertCSS(
            {
              file: "src/block_style.css",
              allFrames: true,
              runAt: "document_start",
            },
            function () {
              browser.tabs.executeScript({
                code: "document.documentElement.classList.add('black-and-white-mode');",
                allFrames: true,
                runAt: "document_start",
              });
            }
          );
        }
        browser.tabs.executeScript(null, {
          code: "document.querySelectorAll('video').forEach(video => video.remove()); document.querySelectorAll('iframe').forEach(iframe => iframe.remove()); document.querySelectorAll('embed').forEach(embed => embed.remove()); document.getElementsByTagName('html')[0].style.display='block';",
          runAt: "document_end",
        });
        return;
      }
    });
  }
});
