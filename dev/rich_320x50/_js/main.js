import {txt, startF1, start_basic, start_rich} from '../../_common/js/common.js'
import {creative, populateAd} from '../../_common/js/creative.js'





creative.showAd = ()=>{

	 	// LOAD JSON FEED
	  creative.xhr = new XMLHttpRequest();
	  //creative.xhr.open( 'GET', 'https://playnow-proxy.poundandgrain.ca/json-proxy.php?url=https://jsonblob.com/api/jsonBlob/fdb4d82f-1abd-11ea-8c57-cf3af79b5e81', true );
	  creative.xhr.open( 'GET', 'https://playnow-proxy.poundandgrain.ca/json-proxy.php?url=https://www.playnow.com/services2/lotto/jackpot', true );
	  creative.xhr.onload = function () {
	    var result = window.JSON.parse( creative.xhr.responseText );
	    creative.makeDigital(result.contents);
	    console.log('no errors!');
	  };
	  creative.xhr.onerror = function () {
	    //process error
	    console.log('error processing json feed')
	  };
	  creative.xhr.send();




}

creative.makeDigital = function (json) { 

 populateAd(json, ()=>{    
    TweenLite.set(".numbers", {opacity:1})
    const tl = new TimelineMax()
    tl.to(".frame1", .3, {opacity:1})

    tl.to([".frame1"], .3, {opacity:0}, "+=3")
    tl.set(".frame3", {opacity:1})

    tl.from(".t2", .3, {opacity:0})
    tl.from(".cta", .3, {opacity:0}, "+=.7")
 })

   
}

 


creative.dynamicDataAvailable = function () { };









module.exports = {};

