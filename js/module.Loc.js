/**
 * 汽车通用控件 - 城市定位
 * @pingback
 * app
 * 天津经纬度(117.188667,39.115882)
 * @error define
 * GPSError1 IP定位出错
 * GPSError2 GPS定位出错
 * GPSError3 获取城市信息接口出错
 */
define('css/loc','.m-loc{position:absolute;top:0;height:100%;background-color:#F2F2F2;width:100%;z-index:3000;overflow:auto}.m-loc .locHd{background-color:#2BA7DD;height:44px;text-align:center;line-height:44px;position:relative;color:#fff}.m-loc .locHd .back{display:inline-block;width:40px;height:44px;position:absolute;left:0}.m-loc .locHd .back i{width:15px;height:15px;margin-left:10px;border-left:1px solid #FFF;border-bottom:1px solid #FFF;transform:rotate(45deg);-o-transform:rotate(45deg);-moz-transform:rotate(45deg);-webkit-transform:rotate(45deg);display:inline-block;top:4px;position:relative}.m-loc .cur{background-color:#FFF;margin-top:20px;padding-left:10px;height:40px;line-height:40px;color:#333;font-size:14px;border-top:solid 1px #e6e6e6;border-bottom:solid 1px #e6e6e6}.m-loc .cur .value{color:#14a1de;font-size:16px}.m-loc .list{padding-top:20px}.m-loc .list .tit{color:#333;margin-bottom:10px;padding-left:10px;font-weight:700}.m-loc .list .wrap{border-top:solid 1px #e6e6e6}.m-loc .list .group{background-color:#FFF;width:100%;display:table}.m-loc .list ul .item{width:20%;height:40px;line-height:40px;display:table-cell;text-align:center;border-right:solid 1px #e6e6e6;border-bottom:solid 1px #e6e6e6}.m-loc .list ul .item .goto{display:inline-block;width:100%}');
define('tmpl/Loc','<section class="m-loc"><header class="locHd"><div><a class="back" href="#"><i></i></a><span class="f18">切换城市</span></div></header><section class="cur">当前城市：<span class="value"></span></section><%if(list.HOT){%><section class="list"><div class="tit">热门城市</div><ul class="wrap"><%    var group1 = 3;    for(var i=0; i<Math.ceil(list.HOT.length/group1);i++){%><li><ul class="group"><%for(var j=0; j<group1;j++){            var idx = group1*i+j;            var item = list.HOT[idx];            var style = \'\';            if(idx >= list.HOT.length){              item = {\'cityid\':-1, \'cityname\':\'\'};              style = \'border-right:none;\';            }          %><li class="item" data-id="<%=item.cityid%>" style="<%=style%>"><%=item.cityname%></li><%}%></ul></li><%}%></ul></section><%    delete list.HOT;  }%><section class="list"><div class="tit">其他城市</div><ul class="wrap"><%    var citys = [];    for(var key in list){      citys.push(key);    }%><%    var group2 = 5;    for(var i=0; i<Math.ceil(citys.length/group2);i++){%><li><ul class="group"><%for(var j=0; j<group2;j++){            var idx = group2*i+j;            var item = [\'<a class="goto" href="#link_\', citys[idx] , \'">\', citys[idx], \'</a>\'].join(\'\');            var style = \'\';            if(idx >= citys.length){              item = \'\';              style = \'border-right:none;\';            }          %><li class="item" style="<%=style%>"><%=item%></li><%}%></ul></li><%}%></ul></section><%for(var key in list){%><section class="list" id="link_<%=key%>"><div class="tit"><%=key%></div><ul class="wrap"><%      var group3 = 3;      for(var i=0; i<Math.ceil(list[key].length/group3);i++){%><li><ul class="group"><%for(var j=0; j<group3;j++){              var idx = group3*i+j;              var item = list[key][idx];              var style = \'\';              if(idx >= list[key].length){                item = {\'cityid\':-1, \'cityname\':\'\'};                style = \'border-right:none;\';              }            %><li class="item" data-id="<%=item.cityid%>" style="<%=style%>"><%=item.cityname%></li><%}%></ul></li><%}%></ul></section><%}%></section>');
define('module.Loc', function(require, exports, module){
  var ins;
  var TMPL = require('tmpl/Loc');
  var CSS = require('css/loc');
  var cfg = {};
  var API = {
    GPS_IP : 'http://fw.qq.com/ipaddress',
    GPS_MAP : 'http://apis.map.qq.com/ws/geocoder/v1',
    GETCITYBYIP : 'http://wecar.qq.com/api/askprice/getprovinceandcity',
    CITYLIST : 'http://mct.auto.qq.com/index.php?mod=interface&act=citylist',
    // CITYLIST : 'http://yeedom.70.automall.qq.com/auction/api/get_home_list',
    AREAINFO : 'http://wecar.qq.com/api/area/areaInfo'
    // AREAINFO : 'http://yeedom.70.automall.qq.com/auction/api/get_home_list'
  };
  var _S_ = {
    SELECT : '_s_select_city',
    GPS_CITYID : '_s_gps_cityid',
    CITYLIST : '_s_citylist'
  };
  var positionArr={"city":{"阿里":"372","阿拉善盟":"265","澳门":"53","阿勒泰":"355","阿拉尔":"354","阿克苏":"353","阿坝":"300","安康":"290","鞍山":"250","安庆":"36","安顺":"100","安阳":"144","北宁":"251","巴中":"301","保亭":"123","白沙":"124","宝鸡":"291","百色":"87","白银":"109","包头":"267","巴彦淖尔":"266","白城":"241","北海":"86","白山":"242","本溪":"252","巴音郭楞":"356","保定":"193","北京":"54","亳州":"37","博尔塔拉":"357","滨州":"333","毕节":"101","保山":"379","蚌埠":"38","崇左":"88","楚雄":"380","巢湖":"41","长春":"243","常州":"217","郴州":"181","沧州":"195","昌江":"125","澄迈":"126","池州":"39","长沙":"179","常德":"180","滁州":"40","长治":"332","承德":"194","昌都":"373","赤峰":"268","潮州":"65","昌吉":"358","成都":"302","朝阳":"253","大理":"381","大庆":"205","大兴安岭":"204","东营":"335","大同":"322","德州":"334","达州":"303","德阳":"304","定西":"110","东莞":"66","丹东":"255","大连":"254","德宏":"382","东方":"128","迪庆":"383","定安":"129","恩施":"163","鄂尔多斯":"269","鄂州":"162","佛山":"67","福州":"56","阜新":"257","防城港":"89","阜阳":"42","抚州":"230","抚顺":"256","赣州":"231","果洛":"282","固原":"277","甘孜":"305","广元":"307","广安":"306","甘南":"111","贵阳":"102","广州":"68","贵港":"91","桂林":"90","菏泽":"336","淮北":"44","海北":"283","贺州":"92","海东":"284","海南":"285","漯河":"150","河池":"93","杭州":"395","呼伦贝尔":"271","葫芦岛":"258","怀化":"182","衡阳":"183","黄石":"165","黄冈":"164","淮南":"45","湖州":"396","呼和浩特":"270","衡水":"196","邯郸":"197","黄山":"43","鹤壁":"145","淮安":"218","河源":"70","惠州":"69","合肥":"46","海口":"130","红河哈尼族":"384","汉中":"292","哈尔滨":"208","黑河":"206","和田":"360","哈密":"359","海西":"286","黄南":"287","鹤岗":"207","晋城":"323","金华":"398","嘉峪关":"112","吉林":"244","九江":"234","景德镇":"233","吉安":"232","晋中":"324","鸡西":"210","佳木斯":"209","济南":"337","济宁":"338","酒泉":"114","济源市":"146","金昌":"113","嘉兴":"397","荆门":"166","荆州":"167","焦作":"147","揭阳":"71","锦州":"259","江门":"72","昆明":"385","喀什":"361","开封":"148","克孜勒苏":"363","克拉玛依":"362","来宾":"95","凉山":"309","临沧":"387","六安":"47","陵水":"133","乐东":"132","辽阳":"260","临沂":"341","临夏":"117","龙岩":"57","临汾":"325","临高":"131","连云港":"219","兰州":"115","陇南":"116","六盘水":"103","聊城":"340","拉萨":"374","林芝":"375","洛阳":"149","丽水":"399","乐山":"308","廊坊":"198","柳州":"94","莱芜":"339","辽源":"245","吕梁":"326","娄底":"184","丽江":"386","梅州":"74","米泉":"364","马鞍山":"48","绵阳":"312","眉山":"311","茂名":"73","牡丹江":"211","怒江":"388","宁德":"58","南沙群岛":"134","南阳":"151","南平":"59","南昌":"235","南充":"313","内江":"314","那曲":"376","南京":"220","南通":"221","宁波":"400","南宁":"96","盘锦":"261","攀枝花":"315","莆田":"60","平凉":"118","萍乡":"236","平顶山":"153","普洱":"389","泉州":"61","琼中":"136","庆阳":"119","齐齐哈尔":"212","潜江":"168","青岛":"342","钦州":"97","七台河":"213","黔西南":"104","曲靖":"390","黔南":"106","黔东南":"105","秦皇岛":"199","琼海":"135","清远":"75","日照":"343","日喀则":"377","石嘴山":"278","三门峡":"154","商洛":"293","深圳":"78","汕尾":"76","三亚":"137","商丘":"155","宿州":"49","韶关":"77","遂宁":"316","四平":"247","松原":"246","朔州":"327","宿迁":"223","石河子":"365","上饶":"237","绥化":"214","双鸭山":"215","苏州":"222","石家庄":"200","邵阳":"185","上海":"321","三明":"62","汕头":"79","沈阳":"262","十堰":"169","随州":"170","神农架":"171","绍兴":"402","山南":"378","铜陵":"50","泰安":"344","塔城":"366","吐鲁番":"368","图木舒克":"367","台湾":"351","天津":"350","铁岭":"263","唐山":"201","铜仁":"107","台州":"403","通化":"248","通辽":"272","天门":"172","泰州":"224","屯昌":"138","太原":"328","铜川":"294","天水":"120","芜湖":"51","文山":"391","武威":"121","温州":"404","武汉":"173","五指山":"139","万宁":"141","威海":"345","潍坊":"346","文昌":"140","无锡":"225","渭南":"295","乌鲁木齐":"369","五家渠":"370","吴忠":"279","乌兰察布":"274","乌海":"273","梧州":"98","西双版纳":"392","兴安盟":"276","宣城":"52","西沙群岛":"142","徐州":"226","许昌":"157","邢台":"202","香港":"352","厦门":"63","西安":"296","咸阳":"297","锡林郭勒盟":"275","信阳":"156","忻州":"329","湘西":"187","湘潭":"186","新余":"238","仙桃":"177","咸宁":"176","孝感":"175","襄阳":"174","西宁":"288","新乡":"158","银川":"280","玉溪":"393","伊犁":"371","益阳":"189","榆林":"299","延安":"298","玉树":"289","宜春":"240","阳江":"80","云浮":"81","宜昌":"178","延边":"249","营口":"264","永州":"188","鹰潭":"239","玉林":"99","伊春":"216","岳阳":"190","烟台":"347","运城":"331","阳泉":"330","盐城":"227","濮阳":"152","宜宾":"318","雅安":"317","扬州":"228","儋州":"127","昭通":"394","遵义":"108","郑州":"161","驻马店":"160","衢州":"401","周口":"159","中沙群岛的岛礁及其海域":"143","舟山":"405","株洲":"191","张家界":"192","张掖":"122","淄博":"349","枣庄":"348","资阳":"319","泸州":"310","漳州":"64","镇江":"229","中卫":"281","中山":"82","肇庆":"83","湛江":"84","珠海":"85","自贡":"320","张家口":"203","重庆":"55"},"province":{"安徽":"2","澳门":"3","北京":"4","福建":"6","甘肃":"10","贵州":"9","广西":"8","广东":"7","黑龙江":"16","河北":"15","湖南":"14","湖北":"13","河南":"12","海南":"11","江苏":"17","江西":"18","吉林":"19","辽宁":"20","内蒙古":"21","宁夏":"22","青海":"23","陕西":"24","四川":"25","上海":"26","山西":"27","山东":"28","天津":"29","台湾":"30","西藏":"33","新疆":"32","香港":"31","云南":"34","重庆":"5","浙江":"35"}};
  var disabled = false;

  window.locCb = function(data){
    if(!data.status){
      var res = parseLoc(data.result);
      ins.getArea(res.cityid).done(function(_data){
        ins.gps_def.resolve(_data);
        ins.gps_save(_data.cityid);
      });
    }
    else{
      ins.gps_def.resolve(defaultLoc());
    }
  }

  function defaultLoc(){
    return {
      cityname : '北京',
      cityid : '54',
      pid : '4'
    }
  }

  // 解析GPS_MAP数据
  function parseLoc(loc){
    var ret = {};
    if(!loc || !loc.address_component || !loc.address_component.city){//定位失败默认选为北京
      return defaultLoc();
    }

    var city = loc.address_component.city.replace('市', '');
    var id = positionArr.city[city];

    return {
      cityname : city,
      cityid : id
    }
  }

  var Loc = function(){
    var _this = this;
    if(ins){
      return ins;
    }

    ins = _this;

    _this.build();
  }

  Loc.prototype.build = function(){
    var _this = this;
    X.addCssRule(CSS);

    _this.getcity().done(function(data){
      _this.body = $(X.txTpl(TMPL, {
        cur : '',
        list : data
      }));

      if(!_this.ishow){
        $(_this.body).hide();
      }

      $(document.body).append(_this.body);

      _this.events();

      if(cfg.render){
        cfg.render();
      }
    });
  }

  Loc.prototype.events = function(){
    var _this = this;
    $('.m-loc').on('tap', '.item', function(){
      var id = $(this).data('id');
      if(id){
        if(cfg.selectFun){
          var city = {
            cityid : id,
            cityname : $(this).html()
          };
          _this.getArea(id).done(function(_data){
            cfg.selectFun(_data);
            X.S({name : _S_.SELECT, value : JSON.stringify(_data), isCross : true});
          });
        }
        _this.hide();
      }
    });

    $('.m-loc .back').on('tap', function(e){
      _this.hide();
    });
  }

  Loc.prototype.getcity = function(){
    var def = $.Deferred();
    var EXPIRE_TIME = 1*24*60*60*1000;//缓存时间为1天
    X.S(function(){
      var citylist = JSON.parse(X.S({name : _S_.CITYLIST, isCross : true}) || '{}');
      var time = +new Date();
      if(citylist.time && time - citylist.time < EXPIRE_TIME && citylist.data){
        def.resolve(citylist.data);
      }
      else{
        X.ajax({
          url : API.CITYLIST,
          type : 'get',
          success : function(data){
            if(!data.retcode){
              def.resolve(data.data);
              data.time = +new Date();
              X.S({name : _S_.CITYLIST, value : JSON.stringify(data), isCross : true});
            }
            else{
              def.reject();
            }
            disabled = false;
          },
          error : function(){
            def.reject();
            disabled = true;
          }
        });
      }
    });

    return def.promise();
  }

  // 自动获取用户当前地理位置信息
  // @param isS 是否记住首次定位
  Loc.prototype.gps = function(isS){
    var def = $.Deferred();
    var _this = this;
    isS = (typeof isS == 'undefined' ? true : isS);
    
    if(isS){
      X.S(function(){
        var city = JSON.parse(X.S({name : _S_.SELECT, isCross : true}) || '{}');
        if(city.cityname && city.cityid){
          city.fromS = true;//来自缓存中的地理位置定位
        }
        
        _this.gps(false).done(function(data){
          var _s_gps_cityid = X.S({name : _S_.GPS_CITYID, isCross : true}) || '';
          // 当gps获得的cityid与本地存储的cityid不一致
          if(!city.cityid){
            def.resolve(data);
          }
          else{
            if(_s_gps_cityid != data.cityid){
              def.resolve(data);
            }
            else{
              def.resolve(city);
            }
          }
        });
      });
    }
    else{
      this.gps_action(def);
    }

    return def.promise();
  }

  // 存储自动定位的cityid
  Loc.prototype.gps_save = function(id){
    X.S({name : _S_.GPS_CITYID, value : id, isCross : true});
  }

  // @param isIp 手动指定IP定位
  Loc.prototype.gps_action = function(def, isIp){
    var _this = this;

    if(($.os.android && $.os.qqnews) || !navigator.geolocation || isIp){// Android 新闻客户端或不支持GPS定位的设备，采用ip定位
      loadScript(API.GPS_IP, function(){
        X.ajax({
          url:API.GETCITYBYIP,
          type:'post',
          data:{
            ip:IPData[0],
          },
          dataType:'json',
          success:function(data){
            if(data.ret != 0){
              def.reject();
              Auto.Boss({sOp : 'GPSError1'});
              return;
            }
            _this.getArea(data.data.cityid).done(function(_data){
              def.resolve(_data);
              _this.gps_save(_data.cityid);
            });
          }
        });
      });
    }
    else{//采用设备GPS进行定位
      _this.gps_def = def;
      navigator.geolocation.getCurrentPosition(function(pos){
        _this.gps_handle(pos);
      }, function(err){
        _this.gps_error(err);
      }, {
        enableHighAccuracy: false,
        timeout: 1000 * 3, //设置超时时间为10秒
        maximumAge: 1000 * 60 * 24 //定位缓存是1天
      });
    }

    Auto.Boss({sOp : 'inGPS'});
  }

  Loc.prototype.gps_handle = function(pos){
    var lat = pos.coords.latitude;
    var lon = pos.coords.longitude;

    // @debug
    // 天津
    // lat = 39.115882;
    // lon = 117.188667;
    // 沧州
    // lat = 38.294278;
    // lon = 116.835956;

    var params = [
      '?location=', lat, ',', lon,
      '&key=', 'W6FBZ-QCPCW-RIJRA-OVTSL-CVDST-KWBCX',
      '&get_poi=', '1',
      '&output=', 'jsonp',
      '&callback=', 'locCb'
    ].join('');
    loadScript(API.GPS_MAP + params);
  }

  // gps定位失败，则切换到IP定位
  Loc.prototype.gps_error = function(err){
    // ins.gps_def.resolve(defaultLoc());
    ins.gps_action(ins.gps_def, true);
    Auto.Boss({sOp : 'GPSError2', sParam : err.code + '>' + err.message});
  }

  // 根据城市id获取城市信息
  Loc.prototype.getArea = function(cityid){
    var def = $.Deferred();
    if(cityid == '999'){// ios新闻客户端全国cityid为999
      cityid = '0';
    }
    X.ajax({
      url : API.AREAINFO,
      data : {cityid : cityid},
      success : function(data){
        var ret = {};
        if(!data.ret && data.data[cityid]){
          ret.cityname = data.data[cityid].name;
          ret.cityid = cityid;
          ret.pid = data.data[cityid].pid;

          def.resolve(ret);
        }
        else{
          def.resolve(defaultLoc());
        }
        disabled = false;
      },
      error : function(){
        def.resolve(defaultLoc());
        Auto.Boss({sOp : 'GPSError3'});
        disabled = true;
      }
    });

    return def.promise();
  }

  Loc.prototype.show = function(_cfg){
    cfg = $.extend(cfg, _cfg);

    if(disabled){
      if(cfg.errorFun){
        cfg.errorFun();
      }
      return;
    }

    $(this.body).show();
    this.ishow = true;

    if(cfg.cur){
      $('.cur .value', this.body).html(cfg.cur);
    }

    X.disableBodyScroll(true, true);

    $(this.body)[0].scrollTop = 0;

    Auto.Boss({sOp : 'showLoc'});

    return this.body;
  }

  Loc.prototype.hide = function(){
    X.disableBodyScroll(false, true);

    $(this.body).hide();
    this.ishow = false;
  }

  return new Loc();
});