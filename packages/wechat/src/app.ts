import type { AppInstance, AppOptions } from './interface'
import { APP_LIFE_CYCLE, createAppLifeCycle } from './lifecycle'
import type { AppLifeCycle, AppLifeCycleOptions } from './lifecycle'
import { setCurrentApp, unshiftCurrentApp } from './instance'

/**
 * createApp is a superset of weChat App in app.js
 * we expect user use it like vue composition api
 * as we know, define data in setup. we should bind
 * value at lunach time.
 *
 * globalData
 *
 * we dont allowed user entry globalDta, we will preset reactive val
 * Or you don't need reactive val, we also support.
 * support change like
 *
 * createApp({
 *  setup(){
 *   const userInfo = ref({})
 *   let userName = ''
 *
 *   onLauch(async(options)=>{
 *   const res = await fecthData()
 *    userInfo.name = res.name
 *    userName = res.name
 *  })
 *
 *  }
 * })
 *
 *
 * We allow you to use multiple lifecycle api like onLuach,
 * the will merged at compiler.
 *
 */

export function createApp<T extends WechatMiniprogram.IAnyObject>(
  opt: AppOptions<T>,
): void {
  if (!opt.setup) return
  const { setup } = opt
  const options: AppLifeCycleOptions = {}
  // Object.keys(APP_LIFE_CYCLE).map((lifecycle: AppLifeCycle) =>
  //   createLifeCycle(options, lifecycle)
  // )

  options[APP_LIFE_CYCLE.ON_LAUNCH] = function (
    this: AppInstance,
    options: WechatMiniprogram.App.LaunchShowOption,
  ) {
    setCurrentApp(this)
    // user will return as glboal variable.
    const bindings = setup(options)
    if (bindings) {
      Object.keys(bindings).forEach((key) => (this[key] = bindings[key]))
    }
    unshiftCurrentApp()
  }

  App(options)
}
