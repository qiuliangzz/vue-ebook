 <!-- 主题设置页面 -->
 <template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 1">
      <div class="setting-theme">
        <div
          class="setting-theme-item"
          v-for="(item, index) in themeList"
          :key="index"
          @click="setTheme(index)"
        >
          <div
            class="preview"
            :style="{background:item.style.body.background}"
            :class="{'selected': item.name === defaultTheme}"
          ></div>
          <div class="text" :class="{'selected': item.name === defaultTheme}">{{item.alias}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
 
<script>
import { ebookMixin } from "../../utils/mixin";
import { saveTheme } from "../../utils/localStorage";

export default {
  components: {},
  data() {
    return {};
  },
  mixins: [ebookMixin],
  methods: {
    setTheme(index) {
      const theme = this.themeList[index];
      // 设置主题
      this.setDefaultTheme(theme.name).then(() => {
        this.currentBook.rendition.themes.select(this.defaultTheme);
        // 设置全局主题
        this.initGlobalStyle();
      });
      saveTheme(this.fileName, theme.name);
    }
  },
  created() {},
  mounted() {}
};
</script>
 
 <style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.setting-wrapper {
  @include column;
  position: absolute;
  bottom: rem(48);
  left: 0;
  z-index: 101;
  width: 100%;
  height: rem(90);
  background: white;
  box-shadow: 0 rem(-8) rem(8) rgba(0, 0, 0, 0.15);
  .setting-theme {
    display: flex;
    height: 100%;
    .setting-theme-item {
      flex: 1;
      @include column;
      padding: rem(5);
      .preview {
        flex: 1;
        border: rem(1) solid #ccc;
        &.selected {
          box-shadow: 0 rem(4) rem(6) 0 rgba(0, 0, 0, 0.1);
        }
      }
      .text {
        flex: 0 0 rem(20);
        font-size: rem(14);
        color: #ccc;
        @include center;
        &.selected {
          color: #333;
        }
      }
    }
  }
}
</style>