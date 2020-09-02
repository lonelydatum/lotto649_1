import {txt, startF1, start_basic, start_rich, helpers} from '../../_common/js/common.js'
import {creative} from '../../_common/js/creative.js'





creative.showAd = ()=>{
    const tl = new TimelineMax()

    tl.to(".frame1", .3, {opacity:1})

    tl.add( helpers.happyTxt() )	
    tl.to(".frame1", .3, {opacity:0}, "+=2")
    tl.set(".frame3", {opacity:1})

    tl.add( txt([".t2a", ".t2b", ".t2c", ".t2d"]), "-=.3" )	
    tl.from(".cta", .3, {opacity:0}, "+=.7")


}





creative.dynamicDataAvailable = function () { };









module.exports = {};

