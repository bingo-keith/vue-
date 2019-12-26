import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options) // 执行一些初始化操作，绑定一些属性和方法
}

initMixin(Vue) // 继承一些属性和方法，以及两个生命周期的钩子beforeCreate和created
stateMixin(Vue) // 继承state和props, 增加响应式，增加实例方法$set, $delete和$watch方法, $unwatchFn方法
eventsMixin(Vue) // 继承实例方法$on, $off, $once, $emit, 其中$on方法可以监听组件的生命周期钩子
lifecycleMixin(Vue) // 继承实例方法_update, $forceUpdate, $destroy
renderMixin(Vue) // 继承渲染助手的方法, $nextTick, _render方法

export default Vue
