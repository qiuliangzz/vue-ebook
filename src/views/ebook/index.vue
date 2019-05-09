<template>
  <div class="ebook">
    <EbookTitle></EbookTitle>
    <EbookReader></EbookReader>
    <EbookMenu></EbookMenu>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import EbookReader from "../../components/ebook/EbookReader";
import EbookTitle from "../../components/ebook/EbookTitle";
import EbookMenu from "../../components/ebook/EbookMenu";
import { getReadTime, saveReadTime } from "../../utils/localStorage";
import { ebookMixin } from "../../utils/mixin";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu
  },
  data() {
    // 这里存放数据
    return {};
  },
  // 混合
  mixins: [ebookMixin],
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    startLoopReadTime() {
      let readTime = getReadTime(this.fileName);
      if (!readTime) {
        readTime = 0;
      }
      this.task = setInterval(() => {
        readTime++;
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime);
        }
      }, 1000);
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.startLoopReadTime();
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {
    if (this.task) {
      clearInterval(this.task);
    }
  }, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
// @import ""; 引入公共css类
@import "../../assets/styles/global";
</style>
