<!-- 增加组件 -->
<template>
  <div class="shelf-item-add">
    <span class="icon-add"></span>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: {
    data: Object
  },
  mixins: [],
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.shelf-item-add {
  width: 100%;
  height: 100%;
  border: rem(1) solid #ccc;
  @include center;
  .icon-add {
    font-size: rem(40);
    color: #ccc;

  }
}
</style>