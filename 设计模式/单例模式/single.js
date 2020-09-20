const single = {
    getSingleCon(func) {
        let result = null;
        return function () {
            if (result) {
                return result;
            }
            result = new func(...arguments);
            return result;
        }
    },
    getSingleFun(func) {
        let result = null;
        return function () {
            if (result) {
                return result;
            }
            result = func(...arguments);
            return result;
        }
    },

}