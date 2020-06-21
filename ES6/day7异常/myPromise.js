/*
 * @Author: your name
 * @Date: 2020-06-26 15:45:23
 * @LastEditTime: 2020-06-26 17:59:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \每日的学习\ES6\day7异常\myPromise.js
 */

const MyPromise = (() => {

    const PENDING = "pending",
        RESOLVED = "resolved",
        REJECTED = "rejected",
        PromiseValue = Symbol("PromiseValue"), //状态数据
        PromiseStatus = Symbol("PromiseStatus"), //当前状态
        thenables = Symbol("thenables"), // resolve 队列
        catchables = Symbol("catchables"), // reject 队列
        changeStatus = Symbol("changeStatus"), // 当前状态
        settleHandle = Symbol("settleHandle"), // 后续处理
        linkPromise = Symbol("linkPromise"); // 串联的promise

    return class {
        /**
         * @description: 
         * @param {type} 
         * @return: 
         */
        constructor(executor) {
            this[PromiseStatus] = PENDING;
            this[PromiseValue] = undefined;
            this[thenables] = []; // 后序处理函数的数组 -> resolved
            this[catchables] = []; // 后序处理函数的数组 -> rejected

            const resolve = (data) => {
                this[changeStatus](RESOLVED, data, this[thenables]);
            }

            const reject = (reason) => {
                this[changeStatus](REJECTED, reason, this[catchables]);
            }
            try {
                executor(resolve, reject);
            } catch (err) {
                reject(err)
            }

        }

        /**
         * @description: 
         * @param {type} 
         * @return: 
         */
        [changeStatus](newStatus, newValue, queue) {
            if (this[PromiseStatus] !== PENDING) {
                //状态无法变更
                return;
            }
            this[PromiseStatus] = newStatus;
            this[PromiseValue] = newValue;

            // 执行响应队列里的函数

            queue.forEach(handler => handler(newValue));
        }

        [linkPromise](thenable, catchable) {
            function exec(data, handler, resolve, reject) {
                try {
                    const result = handler(data); // 得到当前Promise处理结果
                    if (result instanceof MyPromise) { // 处理串联中返回一个promise对象
                        result.then(resp => {
                            resolve(resp);
                        }, err => {
                            reject(err);
                        })
                    } else {
                        resolve(result);
                    }
                } catch (err) {
                    reject(err);
                }
            }
            return new MyPromise((resolve, reject) => {
                this[settleHandle](data => {
                    if(typeof thenable !== "function"){
                        // 父级Promise没有注册tnenable
                        resolve(data);
                        return;
                    }
                    exec(data, thenable, resolve, reject);
                }, this[thenables], RESOLVED);

                this[settleHandle](reason => {
                    if(typeof catchable !== "function"){
                        // 父级Promise没有注册tnenable
                        reject(data);
                        return;
                    }
                    exec(reason, catchable, resolve, reject);
                }, this[catchables], REJECTED);
            })
        }

        then(thenable, catchable) {
            return this[linkPromise](thenable, catchable);
        }

        catch (catchable) {
            return this[linkPromise](undefined, catchable);
        }

        [settleHandle](handler, queue, immediatelyStatus) {
            if (typeof handler !== "function") {
                return;
            }
            if (this[PromiseStatus] === immediatelyStatus) {
                setTimeout(() => {
                    handler(this[PromiseValue]);
                }, 0)
            } else {
                queue.push(handler);
            }
        }
        static all(proms) {
            return new MyPromise((resolve, reject) => {
                const results = proms.map(p => {
                    const obj = {
                        result: undefined,
                        isResolved: false
                    }
                    p.then(data => {
                        obj.result = data;
                        obj.isResolved = true;
                        // console.log(results);
                        const unResolved = results.filter(r => !r.isResolved);
                        if (unResolved.length == 0) {
                            resolve(results.map(r => r.result));
                        }
                    }, reason => {
                        reject(reason)
                    })
                    return obj;
                })
                // console.log(results);
            })
        }

        static race(proms) {
            return new MyPromise((resolve, reject) => {
                proms.forEach(p => {
                    p.then(data => {
                        resolve(data);
                    }, err => {
                        reject(err);
                    })
                })
            })
        }
        static resolve(data) {
            if (data instanceof MyPromise) {
                return data;
            } else {
                return new MyPromise(resolve => {
                    resolve(data);
                })
            }
        }
        static reject(reason) {
            return new MyPromise((resolve, reject) => {
                reject(reason);
            })
        }
    }
})();