<!-- 书城首页 -->
<template>
  <div class="store-home">
    <SearchBar></SearchBar>
    <FlapCard :data="random"></FlapCard>
    <Srcoll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <!-- banner  -->
      <div class="banner-wrapper">
        <div class="banner-img" :style="{backgroundImage:`url(${banner})`}"></div>
      </div>
      <!-- 猜你喜欢模块 -->
      <GuessYouLike :data="guessYouLike"></GuessYouLike>
      <!-- 推荐模块 -->
      <Recommend :data="recommend" class="recommend"></Recommend>
      <!-- 精选模块 -->
      <Featured
        :data="featured"
        :titleText="$t('home.featured')"
        :btnText="$t('home.seeAll')"
        class="featured"
      ></Featured>
      <!-- 分类展示模块 -->
      <div class="category-list-wrapper" v-for="(item,index) in categoryList" :key="index">
        <CategoryBook :data="item"></CategoryBook>
      </div>
      <!-- 分类模块 -->
      <Category :data="categories" class="categories"></Category>
    </Srcoll>
  </div>
</template>

<script>
import SearchBar from "../../components/home/SearchBar";
import Srcoll from "../../components/common/Scroll";
import FlapCard from "../../components/home/FlapCard";
import GuessYouLike from "../../components/home/GuessYouLike";
import Recommend from "../../components/home/Recommend";
import Featured from "../../components/home/Featured";
import CategoryBook from "../../components/home/CategoryBook";
import Category from "../../components/home/Category";
import { storeHomeMixin } from "../../utils/mixin";
import { home } from "../../api/index.js";

export default {
  components: {
    SearchBar,
    Srcoll,
    FlapCard,
    GuessYouLike,
    Recommend,
    Featured,
    CategoryBook,
    Category
  },
  data() {
    return {
      scrollTop: 94,
      random: null,
      banner: null,
      guessYouLike: null,
      recommend: null,
      featured: null,
      categoryList: null,
      categories: null
    };
  },
  mixins: [storeHomeMixin],
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY);
      if (offsetY > 0) {
        this.scrollTop = 52;
      } else {
        this.scrollTop = 94;
      }
      this.$refs.scroll.refresh();
    }
  },
  created() {
    home().then(response => {
      if (response && response.status === 200) {
        const { data } = response;
        // 获取随机数
        const randomIndex = Math.floor(Math.random() * data.random.length);
        // 随机抽取一本图书
        this.random = data.random[randomIndex];
        // banner
        this.banner = data.banner;
        // 猜你喜欢的数据
        this.guessYouLike = data.guessYouLike;
        // 热门推荐数据
        this.recommend = data.recommend;
        // 精选数据
        this.featured = data.featured;
        // 分类展示数据
        this.categoryList = data.categoryList;
        // 分类模块数据
        this.categories = data.categories;
      }
    });
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.store-home {
  width: 100%;
  height: 100%;
  .banner-wrapper {
    width: 100%;
    padding: rem(10);
    .banner-img {
      width: 100%;
      height: rem(140);
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
  .recommend,
  .featured,
  .category-list-wrapper,
  .categories {
    margin-top: rem(20);
  }
}
</style>