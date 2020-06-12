(function () {
    function jQuery(selector) {
        return new jQuery.prototype.init(selector); // init的原型链上有css的方法
    }
    jQuery.prototype.init = function (selector) {
        // var this = {}
        // 选出 dom 标签 并且包装成jQuery对象 返回
        // id class
        this.length = 0;
        // null undefined
        if (selector == null) {
            return this;
        }
        if (typeof selector == 'string' && selector.indexOf('.') != -1) {
            var dom = document.getElementsByClassName(selector.slice(1));
        } else if (typeof selector == 'string' && selector.indexOf('#') != -1) {
            var dom = document.getElementById(selector.slice(1));
        }
        if (selector instanceof Element || dom.length == undefined) { // 只有一个dom
            this[0] = dom || selector;
            this.length++;
        } else { // 你有很多个dom Elements
            // 循环dom
            for (var i = 0; i < dom.length; i++) {
                this[i] = dom[i] || selector[i];
                this.length++;
            }
        }
        // return this;
    }

    jQuery.prototype.css = function (config) {
        // 循环操作每一个dom
        for (var i = 0; i < this.length; i++) {
            for (var attr in config) {
                this[i].style[attr] = config[attr]; // 这里如果加了px那么就只能修改像素值了 对于颜色透明度就会使其失效
            }
        }
        return this; // 链式操作的精髓 又返回了一个函数本身
    }

    jQuery.prototype.pushStack = function (dom) {
        // dom newObject
        if (dom.constructor != jQuery) {
            dom = jQuery(dom);
        }
        dom.prevObject = this;
        return dom;
    }

    jQuery.prototype.get = function (num) {
        return num == null ? [].slice.call(this, 0) : num >= 0 ? this[num] : this[num + this.length];
    }

    jQuery.prototype.eq = function (num) {
        var dom = num == null ? null : num >= 0 ? this[num] : this[num + this.length];
        return this.pushStack(dom);
    }

    jQuery.prototype.add = function (selector) {
        var curObj = jQuery(selector);
        var baseObj = this;
        var newObject = jQuery();
        for (var i = 0; i < curObj.length; i++) {
            newObject[newObject.length++] = curObj[i];
        }
        for (var i = 0; i < baseObj.length; i++) {
            newObject[newObject.length++] = baseObj[i];
        }
        //  newObject.prevObject = this;
        this.pushStack(newObject);

        return newObject;
    }

    jQuery.prototype.end = function () {
        return this.prevObject;
    }
    jQuery.prototype.myOn = function (type, handle) {
        for (var i = 0; i < this.length; i++) {
            if (!this[i].cacheEvent) {
                this[i].cacheEvent = {};
            }
            if (!this[i].cacheEvent[type]) {
                this[i].cacheEvent[type] = [handle];
            } else {
                this[i].cacheEvent[type].push(handle);
            }
        }
    }

    jQuery.prototype.myTrigger = function (type) {
        var self = this;
        var params = arguments.length > 1 ? [].slice.call(arguments, 1) : [];
        for (var i = 0; i < this.length; i++) {
            if (this[i].cacheEvent[type]) {
                this[i].cacheEvent[type].forEach(function (ele, index) {
                    ele.apply(self, params)
                });
            }
        }
    }

    // 创建队列
    jQuery.prototype.myQueue = function () {
        var queueObj = this;
        var queueName = arguments[0] || 'fx'; // 默认队列名称为'fx'
        var addFunc = arguments[1] || null;
        var len = arguments.length;
        // 获取队列
        if (len == 1) {
            return queueObj[0][queueName];
        }
        // queue dom {chain :} 添加队列 往已有队列push内容
        queueObj[0][queueName] == undefined ? queueObj[0][queueName] = [addFunc] : queueObj[0][queueName].push(addFunc);
        return this;
    }

    jQuery.prototype.myDelay = function (duration) {
        var queueArr = this[0]['fx'];
        queueArr.push(function (next) {
            setTimeout(function () {
                next();
            }, duration);
        })
        return this;
    }

    jQuery.prototype.myDequeue = function () {
        var self = this;
        var queueName = arguments[0] || 'fx';
        var queueArr = this.myQueue(queueName);
        var currFunc = queueArr.shift(); // 去掉数组第一个
        if (currFunc == undefined) {
            return;
        }
        var next = function () {
            self.myDequeue(queueName); // 拿第一个执行 再调用第一个
            // 防止链式调用时 丢失this 把this保存起来一直执行
        }
        currFunc(next);
        return this;
    }

    // json 是目标对象
    jQuery.prototype.myAnimate = function (json, callBack) {
        var len = this.length;
        var self = this;
        var baseFunc = function (next) {
            var times = 0;
            for (var i = 0; i < len; i++) {
                stratMove(self[i], json, function () {
                    times++;
                    if (times == len) {
                        callBack && callBack();
                        next();
                    }
                });
            }
        }
        this.myQueue('fx', baseFunc);
        // 出队操作
        if (this.myQueue('fx').length == 1) {
            this.myDequeue('fx'); // 立马执行
        }

        function getStyle(dom, atter) {
            if (window.getComputedStyle) {
                return window.getComputedStyle(dom, null)[atter];
            } else {
                return dom.getComputedStyle[atter];
            }
        }

        function stratMove(dom, attrObj, callBack) {
            clearInterval(dom.timer);
            var isSpeed = null,
                iCur = null;
            dom.timer = setInterval(() => {
                var bStop = true;
                for (var attr in attrObj) {
                    if (attr == 'opacity') {
                        iCur = parseFloat(getStyle(dom, attr)) * 100;
                    } else {
                        iCur = parseInt(getStyle(dom, attr));
                    }
                    isSpeed = (attrObj[attr] - iCur) / 7;
                    isSpeed = isSpeed > 0 ? Math.ceil(isSpeed) : Math.floor(isSpeed);
                    if (attr == 'opacity') {
                        dom.style.opacity = (iCur + isSpeed) / 100;
                    } else {
                        dom.style[attr] = iCur + isSpeed + 'px';
                    }
                    if (iCur != attrObj[attr]) {
                        bStop = false;
                    }
                }
                if (bStop) {
                    clearInterval(dom.timer);
                    console.log('over');
                    typeof callBack == 'function' && callBack();
                }

            }, 30);

        }
        return this;
    }

    jQuery.myCallbacks = function () {
        // once memory null
        // 存储参数
        var opticons = arguments[0] || '';
        // 通过add来加入方法
        var list = [];
        // 记录当期要执行函数的索引
        var fireIndex = 0;

        // 实参列表
        var args = [];

        //  证明有没有fire过
        var fierd = false;

        var fire1 = function () {
            for (; fireIndex < list.length; fireIndex++) {
                list[fireIndex].apply(window, args);
            }
            if (opticons.indexOf('once') != -1) {
                list = [];
                fireIndex = 0;
            }
        }
        return {
            add: function (func) {
                list.push(func);
                if (opticons.indexOf('memory') != -1 && fierd) {
                    fire1();
                }
                return this;
            },
            fire: function () {
                fireIndex = 0;
                args = arguments;
                fierd = true;
                fire1();
            }
        }
    }

    jQuery.myDeferred = function () {
        // callback 实现的
        // 3 个callback done resolve fail reject progress notify
        var arr = [
            [
                jQuery.myCallbacks('oncememory'), 'done', 'resolve'
            ],
            [
                jQuery.myCallbacks('oncememory'), 'fail', 'reject'
            ],
            [
                jQuery.myCallbacks('memory'), 'progress', 'notify'
            ]
        ];
        var pendding = true;
        var deferred = {};
        for(var i = 0; i < arr.length;i ++){
            // arr[0]
            // 注册
            deferred[arr[i][1]] =  (function(index){
                return function(func){
                    arr[index][0].add(func);
                }
            })(i)
            // 触发
            deferred[arr[i][2]] = (function(index){
                return function(){
                    var args = arguments;
                    if(pendding){
                        arr[index][0].fire.apply(window,args);
                        arr[index][2] == 'resolve' || arr[index][2] == 'reject' ? pendding = false : '';
                    }   
                }
            })(i);
        }

        return deferred;

    }


    jQuery.prototype.init.prototype = jQuery.prototype; // init的原型链上有css的方法
    window.$ = window.jQuery = jQuery; // 内部jQuery的函数被保存到了window上所有没有被释放 就是闭包
})();