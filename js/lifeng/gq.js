

var pipCanvas = new PipCanvas(config);

window.onload=function(){
    
	var queue = new createjs.LoadQueue(false);
	queue.maintainScriptOrder = true;

	queue.installPlugin(createjs.Sound);
	queue.on("progress", handleLoading, this);
	queue.on("complete", handleComplete, this);
	queue.loadManifest([
        { src: "/images/gq/1.jpg" },
		{ src: "/images/gq/2.jpg" },
		{ src: "/images/gq/3.jpg" },
		{ src: "/images/gq/4.jpg" },
        { src: "/images/gq/5.jpg" },
        { src: "/images/gq/zi.png" },
        { src: "/images/gq/zi2.png" },
        { src: "/images/gq/zi3.png" },
        { src: "/images/gq/zi4.png" },
        { src: "/images/gq/zi5.png" },
        { src: "/images/gq/phone/A.png" },
        { src: "/images/gq/phone/B.png" },
        { src: "/images/gq/phone/C.png" },
        { src: "/images/gq/phone/D.png" },
        { src: "/images/gq/phone/btn.png" },
        { src: "/images/gq/phone/phone.png" },
        { src: "/images/gq/phone/circle.png" },
        { src:"/images/gq/bb/bg.jpg"},
        { src:"/images/gq/bb/logo.png"},
        { src:"/images/gq/bb/btn1.png"},
        { src:"/images/gq/bb/btn2.png"},
        { src:"/images/gq/bb/btn3.png"},
        { src:"/images/gq/bb/btn3.png"},
        { src:"/images/gq/bb/icon1.png"},
        { src:"/images/gq/bb/icon2.png"},
        { src:"/images/gq/bb/icon3.png"},
        { src:"/images/gq/bb/icon0.png"},
        { src:"/images/gq/bb/text1.png"},
        { src:"/images/gq/bb/text2.png"},
        { src:"/images/gq/bb/text3.png"},
        { src:"/images/gq/bb/text4.png"},
        { src:"/images/gq/bb/text5.png"},
        { src:"/images/gq/text/1.png"},
        { src:"/images/gq/text/2.png"},
        { src:"/images/gq/text/3.png"},
        { src:"/images/gq/text/4.png"},
        { src:"/images/gq/text/5.png"},
        { src:"/images/gq/text/6.png"},
        { src:"/images/gq/text/7.png"},
        { src:"/images/gq/text/8.png"},
        { src:"/images/gq/text/9.png"},
        { src:"/images/gq/text/10.png"},
        { src:"/images/gq/text/11.png"},
        { src:"/images/gq/text/12.png"},
        { src:"/images/gq/text/13.png"},
        { src:"/images/gq/rl.png"},
        { src:"/images/gq/load.png"}


    ]);
   
	function handleLoading(event) {
        let w = event.progress.toFixed(2) * 100
        $('.l_progress').width(w+'%')
    }
    
	function handleComplete(event) {
        let n = 0
        let t = 0
        document.getElementById('opera').addEventListener('touchstart', pipCanvas.touchHandler.bind(pipCanvas));
        document.getElementById('opera').addEventListener('touchend', pipCanvas.touchendHandler.bind(pipCanvas));
    
            //没有抽过
            setTimeout(() => {
                $('.loading').fadeOut(1000)
                $('.r_main>img').attr('src',`/images/gq/bb/text${n}.png`)

                $('.goods>img').attr('src',`/images/gq/bb/icon${n}.png?1`)
                $('.rl').css('display','flex')
                setTimeout(() => {
                    show(  $('.rl_text'),1,'fadeIn')
                }, 1000);
                pipCanvas.init(); 
            }, 2000);
        
     
     
     
      

	}

}
