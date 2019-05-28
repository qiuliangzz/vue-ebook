<!-- 书架移动分组对话框组件 -->
<template>
  <Dialog :title="title" ref="dialog">
    <!-- 分组列表 -->
    <div class="dialog-list-wrapper" v-if="!ifNewGroup">
      <div
        class="dialog-list-item"
        :class="{'is-add': item.edit  ? item.edit === 1 : false}"
        v-for="(item, index) in categoryList"
        :key="index"
        @click="onGroupClick(item)"
        v-show="(item.edit === 2 && currentType===2) || item.edit !== 2 || !item.edit"
      >
        <div class="dialog-list-item-text">{{item.title}}</div>
        <div class="dialog-list-icon-wrapper" v-if="shelfCategory.id===item.id&&currentType===2">
          <span class="icon-check"></span>
        </div>
      </div>
    </div>
    <!-- 新建分组输入框 -->
    <div class="dialog-new-group-wrapper" v-else>
      <div class="dialog-input-title-wrapper">
        <span class="dialog-input-title">
          {{showNewGroup
          ? $t("shelf.editGroupName")
          : $t('shelf.groupName')}}
        </span>
      </div>
      <div class="dialog-input-wrapper">
        <div class="dialog-input-inner-wrapper">
          <input type="text" class="dialog-input" v-model="newGroupName" ref="dialogInput">
          <div
            class="dialog-input-clear-wrapper"
            @click="clear"
            v-show="newGroupName && newGroupName.length > 0"
          >
            <span class="icon-close-circle-fill"></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div slot="btn" class="group-dialog-btn-wrapper">
      <div class="dialog-btn" @click="hide">{{$t('shelf.cancel')}}</div>
      <div
        class="dialog-btn"
        @click="createNewGroup"
        :class="{'is-empty': newGroupName&&newGroupName.length === 0}"
        v-if="ifNewGroup"
      >{{$t('shelf.confirm')}}</div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from "../common/Dialog";
import { shelfMixin } from "../../utils/mixin";
import { removeAddFromShelf, appendAddToShelf } from "../../utils/shelf";
import { saveShelf } from "../../utils/localStorage";

export default {
  name: "group-dialog",
  components: {
    Dialog
  },
  data() {
    return {
      ifNewGroup: false,
      newGroupName: ""
    };
  },
  mixins: [shelfMixin],
  props: {
    showNewGroup: {
      type: Boolean,
      default: false
    },
    groupName: String
  },
  computed: {
    defaultCategory() {
      return [
        {
          title: this.$t("shelf.newGroup"),
          edit: 1
        },
        {
          title: this.$t("shelf.groupOut"),
          edit: 2
        }
      ];
    },
    category() {
      return this.shelfList.filter(item => item.type === 2);
    },
    categoryList() {
      return [...this.defaultCategory, ...this.category];
    },
    title() {
      return !this.ifNewGroup
        ? this.$t("shelf.moveBook")
        : this.$t("shelf.newGroup");
    }
  },
  methods: {
    show() {
      this.ifNewGroup = this.showNewGroup;
      this.newGroupName = this.groupName;
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
      // 优化
      setTimeout(() => {
        this.ifNewGroup = false;
      }, 200);
    },
    // 新建、移出、移动分组
    onGroupClick(item) {
      if (item.edit && item.edit === 1) {
        // 新建分组
        this.ifNewGroup = true;
      } else if (item.edit && item.edit === 2) {
        // 在分组内，移出分组
        this.moveOutFromGroup(item);
      } else {
        // 移动到某个组
        this.moveToGroup(item);
      }
    },
    clear() {
      this.newGroupName = "";
    },
    // 移动（加入）分组
    moveToGroup(group) {
      this.setShelfList(
        // 1. 对选中图书进行过滤
        this.shelfList.filter(book => {
          // 找到分组，并且把选中图书移除掉
          if (book.itemList) {
            book.itemList = book.itemList.filter(
              subBook => this.shelfSelected.indexOf(subBook) === -1
            );
          }
          // 把分组以外，选中的图书
          return this.shelfSelected.indexOf(book) === -1;
        })
      ).then(() => {
        // 2. 把选中的图书加入分组中
        if (group && group.itemList) {
          // 合并数组
          group.itemList = [...group.itemList, ...this.shelfSelected];
        }
        // 3. 更新id，对加入的图书进行重新排序
        group.itemList.forEach((item, index) => {
          item.id = index + 1;
        });
        this.simpleToast(
          this.$t("shelf.moveBookInSuccess").replace("$1", group.title)
        );
        // 4. 对数据进行保存
        this.onComplete();
      });
    },
    // 移出分组
    moveOutFromGroup() {
      // 混入中的方法
      this.moveOutOfGroup(this.onComplete);
    },
    // 新建，修改分组
    createNewGroup() {
      // 如果分组名为空，直接返回
      if (!this.newGroupName || this.newGroupName.length === 0) {
        return;
      }
      if (this.showNewGroup) {
        // 修改分组名
        this.shelfCategory.title = this.newGroupName;
        this.onComplete();
      } else {
        // 新建分组
        // 新建分组对象
        const group = {
          id: this.shelfList[this.shelfList.length - 2].id + 1,
          itemList: [],
          selected: false,
          title: this.newGroupName,
          type: 2
        };
        // 把加号排除掉
        let list = removeAddFromShelf(this.shelfList);
        list.push(group);
        list = appendAddToShelf(list);
        // 直接移入新建的分组
        this.setShelfList(list).then(() => {
          this.moveToGroup(group);
        });
      }
    },
    // 完成
    onComplete() {
      saveShelf(this.shelfList);
      this.hide();
      this.setIsEditMode(false);
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.dialog-list-wrapper {
  width: 100%;
  padding: 0 rem(20);
  box-sizing: border-box;
  font-size: rem(14);
  @include scroll;
  .dialog-list-item {
    display: flex;
    padding: rem(15) 0;
    box-sizing: border-box;
    color: #666;
    &.is-add {
      color: $color-blue;
      &:active {
        color: $color-blue-transparent;
      }
    }
    &:active {
      color: rgba(102, 102, 102, 0.5);
    }
    .dialog-list-item-text {
      flex: 1;
    }
    .dialog-list-icon-wrapper {
      flex: 0 0 rem(30);
      color: $color-blue;
      @include right;
    }
  }
}

.dialog-new-group-wrapper {
  width: 100%;
  padding: 0 rem(20);
  box-sizing: border-box;
  .dialog-input-title-wrapper {
    font-size: rem(10);
    margin-top: rem(20);
  }
  .dialog-input-wrapper {
    width: 100%;
    padding: 0 0 rem(30) 0;
    box-sizing: border-box;
    .dialog-input-inner-wrapper {
      display: flex;
      width: 100%;
      padding: rem(10) 0;
      box-sizing: border-box;
      border-bottom: rem(1) solid #eee;
      font-size: rem(14);
      color: #666;
      .dialog-input {
        flex: 1;
        border: none;
        &:focus {
          outline: none;
        }
      }
      .dialog-input-clear-wrapper {
        flex: 0 0 rem(30);
        color: #ccc;
        @include center;
        &:active {
          color: #999;
        }
      }
    }
  }
}

.group-dialog-btn-wrapper {
  width: 100%;
  @include center;
}
.dialog-btn {
  flex: 1;
  &.is-empty {
    color: rgba(255, 255, 255, 0.5);
  }
  &:active {
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
