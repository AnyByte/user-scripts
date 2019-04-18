// ==UserScript==
// @name         FAKKU Nabber
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Script which restores toDataURL()
// @author       t.me/NicoSmile
// @match        https://www.fakku.net/hentai/*/read/page/*
// @run-at       document-start
// @require https://raw.githubusercontent.com/eligrey/canvas-toBlob.js/master/canvas-toBlob.js
// @require https://raw.githubusercontent.com/eligrey/FileSaver.js/master/src/FileSaver.js
// ==/UserScript==

// README
// 1. Launch Chrome or any other browser with disabled web security
// (Explanation why its required here: https://stackoverflow.com/a/20424457)
// Chrome example: 1. Create temporary directory ex. %UserProfile%\Desktop\temp
//                 2. Launch chrome with these arguements:
//                    chrome.exe --disable-web-security --user-data-dir="%UserProfile%\Desktop\temp"
//
// 2. Install Tampermonkey extension
// Chrome Web Store: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
//
// 3. Add this script
//
// 4. Start reading any manga and press Ctrl + F5 on the first page
// Script should start downloading images as you scroll through pages
// (Its important to press Ctrl + F5 (may be different in your browser), not just F5 in order to reset page cache and allow this script to execute before Fakku's one)

(function() {
    'use strict';
    var initial_delay = 5000;
    var save_interval = 500;
    setTimeout(function() {
        var loc = "";
        function pad(num, size) {
            var s = num + "";
            while (s.length < size) s = "0" + s;
            return s;
        }
        var interval = setInterval(function() {
            if (loc != location.href) {
                var tempArr = location.href.split('/');
                document.getElementsByTagName("canvas")[0].toBlobHD(function(blob) {
                    saveAs(blob, tempArr[tempArr.length - 4] + '-' + pad(tempArr[tempArr.length - 1], 3) + '.png');
                });
                loc = location.href
            }
        }, save_interval);
    }, initial_delay)
})();