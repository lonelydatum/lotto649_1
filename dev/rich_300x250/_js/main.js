import {txt, startF1, start_basic, start_rich} from '../../_common/js/common.js'
import {creative} from '../../_common/js/creative.js'




creative.loadJSON();
creative.showAd = ()=>{
    const tl = start_rich()    
	tl.from(".cta", .3, {opacity:0}, "+=.5")
}





creative.dynamicDataAvailable = function () { };









module.exports = {};

