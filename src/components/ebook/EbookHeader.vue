<!-- 页头：章节名称 -->
<template>
  <div class="ebook-header">
    <div class="ebook-header-text">{{getSectionName}}</div>
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
.ebook-header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: rem(48);
  padding: 0 rem(15);
  overflow: hidden;
  @include left;
  .ebook-header-text {
    font-size: rem(12);
    color: #6d7178;
  }
}
</style>