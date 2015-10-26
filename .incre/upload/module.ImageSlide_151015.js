define("module.ImageSlide",function(require,exports,module){function t(t){return""===s?t:(t=t.charAt(0).toUpperCase()+t.substr(1),s+t)}var e=document.createElement("div").style,s=function(){for(var t,s="t,webkitT,MozT,msT,OT".split(","),i=0,a=s.length;a>i;i++)if(t=s[i]+"ransform",t in e)return s[i].substr(0,s[i].length-1);return!1}(),i=s?"-"+s.toLowerCase()+"-":"",a=t("transform"),n=t("transitionDuration"),h=t("perspective")in e,o="ontouchstart"in window,r=(t("transition")in e,h?" translateZ(0)":""),p="onorientationchange"in window?"orientationchange":"resize",g=o?"touchstart":"mousedown",d=o?"touchmove":"mousemove",c=o?"touchend":"mouseup",l=o?"touchcancel":"mouseup",m=function(){if(s===!1)return!1;var t={"":"transitionend",webkit:"webkitTransitionEnd",Moz:"transitionend",O:"oTransitionEnd",ms:"MSTransitionEnd"};return t[s]}(),u=function(t,e){var a,n,h,o;this.wrapper="string"==typeof t?document.querySelector(t):t,this.options={text:null,numberOfPages:3,snapThreshold:null,hastyPageFlip:!1,loop:!0,autoPlay:!0};for(a in e)this.options[a]=e[a];for(this.wrapper.style.overflow="hidden",this.wrapper.style.position="relative",this.masterPages=[],n=document.createElement("div"),n.id="swipeview-slider",n.style.cssText="position:relative;top:0;height:100%;width:100%;"+i+"transition-duration:0;"+i+"transform:translateZ(0);"+i+"transition-timing-function:ease-out",this.wrapper.appendChild(n),this.slider=n,this.refreshSize(),a=-1;2>a;a++)n=document.createElement("div"),n.id="swipeview-masterpage-"+(a+1),n.style.cssText=i+"transform:translateZ(0);position:absolute;top:0;height:100%;width:100%;left:"+100*a+"%",n.dataset||(n.dataset={}),o=-1==a?this.options.numberOfPages-1:a,n.dataset.pageIndex=o,n.dataset.upcomingPageIndex=o,this.options.loop||-1!=a||(n.style.visibility="hidden"),this.slider.appendChild(n),this.masterPages.push(n);if(h=this.masterPages[1].className,this.masterPages[1].className=h?h+" swipeview-active":"swipeview-active",window.addEventListener(p,this,!1),this.wrapper.addEventListener(g,this,!1),this.wrapper.addEventListener(d,this,!1),this.wrapper.addEventListener(c,this,!1),this.slider.addEventListener(m,this,!1),this.options.autoPlay){var r=this;this.timer=setTimeout(function(){r.next()},r.options.delay||2e3)}"O"==s&&this.slider.addEventListener(m.toLowerCase(),this,!1)};u.prototype={currentMasterPage:1,x:0,page:0,pageIndex:0,customEvents:[],onFlip:function(t){this.wrapper.addEventListener("swipeview-flip",t,!1),this.customEvents.push(["flip",t])},onMoveLeft:function(t){this.wrapper.addEventListener("swipeview-moveleft",t,!1),this.customEvents.push(["moveleft",t])},onMoveEnd:function(t){this.wrapper.addEventListener("swipeview-moveend",t,!1),this.customEvents.push(["moveend",t])},onMoveOut:function(t){this.wrapper.addEventListener("swipeview-moveout",t,!1),this.customEvents.push(["moveout",t])},onMoveIn:function(t){this.wrapper.addEventListener("swipeview-movein",t,!1),this.customEvents.push(["movein",t])},onTouchStart:function(t){this.wrapper.addEventListener("swipeview-touchstart",t,!1),this.customEvents.push(["touchstart",t])},onTouchEnd:function(t){this.wrapper.addEventListener("swipeview-touchend",t,!1),this.customEvents.push(["touchend",t])},destroy:function(){for(;this.customEvents.length;)this.wrapper.removeEventListener("swipeview-"+this.customEvents[0][0],this.customEvents[0][1],!1),this.customEvents.shift();window.removeEventListener(p,this,!1),this.wrapper.removeEventListener(g,this,!1),this.wrapper.removeEventListener(d,this,!1),this.wrapper.removeEventListener(c,this,!1),this.slider.removeEventListener(m,this,!1)},refreshSize:function(){this.wrapperWidth=this.wrapper.clientWidth,this.wrapperHeight=this.wrapper.clientHeight,this.pageWidth=this.wrapperWidth,this.maxX=-this.options.numberOfPages*this.pageWidth+this.wrapperWidth,this.snapThreshold=null===this.options.snapThreshold?Math.round(.15*this.pageWidth):/%/.test(this.options.snapThreshold)?Math.round(this.pageWidth*this.options.snapThreshold.replace("%","")/100):this.options.snapThreshold},updatePageCount:function(t){this.options.numberOfPages=t,this.maxX=-this.options.numberOfPages*this.pageWidth+this.wrapperWidth},goToPage:function(t){var e;for(this.masterPages[this.currentMasterPage].className=this.masterPages[this.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/,""),e=0;3>e;e++)className=this.masterPages[e].className,/(^|\s)swipeview-loading(\s|$)/.test(className)||(this.masterPages[e].className=className?className+" swipeview-loading":"swipeview-loading");t=0>t?0:t>this.options.numberOfPages-1?this.options.numberOfPages-1:t,this.page=t,this.pageIndex=t,this.slider.style[n]="0s",this.__pos(-t*this.pageWidth),this.currentMasterPage=this.page+1-3*Math.floor((this.page+1)/3),this.masterPages[this.currentMasterPage].className=this.masterPages[this.currentMasterPage].className+" swipeview-active",0===this.currentMasterPage?(this.masterPages[2].style.left=100*this.page-100+"%",this.masterPages[0].style.left=100*this.page+"%",this.masterPages[1].style.left=100*this.page+100+"%",this.masterPages[2].dataset.upcomingPageIndex=0===this.page?this.options.numberOfPages-1:this.page-1,this.masterPages[0].dataset.upcomingPageIndex=this.page,this.masterPages[1].dataset.upcomingPageIndex=this.page==this.options.numberOfPages-1?0:this.page+1):1==this.currentMasterPage?(this.masterPages[0].style.left=100*this.page-100+"%",this.masterPages[1].style.left=100*this.page+"%",this.masterPages[2].style.left=100*this.page+100+"%",this.masterPages[0].dataset.upcomingPageIndex=0===this.page?this.options.numberOfPages-1:this.page-1,this.masterPages[1].dataset.upcomingPageIndex=this.page,this.masterPages[2].dataset.upcomingPageIndex=this.page==this.options.numberOfPages-1?0:this.page+1):(this.masterPages[1].style.left=100*this.page-100+"%",this.masterPages[2].style.left=100*this.page+"%",this.masterPages[0].style.left=100*this.page+100+"%",this.masterPages[1].dataset.upcomingPageIndex=0===this.page?this.options.numberOfPages-1:this.page-1,this.masterPages[2].dataset.upcomingPageIndex=this.page,this.masterPages[0].dataset.upcomingPageIndex=this.page==this.options.numberOfPages-1?0:this.page+1),this.__flip()},next:function(){if((this.options.loop||this.x!=this.maxX)&&(this.directionX=-1,this.x-=1,this.__checkPosition(),this.options.autoPlay)){var t=this;this.timer=setTimeout(function(){t.next()},t.options.delay||2e3)}},prev:function(){(this.options.loop||0!==this.x)&&(this.directionX=1,this.x+=1,this.__checkPosition())},handleEvent:function(t){switch(t.type){case g:this.__start(t);break;case d:this.__move(t);break;case l:case c:this.__end(t);break;case p:this.__resize();break;case m:case"otransitionend":t.target!=this.slider||this.options.hastyPageFlip||this.__flip()}},__pos:function(t){this.x=t,this.slider.style[a]="translate("+t+"px,0)"+r},__resize:function(){this.refreshSize(),this.slider.style[n]="0s",this.__pos(-this.page*this.pageWidth)},__start:function(t){if(!this.initiated){var e=o?t.touches[0]:t;this.initiated=!0,this.moved=!1,this.thresholdExceeded=!1,this.startX=e.pageX,this.startY=e.pageY,this.pointX=e.pageX,this.pointY=e.pageY,this.stepsX=0,this.stepsY=0,this.directionX=0,this.directionLocked=!1,this.slider.style[n]="0s",this.__event("touchstart")}},__move:function(t){if(this.initiated){var e=o?t.touches[0]:t,s=e.pageX-this.pointX,i=e.pageY-this.pointY,a=this.x+s,n=Math.abs(e.pageX-this.startX);if(this.moved=!0,this.pointX=e.pageX,this.pointY=e.pageY,this.directionX=s>0?1:0>s?-1:0,this.stepsX+=Math.abs(s),this.stepsY+=Math.abs(i),!(this.stepsX<10&&this.stepsY<10)){if(!this.directionLocked&&this.stepsY>this.stepsX)return void(this.initiated=!1);t.preventDefault(),this.directionLocked=!0,!this.options.loop&&(a>0||a<this.maxX)&&(a=this.x+s/2),!this.thresholdExceeded&&n>=this.snapThreshold?(this.thresholdExceeded=!0,this.__event("moveout")):this.thresholdExceeded&&n<this.snapThreshold&&(this.thresholdExceeded=!1,this.__event("movein")),s>0&&this.__event("moveleft"),this.__pos(a)}}},__end:function(t){if(clearTimeout(this.timer),this.initiated){var e=o?t.changedTouches[0]:t,s=Math.abs(e.pageX-this.startX);if(this.initiated=!1,this.__event("moveend"),this.moved){if(!this.options.loop&&(this.x>0||this.x<this.maxX)&&(s=0,this.__event("movein")),s<this.snapThreshold)return this.slider.style[n]=Math.floor(300*s/this.snapThreshold)+"ms",void this.__pos(-this.page*this.pageWidth);var i=this;this.timer=setTimeout(function(){i.next()},3e3),this.__checkPosition()}}},__checkPosition:function(){var t,e,s;this.masterPages[this.currentMasterPage].className=this.masterPages[this.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/,""),this.directionX>0?(this.page=-Math.ceil(this.x/this.pageWidth),this.currentMasterPage=this.page+1-3*Math.floor((this.page+1)/3),this.pageIndex=0===this.pageIndex?this.options.numberOfPages-1:this.pageIndex-1,t=this.currentMasterPage-1,t=0>t?2:t,this.masterPages[t].style.left=100*this.page-100+"%",e=this.page-1):(this.page=-Math.floor(this.x/this.pageWidth),this.currentMasterPage=this.page+1-3*Math.floor((this.page+1)/3),this.pageIndex=this.pageIndex==this.options.numberOfPages-1?0:this.pageIndex+1,t=this.currentMasterPage+1,t=t>2?0:t,this.masterPages[t].style.left=100*this.page+100+"%",e=this.page+1),s=this.masterPages[this.currentMasterPage].className,/(^|\s)swipeview-active(\s|$)/.test(s)||(this.masterPages[this.currentMasterPage].className=s?s+" swipeview-active":"swipeview-active"),s=this.masterPages[t].className,/(^|\s)swipeview-loading(\s|$)/.test(s)||(this.masterPages[t].className=s?s+" swipeview-loading":"swipeview-loading"),e-=Math.floor(e/this.options.numberOfPages)*this.options.numberOfPages,this.masterPages[t].dataset.upcomingPageIndex=e,newX=-this.page*this.pageWidth,this.slider.style[n]=Math.floor(500*Math.abs(this.x-newX)/this.pageWidth)+"ms",this.options.loop||(this.masterPages[t].style.visibility=0===newX||newX==this.maxX?"hidden":""),this.x==newX?this.__flip():(this.__pos(newX),this.options.hastyPageFlip&&this.__flip())},__flip:function(){this.__event("flip");for(var t=0;3>t;t++)this.masterPages[t].className=this.masterPages[t].className.replace(/(^|\s)swipeview-loading(\s|$)/,""),this.masterPages[t].dataset.pageIndex=this.masterPages[t].dataset.upcomingPageIndex},__event:function(t){var e=document.createEvent("Event");e.initEvent("swipeview-"+t,!0,!0),this.wrapper.dispatchEvent(e)}};var v=!1,f=function(t){var e=this;this.config=t,this.body=t.body,this.nav=t.nav,this.slides=[],e.init(),e.events()};return f.prototype.events=function(){var t=this;$(window).on("orientationchange",function(e){t.fixBodyCss()})},f.prototype.fixBodyCss=function(){var t,e,s=this,i=$(window).width(),a=$(window).height();i>a?(t=a+"px",e=parseInt(a*(s.config.scale||5/16))+"px"):(t=i+"px",e=parseInt(i*(s.config.scale||5/16))+"px"),$(s.body).css("width",t),s.gallery&&s.gallery.refreshSize()},f.prototype.init=function(){var t=this,e="selected",s=0;if(t.fixBodyCss(),0==t.slides.length&&$("li",t.nav).each(function(e,s){t.slides.push({img:$(s).attr("crs"),href:$(s).attr("href")})}),0==t.slides.length&&t.config.noImgFun)return void t.config.noImgFun();t.gallery=new u(t.body.length>0?t.body[0]:t.body,_.extend({numberOfPages:t.slides.length},t.config));for(var i=0;3>i;i++)s=0==i?t.slides.length-1:i-1,t.gallery.masterPages[i].innerHTML='<a href = "'+t.slides[s].href+(t.config.boss?'" boss="'+t.config.boss:"")+'"><img crs="'+t.slides[s].img+'" src="http://mat1.gtimg.com/auto/images/mobi/slide.png" style = "width:100%;"></a>';$("img",t.body).each(function(e,s){var i=$(s).attr("crs");i&&(s.onload=function(e){$(".default",t.body).remove(),$(t.nav).show()},s.onerror=function(e){$(".default",t.body).remove(),s.src="http://mat1.gtimg.com/auto/images/mobi/slide.png"},s.src=i)}),t.gallery.onFlip(function(){var s,i,a;for(a=0;3>a;a++)i=t.gallery.masterPages[a].dataset.upcomingPageIndex,i!=t.gallery.masterPages[a].dataset.pageIndex&&(s=t.gallery.masterPages[a].querySelector("img"),s.src=t.slides[i].img);$("."+e,t.nav).removeClass(e),$($("li",t.nav)[t.gallery.pageIndex]).addClass(e)}),t.gallery.onTouchStart(function(){v="0"}),t.gallery.onTouchEnd(function(){v="1"})},window.canSwipeClose=function(){return v?"0":"1"},f});