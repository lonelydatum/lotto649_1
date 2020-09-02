import {txt, startF1, start_basic, start_rich} from '../../_common/js/common.js'
import {creative} from '../../_common/js/creative.js'




creative.loadJSON();
creative.showAd = ()=>{
    const tl = start_rich()
    tl.to(".end_3", .3, {opacity:0}, "+=2")
    tl.from(".footer", .3, {opacity:0})
	tl.from(".cta", .3, {opacity:0})
}





creative.dynamicDataAvailable = function () { };









module.exports = {};

