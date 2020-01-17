import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

// 初始化一些全局属性
initGlobalAPI(Vue)

// 是否运行于服务器
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

// 通过this.$ssrContext 访问服务器端渲染上下文
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
// 暴露函数式组件的上下文，用于服务器端渲染
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue
