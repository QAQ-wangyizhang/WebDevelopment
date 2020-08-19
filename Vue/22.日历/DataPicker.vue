<template>
  <div class="data-picker" v-click-outside>
    <div class="data-input">
      <span class="iconfont icon-date"></span>
      <input type="text" :value="chooseDate" />
    </div>
    <div class="data-arrow" />
    <div class="data-panel" v-if="showPanel">
      <div class="panel-h">
        <button class="picker-btn iconfont icon-prev-year" @click="changeYear('prev')"></button>
        <button class="picker-btn iconfont icon-prev-month" @click="changeMonth('prev')"></button>
        <span class="picker-data">{{showDate.year}}年{{showDate.month}}月</span>
        <button class="picker-btn iconfont icon-next-month" @click="changeMonth('next')"></button>
        <button class="picker-btn iconfont icon-next-year" @click="changeYear('next')"></button>
      </div>
      <div class="panel-b">
        <div class="picker-week">
          <div v-for="week in ['日','一','二','三','四','五','六']" :key="week">{{week}}</div>
        </div>
        <div class="picker-day">
          <div
            v-for="day in showArr"
            :key="day.id"
            :class="{'other-month' : !isCur(day.id).month,'is-today':isCur(day.id).day,'is-select':isCur(day.id).check}"
            @click="checkDay(day.id)"
          >{{day.day}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 自定义指令
  directives: {
    "click-outside": {
      bind(el, binding, vnode) {
        document.onclick = function (e) {
          const dom = e.target;
          const isElson = el.contains(dom);
          const vm = vnode.context;
          if (isElson && !vm.showPanel) {
            vm.changePanel(true);
          } else if (!isElson && vm.showPanel) {
            vm.changePanel(false);
          }
        };
      },
    },
  },
  model : {
    prop: 'date',
    event : 'choose-date'
  },
  props: {
    date: Date,
  },
  created() {
    // console.log(this.date)
    const { year, month, day } = this.getYearMounthDay(this.date);
    this.showDate.year = year;
    this.showDate.month = month + 1;
    this.showDate.day = day;
  },
  computed: {
    chooseDate() {
      const { year, month, day } = this.getYearMounthDay(this.date);
      return `${year}-${month + 1}-${day}`;
    },
    showArr() {
      const { month, year } = this.showDate;
      let startDay = +new Date(year, month - 1, 1);
      const week = new Date(year, month - 1, 1).getDay();
      let firstDay = startDay - week * 24 * 60 * 60 * 1000;
      const arr = [];
      for (let i = 0; i < 42; i++) {
        arr.push({ day: new Date(firstDay).getDate(), id: firstDay });
        firstDay += 24 * 60 * 60 * 1000;
      }
      console.log(week);
      return arr;
    },
  },
  methods: {
    changePanel(bool) {
      this.showPanel = bool;
    },
    getYearMounthDay(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      return {
        year,
        month,
        day,
      };
    },
    checkDay(date) {
      const { year, month, day } = this.getYearMounthDay(new Date(date));
      this.checkDate = {
        year,
        month: month + 1,
        day,
      };
      this.$emit("choose-date", date);
      this.changePanel(false);
      // console.log(this.checkDate);
    },
    changeMonth(type) {
      const moveMonth = type === "prev" ? -1 : 1;
      let { month, year } = this.showDate;
      const minMonth = 1;
      const maxMonth = 12;
      month += moveMonth;
      // console.log(month);
      if (month < minMonth) {
        month = maxMonth;
        year--;
      } else if (month > maxMonth) {
        month = minMonth;
        year++;
      }
      this.showDate.month = month;
      this.showDate.year = year;
    },
    changeYear(type) {
      const moveYear = type === "prev" ? -1 : 1;
      let {year} = this.showDate;
      year += moveYear;
      this.showDate.year = year;
    },
    isCur(date) {
      const { year: showYear, month: showMonth } = this.showDate;
      const {
        year: checkYear,
        month: checkMonth,
        day: checkDay,
      } = this.checkDate;
      const { year, month, day } = this.getYearMounthDay(new Date(date));
      const {
        year: curYear,
        month: curMonth,
        day: curDay,
      } = this.getYearMounthDay(this.date);
      // console.log(showYear, showDay, year, day, showMonth, month);
      return {
        month: showMonth === month + 1 && showYear === year,
        day: curDay === day && curMonth === month && curYear === year,
        check:
          checkDay === day && checkMonth === month + 1 && checkYear === year,
      };
    },
  },
  data() {
    return {
      showPanel: false,
      showDate: {
        year: 0,
        month: 0,
        day: 0,
      },
      checkDate: {},
    };
  },
};
</script>
<style scoped>
@import url(./assets/font.css);
.data-picker {
  display: inline-block;
  /* background-color: red; */
}
.data-input {
  position: relative;
  background-color: #fff;
  top: -2px;
}
.data-input input {
  height: 30px;
  line-height: 30px;
  padding: 0 25px;
  border-radius: 4px;
  border: 1px solid #ddd;
  outline: none;
  cursor: pointer;
}

.data-input span {
  position: absolute;
  left: 5px;
  top: 6px;
  color: #c4c9cc;
}

.data-arrow {
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-bottom-color: #ddd;
  position: absolute;
  left: 72px;
  top: 30px;
  z-index: 222;
}
.data-arrow::after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-bottom-color: #fff;
  border-top-width: 0;
  position: absolute;
  left: -8px;
  top: 1px;
}
.data-panel {
  position: absolute;
  top: 45px;
  width: 250px;
  height: 309px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
  color: #606266;
  user-select: none;
}
.data-panel .panel-h {
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
}
.data-panel .picker-btn {
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
}
.data-panel .picker-data {
  width: 122px;
  text-align: center;
}

.data-panel .panel-b .picker-week {
  padding-top: 5px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.data-panel .panel-b .picker-day {
  margin-top: 5px;
  padding-top: 5px;
  border-top: 1px solid #ddd;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.picker-day div {
  /* width: 40px; */
  flex: 0 0 14%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  margin-top: 5px;
  font-size: 12px;
  cursor: pointer;
  /* background-color: red; */
}
.picker-day div:hover {
  color: #409eff;
}
.picker-day div.is-today {
  color: #409eff;
  font-weight: 700;
  box-sizing: border-box;
  /* background-color: black; */
  /* border: 1px solid black; */
}
.picker-day div.is-select {
  box-sizing: border-box;
  background-color: #409eff;
  border: 2px solid #fff;
  color: #fff;
  border-radius: 50%;
}
.picker-day div.other-month {
  color: #c0c4cc;
}
</style>