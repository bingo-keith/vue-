/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  // 暴露一些工具方法
  // 他们不是公共API，尽量避免依赖它们，除非你知道使用它们带来的风险
  Vue.util = {
    warn, // 打印警告的方法，用户传入warnHandler或直接console.error打印
    extend, // 利用for in循环实现混入式继承，
    mergeOptions, // 合并传入的options并返回一个新对象
    defineReactive // 给对象增加响应式
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  // vue2.6新增API，类似vuex，传入的对象变为响应式
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }

  // 这里用create创建对象而不是字面量{}，主要原因有
  // 需要一个干净可定制的对象，原型链上没有toString等对象原型内置的方法
  // 节省hasOwnProperty带来的性能损失
  // 参考：https://www.imooc.com/article/26080
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  // 用来识别构造函数以扩展weex多实例脚本中所有的纯对象组件
  Vue.options._base = Vue

  // 扩展components，目前只有keep-alive
  extend(Vue.options.components, builtInComponents)

  initUse(Vue) // 合并use静态方法
  initMixin(Vue) // 合并mixin静态方法
  initExtend(Vue) // 合并extend静态方法
  initAssetRegisters(Vue) // 合并component directive filter方法
}
