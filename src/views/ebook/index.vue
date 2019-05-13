<template>
  <div class="ebook" ref="ebook">
    <EbookHeader></EbookHeader>
    <EbookTitle></EbookTitle>
    <EbookReader></EbookReader>
    <EbookMenu></EbookMenu>
    <EookBookmark></EookBookmark>
    <EbookFooter></EbookFooter>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import EbookReader from "../../components/ebook/EbookReader";
import EbookTitle from "../../components/ebook/EbookTitle";
import EbookMenu from "../../components/ebook/EbookMenu";
import EookBookmark from "../../components/ebook/EookBookmark";
import EbookHeader from "../../components/ebook/EbookHeader";
import EbookFooter from "../../components/ebook/EbookFooter";
import { getReadTime, saveReadTime } from "../../utils/localStorage";
import { ebookMixin } from "../../utils/mixin";
import { setTimeout } from "timers";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu,
    EookBookmark,
    EbookHeader,
    EbookFooter
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
  watch: {
    offsetY(v) {
      // 下拉
      // 显示标题栏和分页未成功时，不可下拉
      if (!this.menuVisible && this.bookAvailable) {
        if (v > 0) {
          this.move(v);
        } else if (v === 0) {
          this.restore();
        }
      }
    }
  },
  // 方法集合
  methods: {
    // 下拉页面手势功能
    move(v) {
      this.$refs.ebook.style.top = v + "px";
    },
    // 下拉恢复
    restore() {
      this.$refs.ebook.style.top = 0;
      this.$refs.ebook.style.transition = "all .2s linear";
      setTimeout(() => {
        this.$refs.ebook.style.transition = "";
      }, 200);
    },
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
.ebook {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
