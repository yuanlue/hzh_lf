(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.PipCanvas = factory());
}(this, (function () { 'use strict';

    class PipCanvas {
        constructor({
            el,
            imgList = [],
            radio = 1,
            sequence = 0,
            index = 0,
            scale = 0.992,
            scaleReturn = 0.8,
            answer = 0,
            w = 750,
            h = 1448,
            gif_timer = null,
            gifImgs = [],
        }) {
            this.imgList = imgList;
            this.radio = radio;
            this.index = index;
            this.sequence =sequence;
            this.scale = scale;
            this.scaleReturn = scaleReturn;
            this.w = w;
            this.h = h;
            this.answer = answer,
            this.gif_timer = gif_timer;
            this.gifImgs = gifImgs;
            this.canvas = $(el)[0];
            this.ctx = this.canvas.getContext('2d');
        }
        loadGifImg() {
            const loadPromises = this.gifImgs.map(
                item =>
                    new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = item;
                        img.onload = () => resolve(img);
                        img.onerror = () => reject();
                    }),
            );
            return Promise.all(loadPromises);
        }
        loadPageImg() {
            const loadPromises = this.imgList.map(
                (item, index) =>
                    new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = item.link;
                        img.i = index;
                        img.name = index;
                        img.className = 'item';
                        item.image = img;
                        img.onload = () => {
                            $('.collection').append(item.image);
                            resolve();
                        };
                        img.onerror = () => reject();
                    }),
            );
            return Promise.all(loadPromises);
        }
        async init() {
       
            // this.gifImgs = [],
            // console.log('init', new Date().getTime());
            $('.text img:first-child').fadeIn(1000)
            await this.loadPageImg();
            if (this.gifImgs.length > 0) {
                await this.loadGifImg();
            }
            // console.log('loadimg', new Date().getTime());
            this.domList = $('.collection .item').sort(function(i, t) {
                return i.name - t.name;
            });
            this.containerImage = this.domList[this.index + 1];
            this.innerImage = this.domList[this.index];
            this.draw();
            setTimeout(() => {
                    $('.opera').fadeIn()
            }, 1000);
           

           
        }
        touchHandler(e) {
            let t = this
            e.stopPropagation();
           
            $('#opera span').removeClass('heartBeat')
         
            // e.preventDefault();
            const render = () => {
                // console.log(this.pause)

                if($('.rl').css('display')=='flex'){
                    cancelAnimationFrame(this.timer);
                    this.sequence++;
                    if(this.sequence >=30){
                        this.sequence = 0
                        $(".rl").addClass('big')
                        setTimeout(() => {
                            $('.rl').hide()
                        }, 1500);
                        cancelAnimationFrame(this.timer);
                        return 
                    }
                    $('.a_rl').css('background-position',`-${this.sequence * 740}px 0`)
                    t.set = setTimeout(()=>{
                         t.timer = requestAnimationFrame(render);
                        　　}, 1000 / 20);
                    return 
                }
                this.radio = this.radio * this.scale;
                this.timer = requestAnimationFrame(render);
                this.draw();
        
            
                

                // console.log(parseFloat(this.radio).toFixed(1))
              
                
            };
            cancelAnimationFrame(this.timer);
            this.willPause = false;
            // clearInterval(this.gif_timer);
            this.timer = requestAnimationFrame(render);
        }
        touchendHandler(e) {
            $('#opera span').addClass('heartBeat')
            this.willPause = false;
            cancelAnimationFrame(this.timer);
            clearTimeout(this.set)
        
            return 
            // if (this.imgList[this.index + 1] && this.imgList[this.index + 1].gif) {
            //     this.willPause = true;
            // } else {
            //     this.willPause = false;
            //     cancelAnimationFrame(this.timer);
            // }
          
        }
        draw() {
            //  console.log(this.index)
            // console.log(this.radio)
            // console.log(parseFloat(this.radio).toFixed(2))
            if(parseFloat(this.radio).toFixed(2) ==0.99 && this.index!=5){
                this.scale = 0.992
                $('.text img').fadeOut()
            }
            if(parseFloat(this.radio).toFixed(2) ==0.55 ){
                    this.scale = 0.996
                // cancelAnimationFrame(this.timer)
                // this.touchHandler(this,2000)
                if(this.index == 0){
                    $('.text img:nth-child(2)').fadeIn()
                }else if(this.index == 1){
                    $('.text img:nth-child(3)').fadeIn()

                }else if(this.index == 2){
                    $('.text img:nth-child(4)').fadeIn()
                }
                else if(this.index == 3){
                    $('.text img:nth-child(5)').fadeIn()
                }
                else if(this.index == 4){
                    $('.text img:nth-child(6)').fadeIn()
                }
               
            }
            if (this.index + 1 != this.imgList.length) {
                // console.log(this.imgList.length)
                if (
                    this.radio <
                    this.imgList[this.index + 1].areaW / this.imgList[this.index + 1].imgW
                ) {
                    if (this.willPause) {
                        // console.log('1')
                        this.radio =
                        this.imgList[this.index + 1].areaW / this.imgList[this.index + 1].imgW;
                        cancelAnimationFrame(this.timer);
                    }
                    this.index++;
                    this.radio = 1;
                    if (!this.imgList[this.index + 1]) {
                        this.showEnd();
                    }
                }
                
                this.imgNext = this.imgList[this.index + 1];
               
                this.imgCur = this.imgList[this.index];
                this.containerImage = this.domList[this.index + 1];
                this.innerImage = this.domList[this.index];
                // console.log(this.innerImage)
                // if(!this.imgW){
                //     return 
                // }
                try{
                        this.drawImgOversize(
                        this.containerImage,
                        this.imgNext.imgW,
                        this.imgNext.imgH,
                        this.imgNext.areaW,
                        this.imgNext.areaH,
                        this.imgNext.areaL,
                        this.imgNext.areaT,
                        this.radio,
                    ),
                            this.drawImgMinisize(
                            this.innerImage,
                            this.imgCur.imgW,
                            this.imgCur.imgH,
                            this.imgNext.imgW,
                            this.imgNext.imgH,
                            this.imgNext.areaW,
                            this.imgNext.areaH,
                            this.imgNext.areaL,
                            this.imgNext.areaT,
                            this.radio,
                        );
                }catch(e){
                    // console.log(e)
                }
             
            }
        }
        show(imgobj, min, action, name) {
            //fadeInDown fadeInUp fadeIn fadeInLeft fadeInRight
            if (name) {
                imgobj.css({'visibility':'visible', 'display': name, '-webkit-animation-duration': min + 's' }).addClass(action);
                return
            }
            imgobj.css({ 'display': 'flex', '-webkit-animation-duration': min + 's' }).addClass(action);
    
    
        }
        showEnd() {
            let t = this
            this.show($('.pop_phone'),2,'fadeIn')
            $('.phone_t').show()
            $('.p_text img').each(function(index){
                setTimeout(() => {
                    t.show($(this),.6,'fadeIn','block')
                    //$(this).fadeIn(600)
                }, index*800);
                
            })
            setTimeout(() => {
                $('.phone_t').fadeOut(600,function(){
                    t.show($('.circle'),1,'fadeIn')
                })
                $('.circle').click(()=>{
                    $('.circle').hide()
                    if($('.phone').hasClass('slideInUp')){
                        return 
                    }
                    this.show($('.phone'),1,'slideInUp')
                })
                $('.p_opera').click(function(){
                    if(!$('.phone').hasClass('slideInUp')){
                        return 
                    }
                    $('.hb .copyright').hide()
                    $('.r_main .copyright img').attr('src','/images/gq/bb/copy_right2.png')
                
                })
                $('.p_label').click(function(){
                    $('.p_label').removeClass('active')
                    t.answer = $(this).attr('data-score');
                    $(this).addClass('active')
                })
            }, 12500);
        }
        drawImgOversize(i, t, e, a, s, n, g, r) {
        
            this.ctx.drawImage(
                i,
                n - (a / r - a) * (n / (t - a)),
                g - (s / r - s) * (g / (e - s)),
                a / r,
                s / r,
                0,
                0,
                750,
                1448,
            );
        }
        drawImgMinisize(i, t, e, a, s, n, g, r, m, h) {
            // console.log(h)
      
            this.ctx.drawImage(
                i,
                0,
                0,
                t,
                e,
                ((n / h - n) * (r / (a - n)) * h * 750) / n,
                ((g / h - g) * (m / (s - g)) * h * 1448) / g,
                750 * h,
                1448 * h,
            );
        }
        drawSprite(i, t, e, a, s, n, g) {
            var r = s[a];
            this.ctx.drawImage(i, r[0], r[1], r[2], r[3], t, e, n, g);
        }
        clear(){
            this.ctx.clearRect(0,0,750,1448);  
        }
    }

    return PipCanvas;

})));
