<!-- 书架搜索框 -->
<template>
  <div
    class="shelf-search-wrapper"
    :class="{'search-top':ifInputClick, 'hide-shadow':ifHideShadow}"
  >
    <div class="shelf-search" :class="{'search-top':ifInputClick}">
      <div class="search-wrapper">
        <div class="icon-search-wrapper">
          <span class="icon-search icon"></span>
        </div>
        <div class="search-input-wrapper">
          <input
            type="text"
            class="search-input"
            :placeholder="$t('shelf.search')"
            @click="onSearchClick"
            v-model="searchText"
          >
        </div>
        <div class="icon-clear-wrapper" v-show="searchText.length>0" @click="clearSearchText">
          <div class="icon-close-circle-fill icon"></div>
        </div>
      </div>
      <div class="icon-locale-wrapper" v-if="!ifInputClick" @click="switchLocale">
        <span class="icon-cn icon" v-if="lang==='cn'"></span>
        <span class="icon-en icon" v-else></span>
      </div>
      <div class="cancel-btn-wrapper" v-else>
        <div class="cancel-text" @click="onCancelClick">{{$t('shelf.cancel')}}</div>
      </div>
    </div>
    <transition name="shelf-tab-slide-up">
      <div class="shelf-search-tab-wrapper" v-show="ifInputClick">
        <div
          class="shelf-search-tab-item"
          v-for="item in tabs"
          :key="item.id"
          @click="onTabClick(item.id)"
        >
          <div
            class="shelf-search-tab-text"
            :class="{'selected':item.id===selectedTab}"
          >{{item.text}}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { shelfMixin } from "../../utils/mixin";
import { setLocalStorage } from "../../utils/localStorage";
export default {
  components: {},
  data() {
    return {
      ifInputClick: false,
      searchText: "",
      selectedTab: 1,
      ifHideShadow: true
    };
  },
  mixins: [shelfMixin],
  computed: {
    tabs() {
      return [
        {
          id: 1,
          text: this.$t("shelf.default")
        },
        {
          id: 2,
          text: this.$t("shelf.progress")
        },
        {
          id: 3,
          text: this.$t("shelf.purchase")
        }
      ];
    },
    lang() {
      return this.$i18n.locale;
    }
  },
  watch: {
    offsetY(offsetY) {
      if (offsetY > 0 && this.ifInputClick) {
        this.ifHideShadow = false;
      } else {
        this.ifHideShadow = true;
      }
    }
  },
  methods: {
    onSearchClick() {
      this.ifInputClick = true;
      this.setShelfTitleVisible(false);
    },
    onCancelClick() {
      this.ifInputClick = false;
      this.setShelfTitleVisible(true);
    },
    // 切换国际化文本
    switchLocale() {
      if (this.lang === "en") {
        this.$i18n.locale = "cn";
      } else {
        this.$i18n.locale = "en";
      }
      setLocalStorage("locale", this.$i18n.locale);
    },
    // 清除搜索框内容
    clearSearchText() {
      this.searchText = "";
    },
    // 切换选中tab栏
    onTabClick(id) {
      this.selectedTab = id;
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.shelf-search-wrapper {
  position: relative;
  z-index: 105;
  width: 100%;
  height: rem(94);
  background-color: #fff;
  box-shadow: 0 rem(2) rem(2) 0 rgba(0, 0, 0, 0.1);
  &.hide-shadow {
    box-shadow: none;
  }
  &.search-top {
    position: fixed;
    top: 0;
    left: 0;
  }
  .shelf-search {
    position: absolute;
    top: rem(42);
    left: 0;
    width: 100%;
    height: rem(52);
    z-index: 105;
    display: flex;
    transform: top $animationTime $animationType;
    &.search-top {
      top: 0;
    }
    .search-wrapper {
      flex: 1;
      display: flex;
      margin: rem(8) 0 rem(8) rem(10);
      border: rem(1) solid #ccc;
      border-radius: rem(3);
      .icon-search-wrapper {
        flex: 0 0 rem(22);
        @include right;
      }
      .search-input-wrapper {
        flex: 1;
        padding: 0 rem(10);
        font-size: 0;
        .search-input {
          width: 100%;
          height: 100%;
          font-size: rem(14);
          border: none;
          color: #333;
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder {
            font-size: rem(14);
            color: #ccc;
          }
        }
      }
      .icon-clear-wrapper {
        flex: 0 0 rem(24);
        @include center;
      }
    }
    .icon-locale-wrapper {
      flex: 0 0 rem(55);
      @include center;
      .icon-cn,
      .icon-en {
        font-size: rem(22);
        color: #666;
      }
    }
    .cancel-btn-wrapper {
      flex: 0 0 rem(55);
      @include center;
      .cancel-text {
        font-size: rem(14);
        color: $color-blue;
      }
    }
  }
  .shelf-search-tab-wrapper {
    position: absolute;
    top: rem(52);
    left: 0;
    z-index: 105;
    display: flex;
    width: 100%;
    height: rem(42);
    .shelf-search-tab-item {
      flex: 1;
      @include center;
      .shelf-search-tab-text {
        font-size: rem(12);
        color: #999;
        &.selected {
          color: $color-blue;
        }
      }
    }
  }
}
</style>