import {txt, startF1, start_basic, start_rich} from '../../_common/js/common.js'
import {creative} from '../../_common/js/creative.js'




creative.loadJSON();
creative.showAd = ()=>{
    const tl = new TimelineMax()

    tl.to(".frame1", .3, {opacity:1})

    tl.to([".frame1"], .3, {opacity:0}, "+=3")
    tl.set(".frame3", {opacity:1})

    tl.from(".t2", .3, {opacity:0})
    tl.from(".cta", .3, {opacity:0}, "+=.7")


}





creative.dynamicDataAvailable = function () { };









module.exports = {};

