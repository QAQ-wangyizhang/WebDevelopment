<template>
  <ul class="tree">
    <li class="tree-node" v-for="(node,index) in data" :key="node[defaultProps.label]">
      <i class="iconfont"
         v-if="node[defaultProps.children]"
        :class="{'icon-down':!showList[index],'icon-right':showList[index]}"
      ></i>
      <span @click="handleNode(index)">{{node[defaultProps.label]}}</span>
      <keep-alive>
           <base-tree :data="node[defaultProps.children]"
                 v-if="showList[index] "
      />
      </keep-alive>
    </li>
  </ul>
</template>

<script>
export default {
  name: "base-tree",
  props: {
    data: {
      type: Array,
      require: true,
    },
    defaultProps: {
      type: Object,
      default: () => ({
        label: "label",
        children: "children",
      }),
    },
  },
  data(){
      return {
          showList :[]
      }
  },
  methods: {
      handleNode(index){
          const flag = !this.showList[index];
          this.$set(this.showList,index,flag)
      }
  },
  mounted() {
  },
};
</script>

<style scoped>
@import url(./assets/font.css);

ul {
  list-style: none;
}

.tree-node .iconfont {
  color: #d1d2d3;
  font-size: 13px;
  margin-right: 4px;
  cursor: pointer;
}

.tree-node span {
  color: rgba(0, 0, 0, 0.56);
  font-size: 14px;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
}
</style>