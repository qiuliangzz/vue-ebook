<!-- 书签图标组件 -->
<template>
  <div class="bookmark" :style="style" ref="bookmark"></div>
</template>

<script>
import { rem } from "../../utils/utils";
export default {
  components: {},
  data() {
    return {
      a: 1
    };
  },
  props: {
    width: Number,
    height: Number,
    color: String
  },
  computed: {
    style() {
      if (this.color) {
        return {
          borderColor: `${this.color} ${this.color} transparent ${this.color}`
        };
      } else {
        return {};
      }
    }
  },
  
  mixins: [],
  methods: {
    // 刷新宽高
    refresh() {
      if (this.width && this.height) {
        this.$refs.bookmark.style.borderWidth = `${rem(
          this.height - 5
        )}rem ${rem(this.width / 2)}rem  ${rem(5)}rem  ${rem(
          this.width / 2
        )}rem`;
      } else {

      }
    }
  },
  created() {},
  mounted() {
    this.refresh();
  }
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
/* 书签图标css */
.bookmark {
  width: 0;
  height: 0;
  border-width: rem(40) rem(10) rem(10) rem(10);
  border-style: solid;
  border-color: #fff #fff transparent #fff;
}
</style>