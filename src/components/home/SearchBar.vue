<!-- 头部搜索组件 -->
<template>
  <div>
    <div class="search-bar" :class="{'hide-title':!titleVisible,'hide-shadow':!shadowVisible}">
      <div class="title-icon-back-wrapper" @click="back">
        <span class="icon-back icon"></span>
      </div>
      <transition name="title">
        <div class="search-bar-title-wrapper" v-show="titleVisible">
          <div class="title-text-wrapper">
            <span class="title-text title">{{$t('home.title')}}</span>
          </div>
          <div class="title-icon-shake-wrapper" @click="showFlapCard">
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>
      <div class="search-bar-input-wrapper" :class="{'hide-title':!titleVisible}">
        <!-- 占位盒子 -->
        <div class="search-bar-blank"></div>
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input
            type="text"
            class="input"
            :placeholder="$t('home.hint')"
            v-model="searchText"
            @click="showHotSearch"
            @keyup.13.exact="search"
          >
        </div>
      </div>
    </div>
    <HotSearchList v-show="hotSearchVisible" ref="hotSearch"></HotSearchList>
  </div>
</template> 

<script>
import { storeHomeMixin } from "../../utils/mixin";
import HotSearchList from "./HotSearchList";

export default {
  components: {
    HotSearchList
  },
  data() {
    return {
      searchText: "",
      titleVisible: true,
      shadowVisible: false,
      hotSearchVisible: false
    };
  },
  mixins: [storeHomeMixin],
  watch: {
    offsetY(offsetY) {
      if (offsetY > 0) {
        this.hideTile();
        this.showShadow();
      } else {
        this.showTitle();
        this.hideShadow();
      }
    },
    hotSearchOffsetY(offsetY) {
      if (offsetY > 0) {
        this.showShadow();
      } else {
        this.hideShadow();
      }
    }
  },
  methods: {
    // 显示隐藏标题栏
    hideTile() {
      this.titleVisible = false;
    },
    showTitle() {
      this.titleVisible = true;
    },
    // 显示隐藏搜索栏底部阴影
    hideShadow() {
      this.shadowVisible = false;
    },
    showShadow() {
      this.shadowVisible = true;
    },
    // 显示隐藏热门搜索组件
    hideHotSearch() {
      this.hotSearchVisible = false;
      if (this.offsetY > 0) {
        this.hideTitle();
        this.showShadow();
      } else {
        this.showTitle();
        this.hideShadow();
      }
    },
    showHotSearch() {
      this.hideTile();
      this.hideShadow();
      this.hotSearchVisible = true;
      this.$nextTick(() => {
        this.$refs.hotSearch.reset();
      });
    },
    // 返回事件
    back() {
      if (this.offsetY > 0) {
        this.showShadow();
      } else {
        this.hideShadow();
      }
      if( this.hotSearchVisible) {
        this.hideHotSearch()
      } else {
        this.$router.push('/shelf')
      }
    },
    // 显示翻转卡片
    showFlapCard() {
      this.setFlapCardVisible(true);
    },
    // 搜索功能
    search() {
      this.$router.push({
        path: "/store/list",
        query: {
          keyword: this.searchText
        }
      });
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.search-bar {
  position: relative;
  z-index: 150;
  width: 100%;
  height: rem(94);
  box-shadow: 0 rem(2) rem(2) 0 rgba(0, 0, 0, 0.1);
  &.hide-title {
    height: rem(52);
    .title-icon-back-wrapper {
      height: rem(52);
    }
  }
  &.hide-shadow {
    box-shadow: none;
  }
  .title-icon-back-wrapper {
    position: absolute;
    top: 0;
    left: rem(15);
    height: rem(42);
    @include center;
    z-index: 200;
    transition: height $animationTime $animationType;
  }
  .search-bar-title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: rem(42);

    .title-text-wrapper {
      width: 100%;
      height: rem(42);
      @include center;
    }
    .title-icon-shake-wrapper {
      position: absolute;
      top: 0;
      right: rem(15);
      height: rem(42);
      @include center;
    }
  }
  .search-bar-input-wrapper {
    display: flex;
    position: absolute;
    top: rem(42);
    left: 0;
    width: 100%;
    height: rem(52);
    padding: rem(10);
    transition: top $animationTime $animationType;
    &.hide-title {
      top: 0;
      .search-bar-blank {
        flex: 0 0 rem(31);
        width: rem(31);
      }
    }
    .search-bar-blank {
      flex: 0;
      width: 0;
      transition: all $animationTime $animationType;
    }
    .search-bar-input {
      flex: 1;
      border-radius: rem(20);
      padding: rem(5) rem(15);
      width: 100%;
      background: #f4f4f4;
      border: rem(1) solid #eee;
      @include left;
      .icon-search {
        color: #999;
      }
      .input {
        width: 100%;
        height: rem(22);
        border: none;
        background: transparent;
        margin-left: rem(10);
        font-size: rem(12);
        color: #666;
        &:focus {
          outline: none;
        }
        &::-webkit-input-placeholder {
          color: #999;
        }
      }
    }
  }
}
</style>