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

creative.___populateAd = function (json) { 
    

    var lottoSum = json.SIX49.jackpot;
    // var lottoSum = 81000000;
    

    const millions = lottoSum/1000000
    const totalDigits = millions.toString().length

    console.log(lottoSum);
    console.log(millions);
    millions.toString().split("").map(item=>{
      console.log(item);
    })
    console.log(totalDigits);
    var digit1 = (''+lottoSum)[0];
    var digit2 = (''+lottoSum)[1];
    // var digit1 = "8"
    // var digit2 = "8"
    const num1 = document.getElementById(`num_${digit1}`).cloneNode(true)
    const num2 = document.getElementById(`num_${digit2}`).cloneNode(true)
    const end_2b = document.getElementById(`end_2b`)

    num1.onload = ()=>{
      let width = (num1.width * .5) 
      if(totalDigits===2){
        width = (num1.width * .5) + (num2.width*.62)
        TweenLite.set(num2, {opacity:1, x:num1.width * .62})
      }

      console.log(num1.width);
      
      
      TweenLite.set(num1, {opacity:1, x:0})
      
      
      TweenLite.set(end_2b, {x:width})
    }

    // console.log(digit1);


    document.getElementById("millions").append(num1)
    if(totalDigits===2){
        document.getElementById("millions").append(num2)
    }
    
}



const populateAd = function (json, callback) { 
    const end_2b = document.getElementById(`end_2b`)
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('jackpot');
    

    var lottoSum = myParam || json.SIX49.jackpot
    
    

    const millions = lottoSum/1000000
    const totalDigits = millions.toString().length

    const numList = []
    
    const promList = millions.toString().split("").map(item=>{
      const num = document.getElementById(`num_${item}`).cloneNode(true)
      numList.push(num)
      const prom = new Promise((good, bad)=>{
        num.onload = good
      })

      document.getElementById("millions").append(num)
      return prom
    })

    let width = 0
    let x = 0
    Promise.all(promList).then(()=>{
      numList.map(item=>{
        width += (item.width*.5) + 7
        console.log(item.width, x);
        TweenLite.set(item, {opacity:1, x:x})
        x = width
      })

      
      TweenLite.set(end_2b, {x:x+13})
      callback()
    })

    


    
  
};

creative.populateAd = (json)=>{
  populateAd(json)
}

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

export {creative, populateAd}
