import type { AppInstance, AppOptions } from './interface'
import { APP_LIFE_CYCLE, createAppLifeCycle } from './lifecycle'
import type { AppLifeCycleOptions } from './lifecycle'
import { setCurrentApp, unshiftCurrentApp } from './instance'

export function createApp<T extends WechatMiniprogram.IAnyObject>(
  opt: AppOptions<T>
): void {
  if (!opt.setup) return
  const { setup } = opt
  const options: AppLifeCycleOptions = {}

  options[APP_LIFE_CYCLE.ON_LAUNCH] = function (
    this: AppInstance,
    options: WechatMiniprogram.App.LaunchShowOption
  ) {
    setCurrentApp(this)
    // when user retrun data variable wil binding as globaldata.
    const bindings = setup(options)
    if (bindings) {
      Object.keys(bindings).forEach((key) => (this[key] = bindings[key]))
    }
    unshiftCurrentApp()
  }

  Object.keys(APP_LIFE_CYCLE).forEach((lifecycle) => {
    if (lifecycle === 'ON_LAUNCH') return
    options[APP_LIFE_CYCLE[lifecycle]] = createAppLifeCycle(
      APP_LIFE_CYCLE[lifecycle]
    )
  })

  App(options)
}
