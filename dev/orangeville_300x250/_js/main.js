function start(){
	TweenLite.defaultEase = Power2.easeOut
	const tl = new TimelineMax({repeat:1, repeatDelay:2.5})
	tl.set(".frame1", {opacity:1})
	tl.from(".t1", .5, {opacity:0}, "+=.2")
	
	tl.to(".t1", .3, {opacity:0}, "+=1.7")
	tl.from(".t2", .3, {opacity:0}, "+=.1")
}

start()


module.exports = {};

