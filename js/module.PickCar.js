/**
 * 汽车通用控件 - 车型选择
 * @pingback
 * app
 * @events
 */
define('module/PickCar', function(require, exports, module){
  var ins;
  // var TMPL = require('tmpl/Select');
  // var CSS = require('css/select');
  var cfg = {};

  var PickCar = function(){
    if(ins){
      return ins;
    }

    this.build();
  }

  PickCar.prototype.events = function(){
    var _this = this;
    
  }

  PickCar.prototype.build = function(){
    X.addCssRule(CSS);
    this.body = $(TMPL);
    this.list = $('.list', this.body);
    this.tit = $('.tit', this.body);
    this.btn = $('.btn', this.body);

    this.events();

    $(this.body).hide();

    $(document.body).append(this.body);
  }

  PickCar.prototype.show = function(_cfg){
    var _this = this;
    cfg = $.extend(cfg, _cfg);

    $(this.body).show();

    return this.body;
  }

  PickCar.prototype.hide = function(){
    $(this.body).hide();
  }

  return new PickCar();
});