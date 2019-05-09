import { getReadTime } from './localStorage'

export function rem(px) {
  const ratio = 375 / 10
  return px / ratio
}

export function realPx(px) {
  const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth
  return px * (maxWidth / 375)
}

// 扁平化数组对象，树状数组转成一维数组
export function flatten(arr) {
  return [].concat(
    ...arr.map(item => [].concat(item, ...flatten(item.subitems)))
  );
}

// 动态添加css
export function addCss(href) {
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href)
  document.getElementsByTagName('head')[0].appendChild(link)
}

// 删除多余css
export function removeCss(href) {
  const links = document.getElementsByTagName('link');
  for (let i = links.length; i >= 0; i--) {
    const link = links[i]
    if (link && link.getAttribute('href') && link.getAttribute('href') === href) {
      link.parentNode.removeChild(link)
    }
  }
}

// 清楚前面所有css
export function removeAllCss() {
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
}

// 阅读分钟转换
export function getReadTimeByMinute(fileName) {
  const readTime = getReadTime(fileName);
  if (!readTime) {
    return 0;
  } else {
    return Math.ceil(readTime / 60);
  }
}