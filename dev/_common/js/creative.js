// Setup namespace for ad.
var creative = {};


creative.loadJSON = function(){
  // LOAD JSON FEED
  creative.xhr = new XMLHttpRequest();
  //creative.xhr.open( 'GET', 'https://playnow-proxy.poundandgrain.ca/json-proxy.php?url=https://jsonblob.com/api/jsonBlob/fdb4d82f-1abd-11ea-8c57-cf3af79b5e81', true );
  creative.xhr.open( 'GET', 'https://playnow-proxy.poundandgrain.ca/json-proxy.php?url=https://www.playnow.com/services2/lotto/jackpot', true );
  creative.xhr.onload = function () {
    var result = window.JSON.parse( creative.xhr.responseText );
    creative.populateAd(result.contents);
    console.log('no errors!');
  };
  creative.xhr.onerror = function () {
    //process error
    console.log('error processing json feed')
  };
  creative.xhr.send();
}


creative.populateAd = function (json) { 
  var lottoSum = json.LMAX.jackpot;
  var digit1 = (''+lottoSum)[0];
  var digit2 = (''+lottoSum)[1];
  const num1 = document.getElementById(`num_${digit1}`).cloneNode(true)
  const num2 = document.getElementById(`num_${digit2}`).cloneNode(true)

  num1.onload = ()=>{
    TweenLite.set(num1, {opacity:1, x:0})
    TweenLite.set(num2, {opacity:1, x:num1.width * .55})
  }

  console.log(digit1);


  document.getElementById("millions").append(num1)
  document.getElementById("millions").append(num2)
  
};

creative.init = function () {
  creative.setupDOMElements();

  // Check if Enabler is initialized.
  if (Enabler.isInitialized()) {
    // Check if ad is visible to user.
    if (Enabler.isVisible()) {
      creative.enablerInitHandler();
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.VISIBLE,
        creative.enablerInitHandler);
    }
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT,
      creative.enablerInitHandler);
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
    Enabler.addEventListener(
      studio.events.StudioEvent.PAGE_LOADED, creative.pageLoadHandler);
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

export {creative}
