<!-- 书架图书列表中的每一个项 -->
<template>
  <div class="shelf-item" :class="{'shelf-item-shadow':data.type!==3}" @click="onItemClick">
    <!-- 动态组件 -->
    <component
      class="shelf-item-comp"
      :class="{'is-edit':isEditMode && data.type===2}"
      :is="item"
      :data="data"
    ></component>
    <div
      class="icon-selected"
      :class="{'is-selected':data.selected}"
      v-show="isEditMode && data.type===1"
    ></div>
  </div>
</template>

<script>
import { shelfMixin } from "../../utils/mixin";
import ShelfItemBook from "./ShelfItemBook";
import ShelfItemCategory from "./ShelfItemCategory";
import ShelfItemAdd from "./ShelfItemAdd";
import { gotoStoreHome } from "../../utils/shelf";
import { pushWithoutDuplicate } from "../../utils/boost";
export default {
  components: {},
  data() {
    return {
      book: ShelfItemBook,
      category: ShelfItemCategory,
      add: ShelfItemAdd
    };
  },
  props: {
    data: Object
  },
  mixins: [shelfMixin],
  computed: {
    item() {
      return this.data.type === 1
        ? this.book
        : this.data.type === 2
        ? this.category
        : this.add;
    }
  },
  methods: {
    onItemClick() {
      if (this.isEditMode) {
        this.data.selected = !this.data.selected;
        if (this.data.selected) {
          this.shelfSelected.pushWithoutDuplicate(this.data);
        } else {
          this.setShelfSelected(
            this.shelfSelected.filter(item => item.id !== this.data.id)
          );
        }
      } else {
        if (this.data.type === 1) {
          // 单书封面跳转到详情页
          this.showBookDetail(this.data);
        } else if (this.data.type === 2) {
          // 分类书籍封面
          this.$router.push({
            path: "/category",
            query: {
              title: this.data.title
            }
          });
        } else {
          // 去书城首页
          gotoStoreHome(this);
        }
      }
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.shelf-item {
  position: relative;
  width: 100%;
  height: 100%;
  &.shelf-item-shadow {
    box-shadow: rem(2) rem(2) rem(6) rem(2) rgba(200, 200, 200, 0.3);
  }
  .shelf-item-comp {
    opacity: 1;
    &.is-edit {
      opacity: 0.5;
    }
  }
  .icon-selected {
    position: absolute;
    bottom: rem(2);
    right: rem(2);
    font-size: rem(18);
    color: rgba(0, 0, 0, 0.4);
    &.is-selected {
      color: $color-blue;
    }
  }
}
</style>