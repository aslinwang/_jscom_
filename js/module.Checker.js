/**
 * 判断是否安装客户端（购车通）
 * @pingback
 * app
 * mobi
 * 可用平台：微信，手Q，Android QQ浏览器
 */

define('module/Checker', function(require, exports, module){
  function StateEvent(){
    this.state = -1;
    this.fns = [];
  }
  StateEvent.prototype.on = function(fn){
    if(fn){
      if(this.state != -1){
        fn(this.state);
      }
      else{
        this.fns.push(fn);
      }
    }
  };
  StateEvent.prototype.set = function(state){
    this.state = state;
    if(this.fns.length){
      this.fns.forEach(function(fn){
        fn(state);
      });

      this.fns.length = 0;
    }
  };

  function CheckerManger(){
    this.platforms = [];
  }
  CheckerManger.prototype.register = function(id, handler){
    var state = _getState(this);
    state.id = id;
    this.platforms.push({
      id : id,
      handler : function(info){
        setTimeout(function(){
          handler(state, info);
        });
        return state;
      }
    });
  };
  /**
   * 获取检测器
   * @param  {Object}   info     包相关的信息
   * @option {String}   downloadUrl  包下载地址，ios一般是app store
   * @option {String}   packageUrl   协议地址，一般是 xxxx:// 
   * @option {String}   packageName  包名，一般是 com.tencent.xxx
   * @option {String}   scheme       协议名字，协议地址的开头
   * @option {String}   wxShare      true / false 是否启用微信分享功能
   * @param  {Function} callback 回调函数，checker放其中
   */
  CheckerManger.prototype.getChecker = function(info, callback){
    var Self = this;

    _checkWhich(Self, info, function(checker){
      if(checker){
        checker.init();
      }
      callback(checker);
    }, 0);
  };

  function _getState(Self){
    var state = {
      init : null,
      checkIn : new StateEvent(),
      checkInstall : new StateEvent(),
      openClient : function(url){
        location.href = url;
      },
      download : function(url){
        location.href = url || Self.info.downloadUrl;
      }
    };
    return state;
  }

  function _checkWhich(Self, info, callback, index){
    var platform = Self.platforms[index];

    if(!platform){
      callback(false);
      return;
    }

    var checker = platform.handler(info);
    checker.checkIn.on(function(isIn){
      if(isIn){
        callback(checker);
      }
      else{
        _checkWhich(Self, info, callback, (index + 1));
      }
    });
  }

  var manager = new CheckerManger();

  // wechat checker
  (function(){
    manager.register('wx', function(state, info){
      state.readyEvent = new StateEvent();
      state.init = function(){
        if(window.WeixinJSBridge && WeixinJSBridge.invoke){
          wxJSBridgeReady();
        }
        else{
          document.addEventListener('WeixinJSBridgeReady', wxJSBridgeReady,false);
        }
      };

      var wxJSBridgeReady = function(){
        state.readyEvent.set(1);
        WeixinJSBridge.invoke('getInstallState', {
          'packageName' : info.packageName,
          'packageUrl' : info.packageUrl
        }, function(e){
          var msg = e.err_msg;
          var isInstall = 0;
          if(msg.indexOf('get_install_state:yes') > -1){
            isInstall = 1;
          }
          state.checkInstall.set(isInstall);
        });

        WeixinJSBridge.invoke('showToolbar', {}, function(res){});
      };

      var checkIn = function(){
        if(/MicroMessenger/ig.test(navigator.userAgent)){
          state.checkIn.set(1);
        }
        else{
          state.checkIn.set(0);
        }
      };
      checkIn();
    });
  }());

  // mobile qq checker
  (function(){
    manager.register('qq', function(state, info){
      state.init = function(){
        // 文档 http://mqq.oa.com/index.html
        loadScript('http://pub.idqqimg.com/qqmobile/qqapi.js?_bid=152', function(){
          var pkg = '';
          if($.os.ios){
            pkg = info.scheme;
          }
          else if($.os.android){
            pkg = info.packageName;
          }
          mqq.app.isAppInstalled(pkg, function(ret){
            state.checkInstall.set(ret ? 1 : 0);
          });
        });
      };

      var checkIn = function(){
        var currentVersion = state.currentVersion = 0;
        if ($.os.android) {
          currentVersion = (function(m) {
            return m && m[1] || 0;
          })(navigator.userAgent.match(/V1_AND_SQ_([\d\.]+)/));
          
          if (currentVersion) {
            state.currentVersion = currentVersion;
            state.checkIn.set(1);
          } else {
            state.checkIn.set(0);
          }
        }
        else if ($.os.ios) {
          currentVersion = (function(m) {
            return m && m[1] || 0;
          })(navigator.userAgent.match(/Mobile\/[\d\w]+ QQ\/([\d\.]+)/));

          if (currentVersion) {
            state.currentVersion = currentVersion;
            state.checkIn.set(1);
          } else {
            state.checkIn.set(0);
          }
        } else {
          state.checkIn.set(0);
        }
      };

      checkIn();
    });
  }());

  // qq browser checker
  (function(){
    manager.register('qqbrowser', function(state, info){
      state.init = function(){
        try{
          if($.os.android){
            var isInstall = window.x5mtt.isApkInstalled(JSON.stringify({
              packagename : info.packageName
            }));
            // -1 没安装 1 安装了
            state.checkInstall.set(isInstall != -1 ? 1 : 0);
          }
          else if($.os.ios){//ios无法检测
            state.checkInstall.set(0);
          }
          else{
            state.checkInstall.set(0);
          }
        }catch(e){
          state.checkInstall.set(0);
        }
      };
      var checkIn = function() {
        var currentVersion = (function(m) {
          return m && m[1] || 0;
        })(navigator.userAgent.match(/MQQBrowser\/([\d\.]+)/));

        if (currentVersion) {
          state.checkIn.set(1);
        } else {
          state.checkIn.set(0);
        }
      };
      checkIn();
    });
  }());

  // Tencent News App checker
  // @todo 
  //  not test
  //  get install state from url params
  (function(){
    function _bridgeCall(src, callback) {
      iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = src;
      var cleanFn = function(state) {
        try {
          iframe.parentNode.removeChild(iframe);
        } catch (error) {
        }
        if (callback)
          callback();
      };
      iframe.onload = cleanFn;
      document.documentElement.appendChild(iframe);
    }

    function JSBridge() {
      this.callbackDict = {};
      this.notificationIdCount = 0;
      this.notificationDict = {};

      var Self = this;
      Self.bind("jsBridgeReady", function() {
        Self.ready = true;
      });
      _bridgeCall('jsbridge://NotificationReady', Self.trigger('jsBridgeReady', {}));
    }

    JSBridge.prototype = {
      constructor : JSBridge,
      // js向oc发送消息
      postNotification : function(name, userInfo) {
        this.notificationIdCount++;

        this.notificationDict[this.notificationIdCount] = {
          name : name,
          userInfo : userInfo
        };

        _bridgeCall('jsbridge://PostNotificationWithId-'
            + this.notificationIdCount);
      },
      // oc获取消息数据
      popNotificationObject : function(notificationId) {
        var result = JSON.stringify(this.notificationDict[notificationId]);
        delete this.notificationDict[notificationId];
        return result;
      },
      // oc向js发送消息
      trigger : function(name, userInfo) {
        if (this.callbackDict[name]) {
          var callList = this.callbackDict[name];

          for (var i = 0, len = callList.length; i < len; i++) {
            callList[i](userInfo);
          }
        }
      },
      // 绑定消息
      bind : function(name, callback) {
        if (!this.callbackDict[name]) {
          // 创建对应数组
          this.callbackDict[name] = [];
        }
        this.callbackDict[name].push(callback);
      },
      // 解除绑定
      unbind : function(name, callback) {
        // 如果只提供消息名，则删除整个对应的数组
        if (arguments.length == 1) {
          delete this.callbackDict[name];
        } else if (arguments.length > 1) {
          // 搜索相应的callback，并删除
          if (this.callbackDict[name]) {
            var callList = this.callbackDict[name];

            for (var i = 0, len = callList.length; i < len; i++) {
              if (callList[i] == callback) {
                callList.splice(i, 1);
                break;
              }
            }
          }
          // 如果数组为空，则删除
          if (this.callbackDict[name].length == 0) {
            delete this.callbackDict[name];
          }
        }
      }
    };

    
    manager.register('qqnews', function(state, info) {
      var _checkXW = function() {
        state.jsBridge.bind("getInstallState", function(result) {
          if (state.checkInstallTimeout) {
            clearTimeout(state.checkInstallTimeout);
            state.checkInstallTimeout = null;
          } else {
            return;
          }
          var installed = result.installed;
          installed = installed ? 1 : 0;
          state.checkIn.set(1);
          state.checkInstall.set(installed);
        });
      };
      state.init = function() {
        if (jsBridge.ready) {
          _checkXW();
        } else {
          jsBridge.bind("jsBridgeReady", _checkXW);
        }

        jsBridge.postNotification("getInstallState", {
          "package_url" : info.packageUrl
        });
      };
      var checkIn = function() {
        if ($.os.android) {
          if (window.TencentNewsScript) {
            state.checkIn.set(1);
          } else {
            state.checkIn.set(0);
          }
        } else if($.os.ios) {// 在非Safari 条件下判断
          if(!/Safari/.test(navigator.userAgent)) {
            jsBridge = new JSBridge();
            state.checkInstallTimeout = setTimeout(function() {
              state.checkInstallTimeout = null;
              state.checkIn.set(0);
            }, 3000);
          } else {
            state.checkIn.set(0);
          }
        } else {
          state.checkIn.set(0);
        }
      };
      checkIn();
    });
  }());

  var openClient = (function(){
    var isInstall;
    var pkg;
    var ckr;
    var action = function(url, _ckr){
      if(isInstall == 1){//已安装
        _ckr.openClient(url);
      }
      else if(isInstall == -1){//未安装
        _ckr.download(pkg.downloadUrl);
      }
      else{//无法检测
        location.href = pkg.downloadUrl;
      }
    };
    return function(url, _pkg){
      pkg = _pkg;
      if(!isInstall){
        manager.getChecker(pkg, function(_ckr){
          if(_ckr){
            _ckr.checkInstall.on(function(_isInstall){
              isInstall = _isInstall ? 1 : -1;
            });
          }
          else{
            isInstall = 0;
          }

          ckr = _ckr;
          action(url, _ckr);
        });
      }
      else{
        action(url, ckr);
      }
    }
  }());

  var weiboPackage = {
    downloadUrl : $.os.ios ? 'http://itunes.apple.com/cn/app/id370130751' : 'http://www.myapp.com/down/2394?&g_f=190506',
    packageUrl : 'TencentWeibo://',
    packageName : 'com.tencent.WBlog',
    scheme : 'tencentweibo'
  };

  var qqcarPackage = {
    downloadUrl : $.os.ios ? 'https://itunes.apple.com/cn/app/gou-che-tong/id935183922?mt=8' : 'http://mct.auto.qq.com/index.php?mod=download',
    packageUrl : 'qqcar://',
    packageName : 'com.tencent.qqcar',
    scheme : 'qqcar'
  };

  if($.os.android && window.entry){
    if(window.entry == 'page.vote'){//问问朋友页面
      qqcarPackage.downloadUrl += '&channelid=wenwen';
    }
  }
  else{
    qqcarPackage.downloadUrl += '&channelid=chuping';
  }

  exports.manager = manager;
  exports.CheckerManger = CheckerManger;
  exports.openClient = openClient;
  exports.packageInfo = {
    weibo : weiboPackage,
    qqcar : qqcarPackage
  };
  exports.pkg = {
    'WEIBOPKG' : weiboPackage,
    'QQCARPKG' : qqcarPackage
  };
});