function Validator() {
    this.cache = [];
    this.warDom = [];
}
// 自带方法
Validator.prototype.strategies = {
    isNonEmpty(val, errorMsg) {
        if (!val) {
            return errorMsg;
        }
        return true;
    },
    maxLength(val, len, errorMsg) {
        if (val && val.length > len) {
            return errorMsg;
        }
        return true;
    },
    minLength(val, len, errorMsg) {
        if (val && val.length < len) {
            return errorMsg
        }
        return true;
    }
}
// 添加一个判断策略 策略模式
Validator.prototype.add = function (dom, showDom, strategyArr) {
    let self = this;
    this.warDom.push(showDom);
    strategyArr.forEach((item, index) => {
        self.cache.push(() => {
            let arr = item.strategy.split(":");
            // arr 1 ["isNonEmpty"] 2 ["maxlength","4"]
            let type = arr.shift();
            // 1 type = isNonEmpty , 2 type = maxlength
            // arr 1 [] 2 ["4"]
            arr.unshift(dom.value);
            // arr 1 [value] 2 [value,"4"]
            arr.push(item.errorMsg);
            // arr 1 [value,errorMsg] 2 [value,"4",errorMsg]
            let msg = self.strategies[type](...arr);
            if (msg != true) {
                showDom.innerText = msg;
            }
            return msg;
        })
    })
}
// 判断是否符合
Validator.prototype.start = function () {
    // 标记是否能符合规则
    this.warDom.forEach(item => {
        item.innerText = "";
    })
    let flag = true;
    this.cache.forEach(item => {
        if (item() != true) {
            flag = false;
        }
    })
    return flag;
}
// 拓展方法
Validator.prototype.extend = function (config) {
    for (const prop in config) {
        this.strategies[prop] = config[prop];
    }
}