<!-- 书城 -->
<template>
  <div class="book-store">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  mixins: [],
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.book-store {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>