(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function start() {
	TweenLite.defaultEase = Power2.easeOut;
	var tl = new TimelineMax({ repeat: 1, repeatDelay: 2.5 });
	tl.set(".frame1", { opacity: 1 });
	tl.from(".t1", .5, { opacity: 0 }, "+=.2");

	tl.to(".t1", .3, { opacity: 0 }, "+=1.7");
	tl.from(".t2", .3, { opacity: 0 }, "+=.1");
}

start();

module.exports = {};

},{}]},{},[1])


//# sourceMappingURL=main.js.map
