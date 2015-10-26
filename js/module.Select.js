/**
 * 汽车通用控件 - 下拉选择
 * @pingback
 * app
 * @events
 * select:select 点击完成按钮，选择一个列表项
 */
define('css/select','.m-bg{background-color:rgba(0,0,0,.3);width:100%;height:100%;position:fixed;top:0;left:0;z-index:1000}.m-select{width:100%;position:fixed;background-color:#FFF;bottom:0;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:slideUp;animation-name:slideUp}.m-select .header{position:static;line-height:44px;height:44px;border:solid 1px #d9d9d9;width:100%;background-color:#F3F3F7;z-index:100}.m-select .header .tit{margin-left:15px}.m-select .header .btn{position:absolute;right:15px;color:#40bdf7}.m-select .list{color:#000;text-align:center;overflow:hidden;max-height:252px;position:relative}.m-select .list ul{transform:translateY(0%)}.m-select .list li{height:36px;line-height:36px}.m-select .mask{position:absolute;height:40px;width:100%;background-color:#fff}.m-select .mask.mask1{top:0;opacity:.8}.m-select .mask.mask2{top:36px;opacity:.5}.m-select .mask.mask3{top:72px;opacity:.3}.m-select .mask.mask4{top:108px;background:0 0;border:solid 1px #cdcdcd}.m-select .mask.mask5{top:144px;opacity:.3}.m-select .mask.mask6{top:180px;opacity:.5}.m-select .mask.mask7{top:216px;opacity:.8}@-webkit-keyframes slideUp{0%{-webkit-transform:translateY(100%);transform:translateY(100%)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes slideUp{0%{-webkit-transform:translateY(100%);transform:translateY(100%)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}');
define('tmpl/Select','<section class="m-bg"><section class="m-select"><div class="header"><span class="tit"></span><span class="btn">完成</span></div><div class="list"><ul></ul><div class="mask mask1"></div><div class="mask mask2"></div><div class="mask mask3"></div><div class="mask mask4"></div><div class="mask mask5"></div><div class="mask mask6"></div><div class="mask mask7"></div></div></section></section>');
define('tmpl/Select_List','<%for(var i=0; i<list.length;i++){%><li><%=list[i]%></li><%}%>');
define('module/Select', function(require, exports, module){
  var ins;
  var TMPL = require('tmpl/Select');
  var TMPL_LIST = require('tmpl/Select_List');
  var CSS = require('css/select');
  var cfg = {};
  var points = [];
  var interval = [];
  var cur;//默认被选中索引
  /**
   * 当选项列表的长度不足7个时，需要为其头尾填充空数据，并且保证有效数据处于列表的中央
   * 如：
   * 有效数据['a选项', 'b选项']
   * 填充数据['','','','a选项', 'b选项','','']
   * 则：头部填充3个空数据，尾部填充2个空数据，即为holder数据结构中2:[3,2]的含义，其中key为有效数据的长度
   */
  var holders = {
    2 : [3 ,2],
    3 : [2, 2],
    4 : [3, 1],
    5 : [1, 1],
    6 : [1, 0]
  };

  var Select = function(){
    if(ins){
      return ins;
    }

    this.build();
  }

  Select.prototype.events = function(){
    var _this = this;
    _this.scroll = {};
    $(_this.list).on('touchstart', function(e){
      e.preventDefault();
      e = e.touches ? e.touches[0] : e;
      _this.scroll.y0 = e.clientY;
    });
    $(_this.list).on('touchmove', function(e){
      e = e.touches ? e.touches[0] : e;
      var deltaY = e.clientY - _this.scroll.y0;

      _this.move(deltaY);
    });
    $(_this.list).on('touchend', function(e){
      _this.fixpos();
    });
    $(_this.btn).on('tap', function(e){
      if(e.fireByAvalon){
        return;
      }

      if(cfg.selectFun){
        cfg.selectFun(_this.getcur());
      }

      $(_this.body).trigger('select:select', {value : _this.getcur()});

      _this.hide();
    });
    $(document.body).on('touchstart', function(e){
      var target = e.target;
      if(e.fireByAvalon){
        return;
      }
      if(cfg.target && $(target).closest('.m-select').length == 0 && !$.contains(cfg.target, target) && cfg.target != target){
        _this.hide();
      }
    });
  }

  Select.prototype.move = function(v){
    var _this = this;
    var dom = $('ul', _this.list);

    v = (_this.scroll.y || 0) + v;
    _this.scroll.ytmp = v;
    
    X.css3(dom, 'transform', 'translate3d(0, ' + v + 'px, 0px)');
  }

  Select.prototype.moveTo = function(v){
    var dom = $('ul', this.list);
    X.css3(dom, 'transform', 'translate3d(0, ' + v + 'px, 0px)');
    this.scroll.y = v;
  }

  Select.prototype.initpos = function(){
    var N = $('li', this.list).length;
    var base = 36;

    points = [];
    for(var i = 0; i < N; i++){
      points.push(base*(3 - i));
    }

    interval = [];
    for(var i = 0; i < points.length; i++){
      var p = points[i];
      interval.push([p - base / 2, p + base / 2]);
    }
  }

  // 获取边界
  Select.prototype.getEdge = function(){
    var len = cfg.list.length
    var rawlen = cfg.rawData.length;

    var res = {};
    if(len != rawlen){
      res = {
        l : points[holders[rawlen][0]],
        r : points[len - holders[rawlen][1] - 1],
        lidx : holders[rawlen][0],
        ridx : len - holders[rawlen][1] - 1
      }
    }
    else{
      res = {
        l : points[0],
        r : points[points.length - 1],
        lidx : 0,
        ridx : points.length - 1
      }
    }
    return res;
  }

  Select.prototype.fixpos = function(){
    var _this = this;
    var y = _this.scroll.ytmp;

    var edge = _this.getEdge();

    if(y > edge.l){
      y = edge.l;
      cur = edge.lidx;
    }
    else if(y < edge.r){
      y = edge.r;
      cur = edge.ridx;
    }

    for(var i = 0 ; i < interval.length; i++){
      var s = interval[i];
      if(y >= s[0] && y <= s[1]){
        y = (s[0] + s[1])/2;
        cur = i;
        break;
      }
    }

    // X.css3(dom, 'transform', 'translate3d(0, ' + y + 'px, 0px)');

    // _this.scroll.y = y;
    _this.moveTo(y);
  }

  Select.prototype.build = function(){
    X.addCssRule(CSS);
    this.body = $(TMPL);
    this.list = $('.list', this.body);
    this.tit = $('.tit', this.body);
    this.btn = $('.btn', this.body);

    this.events();

    $(this.body).hide();

    $(document.body).append(this.body);
  }

  Select.prototype.getcur = function(){
    return cfg.list ? cfg.list[cur] : '';
  }

  Select.prototype.setcur = function(v){
    if(v){
      var idx = cfg.list.indexOf(v);
      if(idx != -1){
        cur = idx;
        this.moveTo(points[idx]);
      }
    }
  }

  Select.prototype.parseData = function(data){
    var len = data.length;
    var newData = [];

    if(holders[len]){
      for(var i = 0; i < holders[len][0]; i++){
        newData.push('');
      }
      for(var i = 0; i < len; i++){
        newData.push(data[i]);
      }
      for(var i = 0; i < holders[len][1]; i++){
        newData.push('');
      }
    }
    else{
      newData = data;
    }

    return newData;
  }

  Select.prototype.reset = function(){
    // X.css3(dom, 'transform', 'translate3d(0, 0, 0)');
    // this.scroll.y = 0;
    cur = (cfg.list.length - 1)/2;
    this.moveTo(0);
  }

  // 加载外部样式
  Select.prototype.addExtCss = function(rule){
    X.addCssRule(rule);
  }

  Select.prototype.show = function(el, _cfg){
    var _this = this;
    cfg = $.extend(cfg, _cfg);

    cfg.target = el;

    if(cfg.title){
      this.tit.html(cfg.title);
    }
    if(cfg.list){
      cfg.rawData = cfg.list;
      cfg.list = _this.parseData(cfg.list);
      var tmpl_list = X.txTpl(TMPL_LIST, {
        list : cfg.list
      });
      $('ul', this.list).html(tmpl_list);

    }
    this.initpos();
    this.setcur(cfg.cur);

    $(this.body).show();

    return this.body;
  }

  Select.prototype.hide = function(){
    $(this.body).hide();
    this.reset();
  }

  return new Select();
});