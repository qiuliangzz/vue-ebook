<!-- 页脚：阅读进度 -->
<template>
  <div class="ebook-footer">
    <div class="ebook-footer-text">{{this.progress+'%'}}</div>
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";
export default {
  components: {},
  data() {
    return {};
  },
  mixins: [ebookMixin],
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.ebook-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: rem(48);
  padding: 0 rem(15);
  overflow: hidden;
  @include right;
  .ebook-footer-text {
    font-size: rem(12);
    color: #6d7178;
  }
}
</style>