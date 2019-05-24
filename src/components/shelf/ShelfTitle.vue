<!-- 书架头部标题 -->
<template>
  <transition name="fade">
    <div class="shelf-title" v-show="shelfTitleVisible" :class="{'hide-shadow':ifHideShadow}">
      <div class="shelf-title-text-wrapper">
        <span class="shelf-title-text">{{$t('shelf.title')}}</span>
        <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>
      </div>
      <div class="shelf-title-btn-wrapper left">
        <span class="shelf-title-btn-text" @click="clearCache">{{$t('shelf.clearCache')}}</span>
      </div>
      <div class="shelf-title-btn-wrapper right">
        <span
          class="shelf-title-btn-text"
          @click="onEditClick"
        >{{ isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { shelfMixin } from "../../utils/mixin";
export default {
  components: {},
  data() {
    return {
      ifHideShadow: true
    };
  },
  mixins: [shelfMixin],
  computed: {
    // 选中几本书
    selectedText() {
      const selectNumber = this.shelfSelected ? this.shelfSelected.length : 0;
      return selectNumber <= 0
        ? this.$t("shelf.selectBook")
        : selectNumber === 1
        ? this.$t("shelf.haveSelectedBook").replace("$1", selectNumber)
        : this.$t("shelf.haveSelectedBooks").replace("$1", selectNumber);
    }
  },
  watch: {
    offsetY(offsetY) {
      if (offsetY > 0) {
        this.ifHideShadow = false;
      } else {
        this.ifHideShadow = true;
      }
    }
  },
  methods: {
    // 编辑功能
    onEditClick() {
      // 非编辑状态去除选中状态
      if (!this.isEditMode) {
        this.setShelfSelected([]);
        this.shelfList.forEach(item => {
          item.selected = false;
        });
      }
      this.setIsEditMode(!this.isEditMode);
    },
    // 清除缓存功能
    clearCache() {}
  },
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.shelf-title {
  position: relative;
  z-index: 103;
  width: 100%;
  height: rem(42);
  background-color: #fff;
  box-shadow: 0 rem(2) rem(2) 0 rgba(0, 0, 0, 0.1);
  &.hide-shadow {
    box-shadow: none;
  }
  .shelf-title-text-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: rem(42);
    @include columnCenter;
    .shelf-title-text {
      font-size: rem(16);
      line-height: rem(20);
      font-weight: bold;
      color: #333;
    }
    .shelf-title-sub-text {
      font-size: rem(10);
      color: #666;
    }
  }
  .shelf-title-btn-wrapper {
    position: absolute;
    top: 0;
    height: 100%;
    @include center;
    &.left {
      left: rem(15);
    }
    &.right {
      right: rem(15);
    }
    .shelf-title-btn-text {
      font-size: rem(14);
      color: #666;
    }
  }
}
</style>