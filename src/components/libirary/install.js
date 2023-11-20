
import { defineAsyncComponent } from "vue";
const componentss = import.meta.glob("./*.vue");
/**
 * 全局组件引用管理
 */
export default {
  install(app) {
    for (let [key, value] of Object.entries(componentss)) {
      // console.log(key, value, 'zks'); //key: ./goodView.vue  value:() => import("/src/components/libirary/goodView.vue") zk
      // 字符串截取，具体看下面console.log()中的name就知道了
      let name = key.slice(key.lastIndexOf("/") + 1, key.lastIndexOf("."));

      //   console.log(`注意这里的name名称=》》            ${name}       ===>这个名称，
      //   自己作为了全局祖册组件的名称了,也就是如左侧目录的：aaa.vue去掉.vue就剩下aaa了
      //   ，然后那这个名称作为组件引用的名称，具体看截图就知道了。这时就是相当于跟左侧
      //   项目目录的.vue结尾的文件去掉.vue得到的名称`)
      app.component('Xtx' + name, defineAsyncComponent(value));
    }
  }
}