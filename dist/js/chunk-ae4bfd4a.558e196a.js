(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ae4bfd4a"],{"0a92":function(t,e,i){},"637a":function(t,e,i){},7263:function(t,e,i){"use strict";var a=i("0a92"),s=i.n(a);s.a},"8c8f":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home-title-wrapper"},[i("div",{staticClass:"label"},[t._v(t._s(t.label))]),i("div",{staticClass:"btn",on:{click:t.click}},[t._v(t._s(t.btn))])])},s=[],n={props:{label:String,btn:String},methods:{click:function(){this.$emit("onClick")}}},r=n,c=(i("ea18"),i("2877")),l=Object(c["a"])(r,a,s,!1,null,"e16a9178",null);e["a"]=l.exports},cbe5:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"featured"},[t.titleVisible&&t.data&&t.data.length>0?i("title-view",{attrs:{label:t.titleText,btn:t.btnText}}):t._e(),i("div",{staticClass:"featured-list"},[i("div",{staticClass:"featured-item-wrapper"},t._l(t.data,function(e,a){return i("div",{key:a,staticClass:"featured-item",on:{click:function(i){return t.showBookDetail(e)}}},[i("div",{staticClass:"img-wrapper"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.cover,expression:"item.cover"}],staticClass:"img"})]),i("div",{staticClass:"content-wrapper"},[i("div",{ref:"title",refInFor:!0,staticClass:"title title-small"},[t._v(t._s(e.title))]),i("div",{ref:"author",refInFor:!0,staticClass:"author sub-title-tiny"},[t._v(t._s(e.author))]),i("div",{ref:"category",refInFor:!0,staticClass:"category third-title-tiny"},[t._v(t._s(t.categoryText(e.category)))])])])}),0)])],1)},s=[],n=(i("ac6a"),i("8c8f")),r=i("fa7d"),c=i("da06"),l=i("ac0d"),o={mixins:[l["c"]],components:{TitleView:n["a"]},props:{data:Array,titleVisible:{type:Boolean,default:!0},titleText:{type:String},btnText:{type:String}},computed:{width:function(){return window.innerWidth-Object(r["d"])(20)-Object(r["d"])(60)+"px"}},methods:{categoryText:function(t){return Object(c["c"])(t,this)},resize:function(){var t=this;this.$nextTick(function(){t.$refs.title.forEach(function(e){e.style.width=t.width}),t.$refs.author.forEach(function(e){e.style.width=t.width}),t.$refs.category.forEach(function(e){e.style.width=t.width})})}}},u=o,d=(i("7263"),i("2877")),f=Object(d["a"])(u,a,s,!1,null,"370e2b36",null);e["a"]=f.exports},ea18:function(t,e,i){"use strict";var a=i("637a"),s=i.n(a);s.a}}]);
//# sourceMappingURL=chunk-ae4bfd4a.558e196a.js.map