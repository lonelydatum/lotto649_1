(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var banner = document.getElementById('banner');
var size = { w: banner.offsetWidth, h: banner.offsetHeight };

TweenLite.defaultEase = Power2.easeInOut;

function txt(list) {
	var tl = new TimelineMax();
	list.map(function (item) {
		tl.from(item, .2, { opacity: 0, y: "-=10", ease: Power2.easeInOut }, "-=.1");
	});
	return tl;
}

function happyTxt() {
	var tl = txt([".t1a", ".t1b", ".t1c", ".t1d"]);
	tl.from(".brush", .3, { clip: "rect(0px, 0px, " + size.h + "px, 0px)" }, "-=.25");
	// tl.to(".word1", .3, {opacity:0}, "+=1")

	return tl;
}

function blinker() {
	var time = arguments.length <= 0 || arguments[0] === undefined ? .8 : arguments[0];

	var tl = new TimelineMax();

	tl.set(".frame.blinkFrame", { opacity: 1 });
	tl.add('blink_close');
	tl.from(".blink.top", time, { opacity: .6, y: "-100%", scale: 2 }, 'blink_close');
	tl.from(".blink.bottom", time, { opacity: .6, y: "100%", scale: 2 }, 'blink_close');
	tl.set([".endframe", ".frame.numbers", ".frame2", ".bg2"], { opacity: 1 });

	tl.add('blink_open', "-=0");

	tl.to(".blink.top", time * .7, { y: "-100%" }, 'blink_open');
	tl.to(".blink.bottom", time * .7, { y: "100%" }, 'blink_open');
	return tl;
}

function richText() {
	var tl = new TimelineMax();
	tl.from(".end_1", .3, { opacity: 0 });
	tl.from([".end_2a", "#millions", ".end_2b"], .3, { opacity: 0 });
	tl.from(".end_3", .3, { opacity: 0 }, "+=.3");
	return tl;
}

function startF1() {
	var tl = new TimelineMax();
	tl.set(".frame1", { opacity: 1 });
	// tl.add( txt([".t1a", ".t1b", ".t1c", ".t1d"]) )
	// tl.from(".brush", .5, {clip: `rect(0px, 0px, ${size.h}px, 0px)`})
	tl.add(happyTxt());
	tl.add(blinker(), "+=1.6");
	return tl;
}

function start_basic() {
	var tl = new TimelineMax();
	tl.add(startF1());
	tl.add(txt([".t2a", ".t2b", ".t2c", ".t2d"]), "+=.2");
	tl.from(".cta", .3, { opacity: 0 }, "+=.8");
	return tl;
}

function start_rich() {
	var tl = new TimelineMax();
	tl.add(startF1());
	tl.add(richText());
	return tl;
}

var helpers = {
	happyTxt: happyTxt, richText: richText, blinker: blinker
};

exports.size = size;
exports.start_basic = start_basic;
exports.start_rich = start_rich;
exports.startF1 = startF1;
exports.txt = txt;
exports.helpers = helpers;

},{}],2:[function(require,module,exports){
// Setup namespace for ad.
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var creative = {};

creative.loadJSON = function () {
  // LOAD JSON FEED
  creative.xhr = new XMLHttpRequest();
  //creative.xhr.open( 'GET', 'https://playnow-proxy.poundandgrain.ca/json-proxy.php?url=https://jsonblob.com/api/jsonBlob/fdb4d82f-1abd-11ea-8c57-cf3af79b5e81', true );
  creative.xhr.open('GET', 'https://playnow-proxy.poundandgrain.ca/json-proxy.php?url=https://www.playnow.com/services2/lotto/jackpot', true);
  creative.xhr.onload = function () {
    var result = window.JSON.parse(creative.xhr.responseText);
    creative.populateAd(result.contents);
    void 0;
  };
  creative.xhr.onerror = function () {
    //process error
    void 0;
  };
  creative.xhr.send();
};

creative.___populateAd = function (json) {

  var lottoSum = json.SIX49.jackpot;
  // var lottoSum = 81000000;

  var millions = lottoSum / 1000000;
  var totalDigits = millions.toString().length;

  void 0;
  void 0;
  millions.toString().split("").map(function (item) {
    void 0;
  });
  void 0;
  var digit1 = ('' + lottoSum)[0];
  var digit2 = ('' + lottoSum)[1];
  // var digit1 = "8"
  // var digit2 = "8"
  var num1 = document.getElementById('num_' + digit1).cloneNode(true);
  var num2 = document.getElementById('num_' + digit2).cloneNode(true);
  var end_2b = document.getElementById('end_2b');

  num1.onload = function () {
    var width = num1.width * .5;
    if (totalDigits === 2) {
      width = num1.width * .5 + num2.width * .62;
      TweenLite.set(num2, { opacity: 1, x: num1.width * .62 });
    }

    void 0;

    TweenLite.set(num1, { opacity: 1, x: 0 });

    TweenLite.set(end_2b, { x: width });
  };

  // console.log(digit1);

  document.getElementById("millions").append(num1);
  if (totalDigits === 2) {
    document.getElementById("millions").append(num2);
  }
};

var populateAd = function populateAd(json, callback) {
  var end_2b = document.getElementById('end_2b');
  var urlParams = new URLSearchParams(window.location.search);
  var myParam = urlParams.get('jackpot');

  var lottoSum = myParam || json.SIX49.jackpot;

  var millions = lottoSum / 1000000;
  var totalDigits = millions.toString().length;

  var numList = [];

  var promList = millions.toString().split("").map(function (item) {
    var num = document.getElementById('num_' + item).cloneNode(true);
    numList.push(num);
    var prom = new Promise(function (good, bad) {
      num.onload = good;
    });

    document.getElementById("millions").append(num);
    return prom;
  });

  var width = 0;
  var x = 0;
  Promise.all(promList).then(function () {
    numList.map(function (item) {
      width += item.width * .5 + 7;
      void 0;
      TweenLite.set(item, { opacity: 1, x: x });
      x = width;
    });

    TweenLite.set(end_2b, { x: x + 13 });
    callback();
  });
};

creative.populateAd = function (json) {
  populateAd(json);
};

creative.init = function () {
  creative.setupDOMElements();

  // Check if Enabler is initialized.
  if (Enabler.isInitialized()) {
    // Check if ad is visible to user.
    if (Enabler.isVisible()) {
      creative.enablerInitHandler();
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, creative.enablerInitHandler);
    }
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, creative.enablerInitHandler);
  }
};

creative.setupDOMElements = function () {
  creative.domElements = {};
  creative.domElements.exit_button = document.getElementById('pn-bg-exit');
  creative.domElements.casino_img = document.getElementById('endframe');
};

creative.enablerInitHandler = function (event) {
  creative.dynamicDataAvailable();

  creative.domElements.exit_button.addEventListener('click', creative.exitClickHandler);

  if (Enabler.isPageLoaded()) {
    creative.pageLoadHandler();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, creative.pageLoadHandler);
  }
};

creative.exitClickHandler = function (event) {
  Enabler.exit('exit', creative.dynamicExitUrl);
};

creative.pageLoadHandler = function (event) {
  // creative.domElements.casino_img.src = creative.dynamicData.Casino_Frame_Image.Url;

  creative.showAd();
};

// Is triggered when the background image in polite.js was fully loaded.

// Handle Animation

// Start creative once all elements in window are loaded.
window.addEventListener('load', creative.init.bind(creative));

exports.creative = creative;
exports.populateAd = populateAd;

},{}],3:[function(require,module,exports){
'use strict';

var _commonJsCommonJs = require('../../_common/js/common.js');

var _commonJsCreativeJs = require('../../_common/js/creative.js');

_commonJsCreativeJs.creative.loadJSON();
_commonJsCreativeJs.creative.showAd = function () {
				var tl = new TimelineMax();
				tl.set([".frame1", ".words"], { opacity: 1 });
				tl.add(_commonJsCommonJs.helpers.happyTxt());
				tl.add("blink", "+=1.8");
				tl.add(_commonJsCommonJs.helpers.blinker(.4), "blink");
				tl.to(".word1", .3, { opacity: 0 }, "blink");

				tl.set([".numbers"], { opacity: 1 });

				tl.add(_commonJsCommonJs.helpers.richText(), "-=.5");

				tl.from(".end_3", .3, { opacity: 0 }, "+=2");

				tl.from(".cta", .3, { opacity: 0 });

				tl.add("shift");

				tl.to(".bg2", .4, { x: -45 }, "shift");
				tl.to(".logo", .4, { x: -140 }, "shift");
				tl.from(".footer", .4, { x: "+=150" }, "shift");
};

_commonJsCreativeJs.creative.dynamicDataAvailable = function () {};

module.exports = {};

},{"../../_common/js/common.js":1,"../../_common/js/creative.js":2}]},{},[3])


//# sourceMappingURL=main.js.map
