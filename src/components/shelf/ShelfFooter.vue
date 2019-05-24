<!-- 底部菜单栏 -->
<template>
  <div class="shelf-footer" v-show="isEditMode">
    <div
      class="shelf-footer-tab-wrapper"
      v-for="item in tabs"
      :key="item.index"
      @click="onTabClick(item)"
    >
      <div class="shelf-footer-tab" :class="{'is-selected':isSelected}">
        <div class="icon-private tab-icon" v-if="item.index===1"></div>
        <div class="icon-download tab-icon" v-if="item.index===2"></div>
        <div class="icon-move tab-icon" v-show="item.index===3"></div>
        <div class="icon-shelf tab-icon" v-show="item.index===4"></div>
        <div class="tab-text">{{item.label}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { shelfMixin } from "../../utils/mixin";
import { pbkdf2 } from "crypto";
export default {
  components: {},
  data() {
    return {};
  },
  mixins: [shelfMixin],
  computed: {
    isSelected() {
      return this.shelfSelected && this.shelfSelected.length > 0;
    },
    tabs() {
      return [
        {
          label: this.$t("shelf.private"),
          label2: this.$t("shelf.noPrivate"),
          index: 1
        },
        {
          label: this.$t("shelf.download"),
          label2: this.$t("shelf.delete"),
          index: 2
        },
        {
          label: this.$t("shelf.move"),
          index: 3
        },
        {
          label: this.$t("shelf.remove"),
          index: 4
        }
      ];
    }
  },
  methods: {
    onTabClick(item) {}
  },
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.shelf-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 120;
  display: flex;
  width: 100%;
  height: rem(48);
  background-color: #fff;
  box-shadow: 0 rem(-2) rem(4) 0 rgba(0, 0, 0, 0.1);
  .shelf-footer-tab-wrapper {
    flex: 1;
    width: 25%;
    height: 100%;
    .shelf-footer-tab {
      width: 100%;
      height: 100%;
      opacity: 0.5;
      @include columnCenter;
      .tab-icon {
        font-size: rem(20);
        color: #666;
      }
      .tab-text {
        margin-top: rem(5);
        font-size: rem(12);
        color: #666;
      }
      &.is-selected {
        opacity: 1;
      }
    }
  }
}
</style>