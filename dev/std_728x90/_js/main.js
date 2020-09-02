import {txt, startF1, start_basic, start_rich, helpers} from '../../_common/js/common.js'
import {creative} from '../../_common/js/creative.js'





creative.showAd = ()=>{
    const tl = new TimelineMax()
	tl.set([".frame1", ".words"], {opacity:1})
	tl.add( helpers.happyTxt() )

	tl.add("blink", "+=1")
	tl.add( helpers.blinker(.4), "blink" )
	tl.to(".word1", .3, {opacity:0}, "blink")
	

	tl.add( txt([".t2a", ".t2b", ".t2c", ".t2d"]), "-=.3" )	

	
	
	tl.from(".cta", .3, {opacity:0})

	tl.add("shift")

	tl.to(".logo", .3, {x:-140}, "shift")
	tl.from(".footer", .4, {x:"+=150"}, "shift+=.1")
	


}





creative.dynamicDataAvailable = function () { };









module.exports = {};

