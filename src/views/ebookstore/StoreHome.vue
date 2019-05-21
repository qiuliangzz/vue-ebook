<!-- 书城首页 -->
<template>
  <div class="store-home">
    <SearchBar></SearchBar>
    <FlapCard :data="random"></FlapCard>
    <Srcoll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div>111111111111111111111111</div>
      <div>111111111111111111111111</div>
      <div>111111111111111111111111</div>
      <div>111111111111111111111111</div>
      <div>111111111111111111111111</div>
      <div>111111111111111111111111</div>
      <div>111111111111111111111111</div>
      <div>111111111111111111111111</div>
      <div>111111111111111111111111</div>
      <div>111111111111111111111111</div>
      <div>111111111111111111111111</div>
      <div>111111111111111111111111</div>
      <div>111111111111111111111111</div>
      <div>111111111111111111111111</div>
      <div>111111111111111111111111</div>
      <div>111111111111111111111111</div>
      <div>111111111111111111111111</div>
    </Srcoll>
  </div>
</template>

<script>
import SearchBar from "../../components/home/SearchBar";
import Srcoll from "../../components/common/Scroll";
import FlapCard from "../../components/home/FlapCard";
import { storeHomeMixin } from "../../utils/mixin";
import { home } from "../../api/index.js";

export default {
  components: {
    SearchBar,
    Srcoll,
    FlapCard
  },
  data() {
    return {
      scrollTop: 94,
      random: null
    };
  },
  mixins: [storeHomeMixin],
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY);
      if (offsetY > 0) {
        this.scrollTop = 52;
      } else {
        this.scrollTop = 94;
      }
      this.$refs.scroll.refresh();
    }
  },
  created() {
    home().then(response => {
      if (response && response.status === 200) {
        const { data } = response;
        // 获取随机数
        const randomIndex = Math.floor(Math.random() * data.random.length);
        // 随机抽取一本图书
        this.random = data.random[randomIndex];
      }
    });
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.store-home {
  width: 100%;
  height: 100%;
}
</style>