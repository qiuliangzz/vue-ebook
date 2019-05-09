<!-- 目录侧滑栏 -->
<template>
  <transition name="fade">
    <div class="slide-content-wrapper" v-show="menuVisible && settingVisible === 3">
      <transition name="slide-right">
        <div class="content" v-if="settingVisible === 3">
          <div class="content-page-wrapper" v-if="
          bookAvailable">
            <div class="content-page">
              <!-- 动态切换组件 component + :is-->
              <component :is="currentTab === 1?navigations:bookmarks"></component>
            </div>
            <div class="content-page-tab">
              <div
                class="content-page-tab-item"
                :class="{selected:currentTab === 1}"
                @click="selectTab(1)"
              >{{$t('book.navigation')}}</div>
              <div
                class="content-page-tab-item"
                :class="{selected:currentTab === 2}"
                @click="selectTab(2)"
              >{{$t('book.bookmark')}}</div>
            </div>
          </div>
          <!-- 图书没有展示完毕的目录加载动画 -->
          <div class="content-empty" v-else>
            <EbookLoading></EbookLoading>
          </div>
        </div>
      </transition>
      <div class="content-bg" @click="hideTitleAndMenu()"></div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from "../../utils/mixin.js";
import EbookSlideNavigations from "./EbookSlideNavigations";
import EbookSlideBookmarks from "./EbookSlideBookmarks";
import EbookLoading from "./EbookLoading";
export default {
  components: { EbookLoading },
  data() {
    return {
      currentTab: 1,
      navigations: EbookSlideNavigations,
      bookmarks: EbookSlideBookmarks
    };
  },
  mixins: [ebookMixin],
  methods: {
    selectTab(tab) {
      this.currentTab = tab;
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.slide-content-wrapper {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  .content {
    flex: 0 0 85%;
    width: 85%;
    height: 100%;
    .content-page-wrapper {
      @include column;
      width: 100%;
      height: 100%;
      .content-page {
        flex: 1;
        width: 100%;
        overflow: hidden;
      }
      .content-page-tab {
        display: flex;
        flex: 0 0 rem(48);
        width: 100%;
        height: rem(48);
        .content-page-tab-item {
          flex: 1;
          font-size: rem(12);
          @include center;
        }
      }
    }
    .content-empty {
      width: 100%;
      height: 100%;
      @include center;
    }
  }
  .content-bg {
    flex: 0 0 15%;
    width: 15%;
    height: 100%;
  }
}
</style>