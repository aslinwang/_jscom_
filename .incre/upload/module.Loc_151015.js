define("css/loc",".m-loc{position:absolute;top:0;height:100%;background-color:#F2F2F2;width:100%;z-index:3000;overflow:auto}.m-loc .locHd{background-color:#2BA7DD;height:44px;text-align:center;line-height:44px;position:relative;color:#fff}.m-loc .locHd .back{display:inline-block;width:40px;height:44px;position:absolute;left:0}.m-loc .locHd .back i{width:15px;height:15px;margin-left:10px;border-left:1px solid #FFF;border-bottom:1px solid #FFF;transform:rotate(45deg);-o-transform:rotate(45deg);-moz-transform:rotate(45deg);-webkit-transform:rotate(45deg);display:inline-block;top:4px;position:relative}.m-loc .cur{background-color:#FFF;margin-top:20px;padding-left:10px;height:40px;line-height:40px;color:#333;font-size:14px;border-top:solid 1px #e6e6e6;border-bottom:solid 1px #e6e6e6}.m-loc .cur .value{color:#14a1de;font-size:16px}.m-loc .list{padding-top:20px}.m-loc .list .tit{color:#333;margin-bottom:10px;padding-left:10px;font-weight:700}.m-loc .list .wrap{border-top:solid 1px #e6e6e6}.m-loc .list .group{background-color:#FFF;width:100%;display:table}.m-loc .list ul .item{width:20%;height:40px;line-height:40px;display:table-cell;text-align:center;border-right:solid 1px #e6e6e6;border-bottom:solid 1px #e6e6e6}.m-loc .list ul .item .goto{display:inline-block;width:100%}"),define("tmpl/Loc",'<section class="m-loc"><header class="locHd"><div><a class="back" href="#"><i></i></a><span class="f18">\u5207\u6362\u57ce\u5e02</span></div></header><section class="cur">\u5f53\u524d\u57ce\u5e02：<span class="value"></span></section><%if(list.HOT){%><section class="list"><div class="tit">\u70ed\u95e8\u57ce\u5e02</div><ul class="wrap"><%    var group1 = 3;    for(var i=0; i<Math.ceil(list.HOT.length/group1);i++){%><li><ul class="group"><%for(var j=0; j<group1;j++){            var idx = group1*i+j;            var item = list.HOT[idx];            var style = \'\';            if(idx >= list.HOT.length){              item = {\'cityid\':-1, \'cityname\':\'\'};              style = \'border-right:none;\';            }          %><li class="item" data-id="<%=item.cityid%>" style="<%=style%>"><%=item.cityname%></li><%}%></ul></li><%}%></ul></section><%    delete list.HOT;  }%><section class="list"><div class="tit">\u5176\u4ed6\u57ce\u5e02</div><ul class="wrap"><%    var citys = [];    for(var key in list){      citys.push(key);    }%><%    var group2 = 5;    for(var i=0; i<Math.ceil(citys.length/group2);i++){%><li><ul class="group"><%for(var j=0; j<group2;j++){            var idx = group2*i+j;            var item = [\'<a class="goto" href="#link_\', citys[idx] , \'">\', citys[idx], \'</a>\'].join(\'\');            var style = \'\';            if(idx >= citys.length){              item = \'\';              style = \'border-right:none;\';            }          %><li class="item" style="<%=style%>"><%=item%></li><%}%></ul></li><%}%></ul></section><%for(var key in list){%><section class="list" id="link_<%=key%>"><div class="tit"><%=key%></div><ul class="wrap"><%      var group3 = 3;      for(var i=0; i<Math.ceil(list[key].length/group3);i++){%><li><ul class="group"><%for(var j=0; j<group3;j++){              var idx = group3*i+j;              var item = list[key][idx];              var style = \'\';              if(idx >= list[key].length){                item = {\'cityid\':-1, \'cityname\':\'\'};                style = \'border-right:none;\';              }            %><li class="item" data-id="<%=item.cityid%>" style="<%=style%>"><%=item.cityname%></li><%}%></ul></li><%}%></ul></section><%}%></section>'),define("module.Loc",function(require,exports,module){function t(){return{cityname:"\u5317\u4eac",cityid:"54",pid:"4"}}function i(i){if(!i||!i.address_component||!i.address_component.city)return t();var e=i.address_component.city.replace("\u5e02",""),o=n.city[e];return{cityname:e,cityid:o}}var e,o=require("tmpl/Loc"),r=require("css/loc"),s={},a={GPS_IP:"http://fw.qq.com/ipaddress",GPS_MAP:"http://apis.map.qq.com/ws/geocoder/v1",GETCITYBYIP:"http://wecar.qq.com/api/askprice/getprovinceandcity",CITYLIST:"http://mct.auto.qq.com/index.php?mod=interface&act=citylist",AREAINFO:"http://wecar.qq.com/api/area/areaInfo"},c={SELECT:"_s_select_city",GPS_CITYID:"_s_gps_cityid",CITYLIST:"_s_citylist"},n={city:{"\u963f\u91cc":"372","\u963f\u62c9\u5584\u76df":"265","\u6fb3\u95e8":"53","\u963f\u52d2\u6cf0":"355","\u963f\u62c9\u5c14":"354","\u963f\u514b\u82cf":"353","\u963f\u575d":"300","\u5b89\u5eb7":"290","\u978d\u5c71":"250","\u5b89\u5e86":"36","\u5b89\u987a":"100","\u5b89\u9633":"144","\u5317\u5b81":"251","\u5df4\u4e2d":"301","\u4fdd\u4ead":"123","\u767d\u6c99":"124","\u5b9d\u9e21":"291","\u767e\u8272":"87","\u767d\u94f6":"109","\u5305\u5934":"267","\u5df4\u5f66\u6dd6\u5c14":"266","\u767d\u57ce":"241","\u5317\u6d77":"86","\u767d\u5c71":"242","\u672c\u6eaa":"252","\u5df4\u97f3\u90ed\u695e":"356","\u4fdd\u5b9a":"193","\u5317\u4eac":"54","\u4eb3\u5dde":"37","\u535a\u5c14\u5854\u62c9":"357","\u6ee8\u5dde":"333","\u6bd5\u8282":"101","\u4fdd\u5c71":"379","\u868c\u57e0":"38","\u5d07\u5de6":"88","\u695a\u96c4":"380","\u5de2\u6e56":"41","\u957f\u6625":"243","\u5e38\u5dde":"217","\u90f4\u5dde":"181","\u6ca7\u5dde":"195","\u660c\u6c5f":"125","\u6f84\u8fc8":"126","\u6c60\u5dde":"39","\u957f\u6c99":"179","\u5e38\u5fb7":"180","\u6ec1\u5dde":"40","\u957f\u6cbb":"332","\u627f\u5fb7":"194","\u660c\u90fd":"373","\u8d64\u5cf0":"268","\u6f6e\u5dde":"65","\u660c\u5409":"358","\u6210\u90fd":"302","\u671d\u9633":"253","\u5927\u7406":"381","\u5927\u5e86":"205","\u5927\u5174\u5b89\u5cad":"204","\u4e1c\u8425":"335","\u5927\u540c":"322","\u5fb7\u5dde":"334","\u8fbe\u5dde":"303","\u5fb7\u9633":"304","\u5b9a\u897f":"110","\u4e1c\u839e":"66","\u4e39\u4e1c":"255","\u5927\u8fde":"254","\u5fb7\u5b8f":"382","\u4e1c\u65b9":"128","\u8fea\u5e86":"383","\u5b9a\u5b89":"129","\u6069\u65bd":"163","\u9102\u5c14\u591a\u65af":"269","\u9102\u5dde":"162","\u4f5b\u5c71":"67","\u798f\u5dde":"56","\u961c\u65b0":"257","\u9632\u57ce\u6e2f":"89","\u961c\u9633":"42","\u629a\u5dde":"230","\u629a\u987a":"256","\u8d63\u5dde":"231","\u679c\u6d1b":"282","\u56fa\u539f":"277","\u7518\u5b5c":"305","\u5e7f\u5143":"307","\u5e7f\u5b89":"306","\u7518\u5357":"111","\u8d35\u9633":"102","\u5e7f\u5dde":"68","\u8d35\u6e2f":"91","\u6842\u6797":"90","\u83cf\u6cfd":"336","\u6dee\u5317":"44","\u6d77\u5317":"283","\u8d3a\u5dde":"92","\u6d77\u4e1c":"284","\u6d77\u5357":"285","\u6f2f\u6cb3":"150","\u6cb3\u6c60":"93","\u676d\u5dde":"395","\u547c\u4f26\u8d1d\u5c14":"271","\u846b\u82a6\u5c9b":"258","\u6000\u5316":"182","\u8861\u9633":"183","\u9ec4\u77f3":"165","\u9ec4\u5188":"164","\u6dee\u5357":"45","\u6e56\u5dde":"396","\u547c\u548c\u6d69\u7279":"270","\u8861\u6c34":"196","\u90af\u90f8":"197","\u9ec4\u5c71":"43","\u9e64\u58c1":"145","\u6dee\u5b89":"218","\u6cb3\u6e90":"70","\u60e0\u5dde":"69","\u5408\u80a5":"46","\u6d77\u53e3":"130","\u7ea2\u6cb3\u54c8\u5c3c\u65cf":"384","\u6c49\u4e2d":"292","\u54c8\u5c14\u6ee8":"208","\u9ed1\u6cb3":"206","\u548c\u7530":"360","\u54c8\u5bc6":"359","\u6d77\u897f":"286","\u9ec4\u5357":"287","\u9e64\u5c97":"207","\u664b\u57ce":"323","\u91d1\u534e":"398","\u5609\u5cea\u5173":"112","\u5409\u6797":"244","\u4e5d\u6c5f":"234","\u666f\u5fb7\u9547":"233","\u5409\u5b89":"232","\u664b\u4e2d":"324","\u9e21\u897f":"210","\u4f73\u6728\u65af":"209","\u6d4e\u5357":"337","\u6d4e\u5b81":"338","\u9152\u6cc9":"114","\u6d4e\u6e90\u5e02":"146","\u91d1\u660c":"113","\u5609\u5174":"397","\u8346\u95e8":"166","\u8346\u5dde":"167","\u7126\u4f5c":"147","\u63ed\u9633":"71","\u9526\u5dde":"259","\u6c5f\u95e8":"72","\u6606\u660e":"385","\u5580\u4ec0":"361","\u5f00\u5c01":"148","\u514b\u5b5c\u52d2\u82cf":"363","\u514b\u62c9\u739b\u4f9d":"362","\u6765\u5bbe":"95","\u51c9\u5c71":"309","\u4e34\u6ca7":"387","\u516d\u5b89":"47","\u9675\u6c34":"133","\u4e50\u4e1c":"132","\u8fbd\u9633":"260","\u4e34\u6c82":"341","\u4e34\u590f":"117","\u9f99\u5ca9":"57","\u4e34\u6c7e":"325","\u4e34\u9ad8":"131","\u8fde\u4e91\u6e2f":"219","\u5170\u5dde":"115","\u9647\u5357":"116","\u516d\u76d8\u6c34":"103","\u804a\u57ce":"340","\u62c9\u8428":"374","\u6797\u829d":"375","\u6d1b\u9633":"149","\u4e3d\u6c34":"399","\u4e50\u5c71":"308","\u5eca\u574a":"198","\u67f3\u5dde":"94","\u83b1\u829c":"339","\u8fbd\u6e90":"245","\u5415\u6881":"326","\u5a04\u5e95":"184","\u4e3d\u6c5f":"386","\u6885\u5dde":"74","\u7c73\u6cc9":"364","\u9a6c\u978d\u5c71":"48","\u7ef5\u9633":"312","\u7709\u5c71":"311","\u8302\u540d":"73","\u7261\u4e39\u6c5f":"211","\u6012\u6c5f":"388","\u5b81\u5fb7":"58","\u5357\u6c99\u7fa4\u5c9b":"134","\u5357\u9633":"151","\u5357\u5e73":"59","\u5357\u660c":"235","\u5357\u5145":"313","\u5185\u6c5f":"314","\u90a3\u66f2":"376","\u5357\u4eac":"220","\u5357\u901a":"221","\u5b81\u6ce2":"400","\u5357\u5b81":"96","\u76d8\u9526":"261","\u6500\u679d\u82b1":"315","\u8386\u7530":"60","\u5e73\u51c9":"118","\u840d\u4e61":"236","\u5e73\u9876\u5c71":"153","\u666e\u6d31":"389","\u6cc9\u5dde":"61","\u743c\u4e2d":"136","\u5e86\u9633":"119","\u9f50\u9f50\u54c8\u5c14":"212","\u6f5c\u6c5f":"168","\u9752\u5c9b":"342","\u94a6\u5dde":"97","\u4e03\u53f0\u6cb3":"213","\u9ed4\u897f\u5357":"104","\u66f2\u9756":"390","\u9ed4\u5357":"106","\u9ed4\u4e1c\u5357":"105","\u79e6\u7687\u5c9b":"199","\u743c\u6d77":"135","\u6e05\u8fdc":"75","\u65e5\u7167":"343","\u65e5\u5580\u5219":"377","\u77f3\u5634\u5c71":"278","\u4e09\u95e8\u5ce1":"154","\u5546\u6d1b":"293","\u6df1\u5733":"78","\u6c55\u5c3e":"76","\u4e09\u4e9a":"137","\u5546\u4e18":"155","\u5bbf\u5dde":"49","\u97f6\u5173":"77","\u9042\u5b81":"316","\u56db\u5e73":"247","\u677e\u539f":"246","\u6714\u5dde":"327","\u5bbf\u8fc1":"223","\u77f3\u6cb3\u5b50":"365","\u4e0a\u9976":"237","\u7ee5\u5316":"214","\u53cc\u9e2d\u5c71":"215","\u82cf\u5dde":"222","\u77f3\u5bb6\u5e84":"200","\u90b5\u9633":"185","\u4e0a\u6d77":"321","\u4e09\u660e":"62","\u6c55\u5934":"79","\u6c88\u9633":"262","\u5341\u5830":"169","\u968f\u5dde":"170","\u795e\u519c\u67b6":"171","\u7ecd\u5174":"402","\u5c71\u5357":"378","\u94dc\u9675":"50","\u6cf0\u5b89":"344","\u5854\u57ce":"366","\u5410\u9c81\u756a":"368","\u56fe\u6728\u8212\u514b":"367","\u53f0\u6e7e":"351","\u5929\u6d25":"350","\u94c1\u5cad":"263","\u5510\u5c71":"201","\u94dc\u4ec1":"107","\u53f0\u5dde":"403","\u901a\u5316":"248","\u901a\u8fbd":"272","\u5929\u95e8":"172","\u6cf0\u5dde":"224","\u5c6f\u660c":"138","\u592a\u539f":"328","\u94dc\u5ddd":"294","\u5929\u6c34":"120","\u829c\u6e56":"51","\u6587\u5c71":"391","\u6b66\u5a01":"121","\u6e29\u5dde":"404","\u6b66\u6c49":"173","\u4e94\u6307\u5c71":"139","\u4e07\u5b81":"141","\u5a01\u6d77":"345","\u6f4d\u574a":"346","\u6587\u660c":"140","\u65e0\u9521":"225","\u6e2d\u5357":"295","\u4e4c\u9c81\u6728\u9f50":"369","\u4e94\u5bb6\u6e20":"370","\u5434\u5fe0":"279","\u4e4c\u5170\u5bdf\u5e03":"274","\u4e4c\u6d77":"273","\u68a7\u5dde":"98","\u897f\u53cc\u7248\u7eb3":"392","\u5174\u5b89\u76df":"276","\u5ba3\u57ce":"52","\u897f\u6c99\u7fa4\u5c9b":"142","\u5f90\u5dde":"226","\u8bb8\u660c":"157","\u90a2\u53f0":"202","\u9999\u6e2f":"352","\u53a6\u95e8":"63","\u897f\u5b89":"296","\u54b8\u9633":"297","\u9521\u6797\u90ed\u52d2\u76df":"275","\u4fe1\u9633":"156","\u5ffb\u5dde":"329","\u6e58\u897f":"187","\u6e58\u6f6d":"186","\u65b0\u4f59":"238","\u4ed9\u6843":"177","\u54b8\u5b81":"176","\u5b5d\u611f":"175","\u8944\u9633":"174","\u897f\u5b81":"288","\u65b0\u4e61":"158","\u94f6\u5ddd":"280","\u7389\u6eaa":"393","\u4f0a\u7281":"371","\u76ca\u9633":"189","\u6986\u6797":"299","\u5ef6\u5b89":"298","\u7389\u6811":"289","\u5b9c\u6625":"240","\u9633\u6c5f":"80","\u4e91\u6d6e":"81","\u5b9c\u660c":"178","\u5ef6\u8fb9":"249","\u8425\u53e3":"264","\u6c38\u5dde":"188","\u9e70\u6f6d":"239","\u7389\u6797":"99","\u4f0a\u6625":"216","\u5cb3\u9633":"190","\u70df\u53f0":"347","\u8fd0\u57ce":"331","\u9633\u6cc9":"330","\u76d0\u57ce":"227","\u6fee\u9633":"152","\u5b9c\u5bbe":"318","\u96c5\u5b89":"317","\u626c\u5dde":"228","\u510b\u5dde":"127","\u662d\u901a":"394","\u9075\u4e49":"108","\u90d1\u5dde":"161","\u9a7b\u9a6c\u5e97":"160","\u8862\u5dde":"401","\u5468\u53e3":"159","\u4e2d\u6c99\u7fa4\u5c9b\u7684\u5c9b\u7901\u53ca\u5176\u6d77\u57df":"143","\u821f\u5c71":"405","\u682a\u6d32":"191","\u5f20\u5bb6\u754c":"192","\u5f20\u6396":"122","\u6dc4\u535a":"349","\u67a3\u5e84":"348","\u8d44\u9633":"319","\u6cf8\u5dde":"310","\u6f33\u5dde":"64","\u9547\u6c5f":"229","\u4e2d\u536b":"281","\u4e2d\u5c71":"82","\u8087\u5e86":"83","\u6e5b\u6c5f":"84","\u73e0\u6d77":"85","\u81ea\u8d21":"320","\u5f20\u5bb6\u53e3":"203","\u91cd\u5e86":"55"},province:{"\u5b89\u5fbd":"2","\u6fb3\u95e8":"3","\u5317\u4eac":"4","\u798f\u5efa":"6","\u7518\u8083":"10","\u8d35\u5dde":"9","\u5e7f\u897f":"8","\u5e7f\u4e1c":"7","\u9ed1\u9f99\u6c5f":"16","\u6cb3\u5317":"15","\u6e56\u5357":"14","\u6e56\u5317":"13","\u6cb3\u5357":"12","\u6d77\u5357":"11","\u6c5f\u82cf":"17","\u6c5f\u897f":"18","\u5409\u6797":"19","\u8fbd\u5b81":"20","\u5185\u8499\u53e4":"21","\u5b81\u590f":"22","\u9752\u6d77":"23","\u9655\u897f":"24","\u56db\u5ddd":"25","\u4e0a\u6d77":"26","\u5c71\u897f":"27","\u5c71\u4e1c":"28","\u5929\u6d25":"29","\u53f0\u6e7e":"30","\u897f\u85cf":"33","\u65b0\u7586":"32","\u9999\u6e2f":"31","\u4e91\u5357":"34","\u91cd\u5e86":"5","\u6d59\u6c5f":"35"}},l=!1;window.locCb=function(o){if(o.status)e.gps_def.resolve(t());else{var r=i(o.result);e.getArea(r.cityid).done(function(t){e.gps_def.resolve(t),e.gps_save(t.cityid)})}};var d=function(){var t=this;return e?e:(e=t,void t.build())};return d.prototype.build=function(){var t=this;X.addCssRule(r),t.getcity().done(function(i){t.body=$(X.txTpl(o,{cur:"",list:i})),t.ishow||$(t.body).hide(),$(document.body).append(t.body),t.events(),s.render&&s.render()})},d.prototype.events=function(){var t=this;$(".m-loc").on("tap",".item",function(){var i=$(this).data("id");if(i){if(s.selectFun){{({cityid:i,cityname:$(this).html()})}t.getArea(i).done(function(t){s.selectFun(t),X.S({name:c.SELECT,value:JSON.stringify(t),isCross:!0})})}t.hide()}}),$(".m-loc .back").on("tap",function(i){t.hide()})},d.prototype.getcity=function(){var t=$.Deferred(),i=864e5;return X.S(function(){var e=JSON.parse(X.S({name:c.CITYLIST,isCross:!0})||"{}"),o=+new Date;e.time&&o-e.time<i&&e.data?t.resolve(e.data):X.ajax({url:a.CITYLIST,type:"get",success:function(i){i.retcode?t.reject():(t.resolve(i.data),i.time=+new Date,X.S({name:c.CITYLIST,value:JSON.stringify(i),isCross:!0})),l=!1},error:function(){t.reject(),l=!0}})}),t.promise()},d.prototype.gps=function(t){var i=$.Deferred(),e=this;return t="undefined"==typeof t?!0:t,t?X.S(function(){var t=JSON.parse(X.S({name:c.SELECT,isCross:!0})||"{}");t.cityname&&t.cityid&&(t.fromS=!0),e.gps(!1).done(function(e){var o=X.S({name:c.GPS_CITYID,isCross:!0})||"";i.resolve(t.cityid?o!=e.cityid?e:t:e)})}):this.gps_action(i),i.promise()},d.prototype.gps_save=function(t){X.S({name:c.GPS_CITYID,value:t,isCross:!0})},d.prototype.gps_action=function(t,i){var e=this;$.os.android&&$.os.qqnews||!navigator.geolocation||i?loadScript(a.GPS_IP,function(){X.ajax({url:a.GETCITYBYIP,type:"post",data:{ip:IPData[0]},dataType:"json",success:function(i){return 0!=i.ret?(t.reject(),void Auto.Boss({sOp:"GPSError1"})):void e.getArea(i.data.cityid).done(function(i){t.resolve(i),e.gps_save(i.cityid)})}})}):(e.gps_def=t,navigator.geolocation.getCurrentPosition(function(t){e.gps_handle(t)},function(t){e.gps_error(t)},{enableHighAccuracy:!1,timeout:3e3,maximumAge:144e4})),Auto.Boss({sOp:"inGPS"})},d.prototype.gps_handle=function(t){var i=t.coords.latitude,e=t.coords.longitude,o=["?location=",i,",",e,"&key=","W6FBZ-QCPCW-RIJRA-OVTSL-CVDST-KWBCX","&get_poi=","1","&output=","jsonp","&callback=","locCb"].join("");loadScript(a.GPS_MAP+o)},d.prototype.gps_error=function(t){e.gps_action(e.gps_def,!0),Auto.Boss({sOp:"GPSError2",sParam:t.code+">"+t.message})},d.prototype.getArea=function(i){var e=$.Deferred();return"999"==i&&(i="0"),X.ajax({url:a.AREAINFO,data:{cityid:i},success:function(o){var r={};!o.ret&&o.data[i]?(r.cityname=o.data[i].name,r.cityid=i,r.pid=o.data[i].pid,e.resolve(r)):e.resolve(t()),l=!1},error:function(){e.resolve(t()),Auto.Boss({sOp:"GPSError3"}),l=!0}}),e.promise()},d.prototype.show=function(t){return s=$.extend(s,t),l?void(s.errorFun&&s.errorFun()):($(this.body).show(),this.ishow=!0,s.cur&&$(".cur .value",this.body).html(s.cur),X.disableBodyScroll(!0,!0),$(this.body)[0].scrollTop=0,Auto.Boss({sOp:"showLoc"}),this.body)},d.prototype.hide=function(){X.disableBodyScroll(!1,!0),$(this.body).hide(),this.ishow=!1},new d});