/**
 * ImageSlide组件
 *
 * 参考
 * SwipeView v1.0 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 *
 * SwipeView v1.0组件，iOS系统，如果在图片上方放置内容，图片在swipe时，内容会有闪现的问题
 * 
 * @todo 
 * 1、自动播放
 * 2、循环播放
 * 3、ios滑动效果优化
 */

define('module.ImageSlide', function(require, exports, module){
  var dummyStyle = document.createElement('div').style,
    vendor = (function () {
      var vendors = 't,webkitT,MozT,msT,OT'.split(','),
        t,
        i = 0,
        l = vendors.length;

      for ( ; i < l; i++ ) {
        t = vendors[i] + 'ransform';
        if ( t in dummyStyle ) {
          return vendors[i].substr(0, vendors[i].length - 1);
        }
      }

      return false;
    })(),
    cssVendor = vendor ? '-' + vendor.toLowerCase() + '-' : '',

    // Style properties
    transform = prefixStyle('transform'),
    // transitionDuration = prefixStyle('transitionDuration'),
    TRANSFORM = {
      SWIPELEFT : 'swipe left',//向左快速滑动
      AUTOSWIPELEFT : 'auto swipe left',//自动向左滑动
      SWIPERIGHT : 'swipe right',//向右快速滑动
      DRAGLEFT : 'drag left',//向左拖拽移动
      DRAGRIGHT : 'drag right',//向右拖拽移动
      DRAG : 'drag',//左右来回拖拽
      DRAGEND : 'drag end'//停止拖拽
    },

    // Browser capabilities
    has3d = prefixStyle('perspective') in dummyStyle,
    hasTouch = 'ontouchstart' in window,
    hasTransform = !!vendor,
    hasTransitionEnd = prefixStyle('transition') in dummyStyle,

    // Helpers
    translateZ = has3d ? ' translateZ(0)' : '',

    // Events
    resizeEvent = 'onorientationchange' in window ? 'orientationchange' : 'resize',
    startEvent = hasTouch ? 'touchstart' : 'mousedown',
    moveEvent = hasTouch ? 'touchmove' : 'mousemove',
    endEvent = hasTouch ? 'touchend' : 'mouseup',
    cancelEvent = hasTouch ? 'touchcancel' : 'mouseup',
    transitionEndEvent = (function () {
      if ( vendor === false ) return false;

      var transitionEnd = {
          ''      : 'transitionend',
          'webkit'  : 'webkitTransitionEnd',
          'Moz'   : 'transitionend',
          'O'     : 'oTransitionEnd',
          'ms'    : 'MSTransitionEnd'
        };

      return transitionEnd[vendor];
    })(),
    
  SwipeView = function (el, options) {
    var i,
      div,
      timer;

    this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
    this.options = {
      text: null,
      numberOfPages: 3,
      snapThreshold: null,
      hastyPageFlip: false,
      loop: true,
      autoPlay:true
    };
  
    // User defined options
    for (i in options) this.options[i] = options[i];
    this.options.imgCount = this.options.slides.length;

    this.wrapper.style.overflow = 'hidden';
    this.wrapper.style.position = 'relative';
    
    div = document.createElement('div');
    div.id = 'swipeview-slider';
    var css = '';
    var totalW = this.options.bodyW * 3;
    css = 'height:100%;width:' + totalW + 'px;';

    div.style.cssText = css;
    this.wrapper.appendChild(div);
    this.slider = div;
    X.css3(this.slider, 'transform', 'translate3d(-'+this.options.bodyW+'px, 0, 0)');

    this.refreshSize();

    this.initMasterPages();

    X.Crs(this.slider, {isold : true});

    window.addEventListener(resizeEvent, this, false);
    this.wrapper.addEventListener(startEvent, this, false);
    // this.wrapper.addEventListener(moveEvent, this, false);
    // this.wrapper.addEventListener(endEvent, this, false);
    this.slider.addEventListener(transitionEndEvent, this, false);
    if(this.options.autoPlay){
      var _this = this;
      this.timer = setInterval(function(){
        _this.next();
      },_this.options.delay || 2000);
    }
    // in Opera >= 12 the transitionend event is lowercase so we register both events
    if ( vendor == 'O' ) this.slider.addEventListener(transitionEndEvent.toLowerCase(), this, false);
  };

  SwipeView.prototype = {
    currentMasterPage: 1,
    x: 0,
    page: 0,
    customEvents: [],
    lastcur : null,

    initMasterPages : function(){
      var className;
      var imgCount = this.options.slides.length > 3 ? 3 : this.options.slides.length;
      var imgObj;
      var div;

      for (i = 0; i < imgCount; i++) {
        div = this.getEmptyDiv();
        
        if(this.options.cur == 0){// 当前第一张图
          if(i == imgCount - 1 && imgCount != 1 && i != 1){
            break;
          }
          imgObj = this.options.slides[this.options.cur + i];

          div.innerHTML = imgObj.html;
          $(this.slider).append(div);
        }
        else if(this.options.cur == imgCount - 1){
          if(i == imgCount - 1){
            break;
          }
          imgObj = this.options.slides[this.options.cur - i];

          div.innerHTML = imgObj.html;
          $(this.slider).prepend(div);
        }
        else{
          imgObj = this.options.slides[this.options.cur - 1 + i];

          div.innerHTML = imgObj.html;
          $(this.slider).append(div);
        }
      }

      if(this.options.cur == 0){
        div = this.getEmptyDiv();

        $(this.slider).prepend(div);
      }
      else if(this.options.cur == imgCount - 1){
        div = this.getEmptyDiv();

        $(this.slider).append(div);
      }
    },

    getEmptyDiv : function(){
      var div = document.createElement('div');
      div.style.cssText = 'height:100%;width:' + this.options.bodyW + 'px;float:left;';

      return div;
    },
    
    onFlip: function (fn) {
      this.wrapper.addEventListener('swipeview-flip', fn, false);
      this.customEvents.push(['flip', fn]);
    },
    
    /* add by aslinwang */
    onMoveLeft: function (fn) {
      this.wrapper.addEventListener('swipeview-moveleft', fn, false);
      this.customEvents.push(['moveleft', fn]);
    },

    /* add by aslinwang */
    onMoveEnd: function (fn) {
      this.wrapper.addEventListener('swipeview-moveend', fn, false);
      this.customEvents.push(['moveend', fn]);
    },

    onMoveOut: function (fn) {
      this.wrapper.addEventListener('swipeview-moveout', fn, false);
      this.customEvents.push(['moveout', fn]);
    },

    onMoveIn: function (fn) {
      this.wrapper.addEventListener('swipeview-movein', fn, false);
      this.customEvents.push(['movein', fn]);
    },
    
    onTouchStart: function (fn) {
      this.wrapper.addEventListener('swipeview-touchstart', fn, false);
      this.customEvents.push(['touchstart', fn]);
    },

    /* add by aslinwang */
    onTouchEnd: function (fn) {
      this.wrapper.addEventListener('swipeview-touchend', fn, false);
      this.customEvents.push(['touchend', fn]);
    },

    destroy: function () {
      while ( this.customEvents.length ) {
        this.wrapper.removeEventListener('swipeview-' + this.customEvents[0][0], this.customEvents[0][1], false);
        this.customEvents.shift();
      }
      
      // Remove the event listeners
      window.removeEventListener(resizeEvent, this, false);
      this.wrapper.removeEventListener(startEvent, this, false);
      // this.wrapper.removeEventListener(moveEvent, this, false);
      // this.wrapper.removeEventListener(endEvent, this, false);
      this.slider.removeEventListener(transitionEndEvent, this, false);

/*      if (!hasTouch) {
        this.wrapper.removeEventListener('mouseout', this, false);
      }*/
    },

    refreshSize: function () {
      this.wrapperWidth = this.wrapper.clientWidth;
      this.wrapperHeight = this.wrapper.clientHeight;
      this.pageWidth = this.wrapperWidth;
      this.maxX = -this.options.numberOfPages * this.pageWidth + this.wrapperWidth;
      this.snapThreshold = this.options.snapThreshold === null ?
        Math.round(this.pageWidth * 0.15) :
        /%/.test(this.options.snapThreshold) ?
          Math.round(this.pageWidth * this.options.snapThreshold.replace('%', '') / 100) :
          this.options.snapThreshold;
    },
    
    next: function () {
      this.__pos(TRANSFORM.AUTOSWIPELEFT, 0);
    },

    prev: function () {
      if (!this.options.loop && this.x === 0) return;

      this.directionX = 1;
      this.x += 1;
      this.__checkPosition();
    },

    handleEvent: function (e) {
      switch (e.type) {
        case startEvent:
          this.__start(e);
          break;
        case moveEvent:
          this.__move(e);
          break;
        case cancelEvent:
        case endEvent:
          this.__end(e);
          break;
        case resizeEvent:
          this.__resize();
          break;
        case transitionEndEvent:
        case 'otransitionend':
          // if (e.target == this.slider && !this.options.hastyPageFlip) this.__flip();
          break;
      }
    },

    /**
    *
    * Pseudo private methods
    *
    */
    __pos: function (type, data) {
      var _this = this, deltaX=0, duration = 200, cur = this.options.cur,scrollType;
      
      switch(type){
        case TRANSFORM.AUTOSWIPELEFT:
          duration = 400;
        case TRANSFORM.SWIPELEFT:
          if(this.options.cur == this.options.imgCount - 1){
            if(this.options.loop){
              this.options.cur = -1;
            }
            else{
              return false;
            }
          }
          this.options.cur++;
          deltaX = -this.options.bodyW;
          scrollType = true;
        break;
        case TRANSFORM.SWIPERIGHT:
          if(this.options.cur == 0){
            if(this.options.loop){
              this.options.cur = this.options.imgCount;
            }
            else{
              return false;
            }
          }
          this.options.cur--;
          deltaX = this.options.bodyW;
          scrollType = true;
        break;
        case TRANSFORM.DRAGEND:
          deltaX = 0;
          if(data == 0){
            scrollType = true;
          }
          else{
            scrollType = false;
          }
        break;
      }
    
      if(data){
        deltaX += data;
      }

      this.__moveTo(this.slider, {
        x : deltaX,
        y : 0,
        type : scrollType,
        scale : 1,
        duration : duration,
        callback : function(){
          _this.__checkPosition(type);
        }
      });
    },

    __moveTo : function(dom, options){
      var duration = options.duration || 200;
      options = options || {};
      var flag = options.type;
        
      //transition操作
      options.x = (-this.options.bodyW + options.x);
      if(!flag){
        X.css3(dom, 'transform', 'translate3d(' + (options.x) + 'px, ' + options.y + 'px, 0px) scale(' + options.scale + ')');
      }
      else{
        // ios在swipe的时候会有1s左右的停顿，怀疑是animate的原因，有空再查
        // 经排查，页面中DOM过多的话，使用translate会有卡顿的现象
        $(dom).animate({
          'translate3d' : options.x + 'px, ' + options.y + 'px, 0px',
          'scale' : options.scale
        },{
          duration : duration,
          complete : options.callback || null
        });
      }
    },

    __resize: function () {
      this.refreshSize();
      this.__pos(-this.page * this.pageWidth);
    },

    __start: function (e) {
      if (this.initiated) return;
      
      var e = hasTouch ? e.touches[0] : e;
      
      this.initiated = true;
      this.deltaPos = [0,0];
      this.orginPos = [e.pageX, e.pageY];
      this.orginTime = Date.now();
      
      this.wrapper.addEventListener(moveEvent, this, false);
      this.wrapper.addEventListener(endEvent, this, false);
      
      this.__event('touchstart');
    },
    
    __move: function (e) {
      if (!this.initiated) return;

      var _e = e;
      var e = hasTouch ? e.touches[0] : e;

      this.deltaPos = [e.pageX - this.orginPos[0], e.pageY - this.orginPos[1]];

      if(Math.abs(this.deltaPos[0]) > Math.abs(this.deltaPos[1])){//左右滑动
        _e.preventDefault();

        this.__pos(TRANSFORM.DRAG, this.deltaPos[0]);
      }
    },
    
    __end: function (e) {
      this.wrapper.removeEventListener(moveEvent, this, false);
      this.wrapper.removeEventListener(endEvent, this, false);

      this.initiated = false;
    
      var dura = Date.now() - this.orginTime;

      if(Math.abs(this.deltaPos[0]) > Math.abs(this.deltaPos[1])){//左右滑动
        var data;
        if(this.deltaPos[0] >= this.options.bodyW){
          this.deltaPos[0] = this.options.bodyW;
        }
        else if(this.deltaPos[0] <= -1 * this.options.bodyW){
          this.deltaPos[0] = -1 * this.options.bodyW;
        }

        if(dura > 500){
          type = TRANSFORM.DRAGEND;
          data = 0;
        }
        else{
          if(this.deltaPos[0] > 0){
            type = TRANSFORM.SWIPERIGHT;
          }
          else{
            type = TRANSFORM.SWIPELEFT;
          }
        }
        if(!this.options.loop){
          if((this.deltaPos[0] > 0 && this.options.cur == 0 || this.deltaPos[0] < 0 && this.options.cur == this.options.imgCount - 1)){//边界判断
            type = TRANSFORM.DRAGEND;
            data = 0;
          }
        }

        this.__pos(type, data);
      }
    },
    
    __checkPosition: function (type) {
      var imgObj;
      var div = this.getEmptyDiv();
      switch(type){
        case TRANSFORM.SWIPERIGHT:
          if(this.lastcur == 0){//已经到左边界
            if(!this.options.loop){
              return;
            }
          }
          if(this.options.cur == 0){
            if(this.options.loop){
              div.innerHTML = this.options.slides[this.options.imgCount - 1].html;
            }
            else{
              div.innerHTML = '';
            }
          }
          else{
            imgObj = this.options.slides[this.options.cur - 1];

            div.innerHTML = imgObj.html;
          }
          $(this.slider).prepend(div);
          $('div',this.slider).last().remove();
          X.css3($(this.slider), 'transform', 'translate3d(-' + this.options.bodyW + 'px, 0px, 0px)');
        break;
        case TRANSFORM.AUTOSWIPELEFT:
        case TRANSFORM.SWIPELEFT:
          if(this.lastcur + 1 >= this.options.imgCount){//已经到右边界
            if(!this.options.loop){
              return;
            }
          }
          if(this.options.cur + 1 >= this.options.imgCount){
            if(this.options.loop){
              div.innerHTML = this.options.slides[0].html;
            }
            else{
              div.innerHTML = '';
            }
          }
          else{
            imgObj = this.options.slides[this.options.cur + 1];

            div.innerHTML = imgObj.html;
          }
          $(this.slider).append(div);
          $('div',this.slider).first().remove();
          X.css3($(this.slider), 'transform', 'translate3d(-' + this.options.bodyW + 'px, 0px, 0px)');
        break;
      }
      X.Crs(this.slider, {isold : true});
      this.lastcur = this.options.cur;

      this.__flip();
    },
    
    __flip: function () {
      this.__event('flip');
    },
    
    __event: function (type) {
      var ev = document.createEvent("Event");
      
      ev.initEvent('swipeview-' + type, true, true);

      this.wrapper.dispatchEvent(ev);
    }
  };

  function prefixStyle (style) {
    if ( vendor === '' ) return style;

    style = style.charAt(0).toUpperCase() + style.substr(1);
    return vendor + style;
  }

  /**
   * ImageSlide
   * @param {Object} cfg 参数
   * @cfg {DOMElement} body slider容器
   * @cfg {DOMElement} nav 导航容器
   * @cfg {Function} noImgFun 不含图片的处理函数
   */
  var ImageSlide = function(cfg){
    var _this = this;
    this.config = cfg;
    this.body = cfg.body;
    this.nav = cfg.nav;

    this.slides = [];

    _this.init();
    _this.events();
  };

  ImageSlide.prototype.events = function() {
    var _this = this;
    //屏幕旋转
    $(window).on('orientationchange', function(e){
      _this.fixBodyCss();
    });
  };

  ImageSlide.prototype.fixBodyCss = function() {
    var _this = this;
    //@todo 获取不到设备实际宽高，如果横屏刷新之后再竖屏，获取的设备宽度不对
    var screenW = $(window).width();
    var screenH = $(window).height();
    // var screenW = document.body.clientWidth;
    // var screenH = document.body.clientHeight;
    var w,h;
    if(screenW > screenH){//横屏
      w = screenH + 'px';
      h = parseInt(screenH*(_this.config.scale || 5/16)) + 'px';
    }
    else{//竖屏
      w = screenW + 'px';
      h = parseInt(screenW*(_this.config.scale || 5/16)) + 'px';
    }

    $(_this.body).css('width', w);
    // $(_this.body).css('height', h);
    
    _this.config.bodyW = parseInt(w.replace('px', ''), 10);

    // $(_this.body).parent().css('width', w);
    // $(_this.body).parent().css('height', h);

    if(_this.gallery){
      _this.gallery.refreshSize();
    }
  };

  ImageSlide.prototype.init = function(){
    var _this = this;
    var selectedClass = 'selected';
    var page = 0;
    _this.fixBodyCss();
    if(_this.slides.length == 0){
      $('li', _this.nav).each(function(idx, el){
        var img = $(el).attr('crs');
        var href = $(el).attr('href');
        _this.slides.push({
          img : img,
          href : href,
          html : '<a href = "' + href + (_this.config.boss ? '" boss="' + _this.config.boss : '') + '"><img crs="' + img + '" src="http://mat1.gtimg.com/auto/images/mobi/slide.png" style = "width:100%;"></a>'
        });
      });
    }
    if(_this.slides.length == 0){
      if(_this.config.noImgFun){
        _this.config.noImgFun();
        return;
      }
    }

    _this.config.cur = _this.config.cur || 0;

    _this.gallery = new SwipeView(_this.body.length > 0 ? _this.body[0] : _this.body, _.extend({
      numberOfPages : _this.slides.length,
      slides : _this.slides
    }, _this.config));

    _this.gallery.onFlip(function(){
      $('.'+selectedClass, _this.nav).removeClass(selectedClass);
      $($('li', _this.nav)[_this.gallery.options.cur]).addClass(selectedClass);
    });
  };

  return ImageSlide;
});