/**
 * 判断是否安装客户端（购车通）
 * @pingback
 * app
 * mobi
 */
define('tmpl/Guide','<%var img;if(theme==THEMES.RED){  img = \'http://mat1.gtimg.com/auto/images/mobi/appguide_red.jpg\';}else{  img = \'http://mat1.gtimg.com/auto/images/mobi/appguide.jpg\';}%><section class="guidewrap"><div class="content"><img src="<%=img%>"><dl><dt><%=word1%></dt><dd><%=word2%></dd></dl></div><a href="<%=url%>" class="btn" boss="<%=boss%>"><span><%=btnTit%></span></a></section>');
define('css/guide','.guidewrap{font-size:16px;position:relative;margin:10px}.guidewrap .content{position:relative;height:100%}.guidewrap img{width:100%}.guidewrap dl{position:absolute;line-height:24px;color:#FFF;top:20%;left:35%;font-size:14px}.guidewrap dd{font-size:14px;margin-left:2px;font-size:12px}.guidewrap .btn{position:absolute;top:45%;height:25px;line-height:25px;background:#ff9228;color:#FFF;font-size:14px;border-radius:2px;padding:0 5px;right:4%}');
define('module/AppGuide', function(require, exports, module){
  var WORDS = {
    OPENAPP : '立即打开',
    DOWNAPP : '立即下载',
    TOPWORD : '下载购车通客户端',
    BOTTOMWORD : '帮你轻松购车！'
  };

  var checker = require('module/Checker');
  var TMPL = require('tmpl/Guide');
  var CSS = require('css/guide');
  var body;
  var _S_APPGUIDE_1 = '_s_appguide_1';//存储app guide的关闭时间(关闭按钮)
  var _S_APPGUIDE_2 = '_s_appguide_2';//存储app guide的关闭时间(下载/打开按钮)
  var ckr;
  var isclose = false;

  function events(){
    $('.close', body).on('tap', function(e){
      body.hide();
      isclose = true;

      X.S({name : _S_APPGUIDE_1, value : +new Date(), isCross : true});
    });
    $('.btn', body).on('tap', function(e){
      var href = $(this).attr('href');
      body.hide();
      isclose = true;

      X.S({name : _S_APPGUIDE_2,  value : +new Date(), isCross : true});

      checker.openClient(href, checker.pkg.QQCARPKG);
    }).on('click', function(e){
      return false;
    });

    // 页面滚动到底部的时候，隐藏浮层，以免挡住底部区域
    // $(window).scroll(function(){
    //   if((($(window).scrollTop() + $(window).height() + 50 >= $(document).height()) && $(window).scrollTop() != 0) || isclose) {
    //     $(body).css('position', 'static');
    //   }
    //   else{
    //     if(($(window).scrollTop() + $(window).height() + 100 < $(document).height())){
    //       $(body).css('position', 'fixed');
    //     }
    //   }
    // });
  }

  function changeBtn(value){
    $('.btn span', body).html(value);
    $('.btn', body).attr('boss', "{sOp : 'openQQCar', sfrom : 1}");
  }

  var isable = (function(){
    var q = $.Deferred();
    var ONEDAY = 24*60*60*1000;
    var ONEMONTH = 30*24*60*60*1000;
    // var ONEDAY = 15*1000;
    // var ONEMONTH = 30*1000;
    function isExpire(){
      // var closeTime1 = parseInt(X.S(function(){X.S({name : _S_APPGUIDE_1, isCross : true})}) || 0, 10);
      // var closeTime2 = parseInt(X.S(function(){X.S({name : _S_APPGUIDE_2, isCross : true})}) || 0, 10);
      var closeTime1 = parseInt(X.S({name : _S_APPGUIDE_1, isCross : true}) || 0, 10);
      var closeTime2 = parseInt(X.S({name : _S_APPGUIDE_2, isCross : true}) || 0, 10);
      var time1 = new Date(closeTime1); // 直接关闭浮层
      var time2 = new Date(closeTime2); // 通过点击下载或打开来关闭浮层

      var now = +new Date();
      var now_t = new Date();

      var time1_d = closeTime1 == 0 ? 0 : time1.getDate();
      var now_d = now_t.getDate();
      var time2_m = closeTime2 == 0 ? 0 : time2.getMonth() + 1;
      var now_m = now_t.getMonth() + 1;

      if(
        ((now - closeTime1 < ONEDAY) && (now_d == time1_d)) || 
        ((now - closeTime2 < ONEMONTH) && (now_m == time2_m))
      ){
        return false;
      }
      else{
        return true;
      }
    }

    // type==-1, 强制显示购车通浮层，不区分页面
    function inPage(type){
      if([1002, 2001, 3001, 4001, 5001, 7001, 7002, 7003, 9001, 9002, 10001 , -1].indexOf(type) != -1){
        return true;
      }
      else{
        return false;
      }
    }

    return function(type){
      var ret = true;
      X.S(function(){
        ret = inPage(type) && isExpire();
        q.resolve(ret);
      });
      return q.promise();
    }
  }());

  checker.manager.getChecker(checker.packageInfo.qqcar, function(_ckr){
    ckr = _ckr;
    if(ckr){
      ckr.checkInstall.on(function(_isInstall){
        if(_isInstall){
          changeBtn(WORDS.OPENAPP);
        }
      });
    }
  });

  // 组件主题风格
  exports.THEMES = {
    DEFAULT : 'default',
    RED : 'red'
  };

  /**
   * 在页面中插入Guide
   * @param  {Number} pagetype 页面id
   * @param  {Object} cfg      配置
   * @cfg {String} wrap guide插入位置
   * @cfg {String} theme 组件主题风格
   */
  exports.init = function(pagetype, cfg){
    cfg = cfg || {};
    cfg.theme = cfg.theme || exports.THEMES.DEFAULT;
    isable(pagetype).done(function(ret){
      if(!ret){
        return;
      }
      else{
        body = $(X.txTpl(TMPL, {
          btnTit : WORDS.DOWNAPP,
          boss : "{sOp : 'downQQCar', sfrom : 1}",
          url : 'qqcar://start',
          word1 : WORDS.TOPWORD,
          word2 : WORDS.BOTTOMWORD,
          THEMES : exports.THEMES,
          theme : cfg.theme
        }));
        X.addCssRule(CSS);
        if(cfg.wrap){
          $(cfg.wrap).append(body);
        }
        else{
          $(document.body).append(body);
        }

        events();
      }
    });
  };
});
