﻿/**
 * 汽车通用控件 - 提示浮层
 * @pingback
 * app
 */
define('css/tips','.m-tips{width:115px;height:115px;position:absolute;text-align:center;background-color:#000;opacity:.7;border-radius:8px;-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);transform:translate(-50%,-50%);left:50%;top:50%}.m-tips i{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDc3NThFNkZFNDNGMTFFNDkxQ0VBQUVGRjFCRkVENTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDc3NThFNzBFNDNGMTFFNDkxQ0VBQUVGRjFCRkVENTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENzc1OEU2REU0M0YxMUU0OTFDRUFBRUZGMUJGRUQ1NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpENzc1OEU2RUU0M0YxMUU0OTFDRUFBRUZGMUJGRUQ1NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmDrX4AAAAjKSURBVHja7F1pbFVFFJ62tBUCKIXKKqGyljVAqcUVKQhuCNoiSqKiGBeMCWKEH5atBZQlBJXIFquiUMoiSGQTWxYDCIUCRRYlkQQFCbIUIluhz3PyzqvX6Zn73u2be2/vqyf5INxtZr4363fODFE+n0/8b1W3Wi6nfzsgBdAO0B7QAXAXoCGgDqAePXcZcAVwDnAScMyAfYALbhUgyuEaiD/Yw4BHAf0BHQHRYX6zHHAY8D1gPWALoCzSCOwJeBkwFNDI5rSwlq4ALAIUeZlArFnPAMYA7nGphe0GzAYsB9zyEoFIXDYg2cI7fwKOA05QLcJ+7Ro1+3rUX9YFtAK0BjS18O2jgPFEZLUmEAeCTwD9gjyHiRYDNgB2UE05azEtHGhSAfdTf9ozhP60ADCKCNVjSKAGxAGyAdd95nYEMBbQUlO6RjSnb5cEyQPmcSogXke6OjKeBNhjkuFywBpAmg2kqZAK+IbSVtkeyrurBA4GXDDJ5EpAVweJk9EJsMwkf6WATLcIfN/kF/4F0N9F4mSkA46atJCJgCinCIwGfKrIzE1Ajq7+RTOwn54AKFPkfSEgxm4CkbzPFRn4A/BANSRORm/A74oyLLZKotXEVTWvCNDUA+QFcCdgh6Isi6w0ZyuJjlMkuBlQz0PkBXAbjdScZesmcIhiwFhOfYvwKGoB8hQDS6YuApMUU5U1HifPOLisZ8p3EdA6XALx47uZj+8C1IkA8gKoQ2WSbW+wGUWwteMkQC/p2inAYBI4I8WwLE8BTkvXewByqiomdCM9zahaoyTUB/BjhCr0D5MwGyOVOZWUb1azY4kFfMxI/lMimDy0QpLhjIZkziVOQlZjMpn+oCRCBo1giAUcZso/lHuea8JYKw9JYig+9BBgew1xtvUh7dBY60qoW/MFa8IZjJK8ogaRJ8gxlS9d6wIYFMogshOQJnWinbWquN6wZGqJxkpWJM9KohnvWZp0bWUNJA/tCGCVdC1FdpDJBL7CfGiWx4lA3/NBwN+AcRbfncZcG6kahXFdeJaZiXt5RG0HOC2V6R2L39gvvX/eOBuJliaRstP7Sw/XvDaAHwBNpOsTLX5H5qABIJ1rwgMZ12O+R8lrReS1YO4dt/itrxmn/ECOwEekhw4ya0MvWAuaw7Vk7qHv+UWL3ztDPmzBcRVtqJYdGSe016w5LceSmHvnqeAlVfhuARNA0MhIYAozInuNwMbUbNsw90oBAwD7w1gjy1pBLyOBXZiXijxEXiKR115B3sAwy7NboVZVENhBunlR+IN9vGAYI7MZ0Im5h3O/JwC7wkzjvKgcu9PeSGAr6aZXVh53ADYBujL3UCR9XKP8dowZ6SsIlIf73zQk+CRgK+Aj4Q/X1W0Y7rZR+FVj2a4Kv2q+VWN68vSnGf4REEwTmCYcjqGikyf8YuSDtDAfRAXTYRgnuE74lWLZbgCeFn5lWaddkv6dYKyBtZmOt6qGI9Q88V9ZvB+JEnEaCoK1+TvAvQry8MfbYEONv8x0HxUE1g/ysFUCOZ0RA8uXh0kikvct1WrZbgKeA6y1qb+VOaklhNonUh5GQvjuKCEpt2SDaGkUU4XvxpO8lM7cw6XWcEZ+st2iFezGh/ndpYA3FCRm0ALdColx1AUMUJD3kgPr9mimxldcvMK17zBtPmC04t7zgIVC5emqTF4eTUkEI3i8CvjKgcqWwI0T0YaJojyz12FzAO8q7o2gwcaMxBgiZ4iCvNcAuQ61VlnqO+fPhV8Y3CSJhts1C5tZJmG2cxTvYJzeEpOo0rccFmcLpTwUGmNjFkg3T9uQgckmJM5kAjlzTZ4f7YK6fVLKQ66RwDFMJhNtyMRME1Im0zNRFG6rsvdcIC+ByQfGS1asRA4ybT6VJqw6DfvDWMDbzL0sGtlQlhqpeH8CYLoLa25uq9p+Yx+IDN+SGJ5q06+JNWyez7pNctE5NYPpgxPl+MASBz1ySOJnFsj70GXv3j5mx1Ulr9xmqYp2F7xTRocF5m9LQngWd1uOdVEyaxYQTzmujASuZ9a0mTZmDFcQLwh/3I3KcOPiGJc1x+HMKuRfrqSwrr+kqnrAoRjl1UyzXVDV3UOaIXdtF4yOdfnh+UxBejtE4heAa4CrgNnVhLxUxT4SZZA598LaGhBUqcKqYBWKC2/bI/xuTmOHjwPKAVGzrDPNj41r9b0SN6weOIMZTCaImmdZjNAxtZJ6zNRAVEB+FpV9rBh8tKWGkJfOTOsO0XSmPFgNxOnFeOb6XA1CqxcsnqZPsk1hlXqTlUIB04Hm1ICBI5sp9zbVrMBso00yDRyxUu3Eprw9gpvuRsndgKcg9aAmHFTnNxrGCM9i+sdlwtqZLV6xJqR+xzCq+iGlCzLIuTHoj9gpKnv/fwL0FZGzXw7dpQWMbIWSVW/hPwBIWK2BaDdoPVzK6GN5Qo+j3G3DMqxmyENP5bNm5JkNIjIyFBuu82kNHWkbrtGG6d7yr/Jp4Mbr2h7d8r9KUaZpdpyZEEULaZ9iA3aTCDl0IteuQycCrsbFioTxKJH7PEBeGuNhC9hSu489CZCo8pqV0SlAsdW0v8syOXgn14mDd4zNeZLJ0U8HHD5sLJRaV2zic8lx8ugneWN2qUn0AEYWtHWRuLspD+Umh48NCycNHZlsSycX+UyaNfab3R0krhsdUVVmkq9iHT+urgzj0SAfhHAAYzGFZTS2gbRGgNdNRlfjDzqdpjFhp6v7CNCOJHv1CcEjh+puIS2hcBvCJYtp1afVQ18SOFJCiDncBniT9E4tZschtFG0BJoo+I0vKj/xCcCvwn/Q9hki9DqRUpeQQL5q3I2UFGJ8oSDC8DSOfMEHfVYrAgOGcTcZFA/T06V17l6S4VeL8MKWXSHQaHiMwAgSJhrYnBZu0cBY6UWkJNlqTh8FH0ei5WP0d7Km7+IuItwXso761OtOFchpAmVLJJdpB+ov8T8lCPxnBA0NfRxmEsOQMaz2FPWXx8jtiG7Ys24VwG0CPW//CDAAh94eP+DYNUwAAAAASUVORK5CYII=);background-size:40px 40px;display:block;margin:0 auto;width:40px;height:40px;margin:18px auto 20px}.m-tips .msg{color:#FFF}');
define('tmpl/Tips','<section class="m-tips"><i></i><span class="msg"></span></section>');
define('module.tips', function(require, exports, module){
  var ins;
  var TMPL = require('tmpl/Tips');
  var CSS = require('css/tips');
  var cfg = {};

  var Tips = function(){
    if(ins){
      return ins;
    }

    this.build();
  }

  Tips.prototype.build = function(){
    X.addCssRule(CSS);
    this.body = $(TMPL);
    this.msg = $('.msg', this.body);

    $(this.body).hide();

    $(document.body).append(this.body);
  }

  Tips.prototype.show = function(_cfg){
    var _this = this;
    cfg = $.extend(cfg, _cfg);

    $(this.msg).html(cfg.msg);
    $(this.body).show();

    setTimeout(function(){
      $(_this.body).animate({
        opacity : 0
      }, 500, 'ease', function(){
        $(_this.body).hide();
        $(_this.body).css({'opacity':1});
        
        if(cfg.callback){
          cfg.callback();
        }
      });
    },1500);

    return this.body;
  }

  Tips.prototype.hide = function(){
    $(this.body).hide();
  }

  return new Tips();
});