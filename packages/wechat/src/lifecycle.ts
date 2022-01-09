/**
 * wechat shared and lifecycle.
 *
 * In vue3 we don't need Mixins. so we don't plan to support
 * mixins(API behaviors) in native wechat application.
 *
 *
 */

import { currentApp, getCurrentInstance } from './instance'
import type { AppInstance, ComponentInstance, PageInstance, RecordPartial, ValueOf } from './interface'
import { bindHideField } from './shared'

/**
 * wechat Page description docs, details see:
 * https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onLoad-Object-query
 *
 */

export const APP_LIFE_CYCLE = {
  ON_LAUNCH: 'onLaunch',
  ON_SHOW: 'onShow',
  ON_HIDE: 'onHide',
  ON_ERROR: 'onError',
  ON_PAGE_NOT_FOUND: 'onPageNotFound',
  ON_UNHANDLED_REJECTION: 'onUnhandledRejection',
  ON_THEME_CHANGE: 'onThemeChange'
} as const

export const PAGE_LIFE_CYCELE = {
  ON_LOAD: 'onLoad',
  ON_SHOW: 'onShow',
  ON_READY: 'onReady',
  ON_HIDE: 'onHide',
  ON_UNLOAD: 'onUnload',
  ON_PULL_DOWN_REFRESH: 'onPullDownRefresh',
  ON_REACH_BOTTOM: 'onReachBottom',
  ON_PAGE_SCROLL: 'onPageScroll',
  ON_SHARE_APP_MESSAGE: 'onShareAppMessage',
  ON_SHARE_TIMELINE: 'onShareTimeline',
  ON_ADD_TO_FAVORITES: 'onAddToFavorites',
  ON_RESIZE: 'onResize',
  ON_TAB_ITEM_TAP: 'onTabItemTap'
} as const

export type AppLifeCycle = ValueOf<typeof APP_LIFE_CYCLE>

export type AppLifeCycleOptions = RecordPartial<AppLifeCycle, any>

export type PageLifeCycle = ValueOf<typeof PAGE_LIFE_CYCELE>

export type PageLifeCycleOptions = RecordPartial<PageLifeCycle, any>

export function injectHook(
  currentInstance: AppInstance | PageInstance | ComponentInstance,
  lifecycle: AppLifeCycle | PageLifeCycle,
  // eslint-disable-next-line @typescript-eslint/ban-types
  hook: Function
): void {
  const hideFiled = bindHideField(lifecycle)
  if (!currentInstance[hideFiled]) {
    currentInstance[hideFiled] = []
  }
  currentInstance[hideFiled].push(hook)
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function creteAppHook<T extends Function = () => unknown>(lifecycle: AppLifeCycle) {
  return (hook: T): void => {
    if (currentApp) {
      injectHook(currentApp, lifecycle, hook)
    }
  }
}

export function createAppLifeCycle(lifecycle: AppLifeCycle) {
  return function (this: AppInstance, ...args: any[]) {
    const hooks = this[bindHideField(lifecycle)]
    if (hooks) {
      hooks.forEach((hook) => hook(...args))
    }
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function createPageHook<T extends Function = () => unknown>(lifeCycle: PageLifeCycle) {
  return (hook: T): void => {
    const currentInstance = getCurrentInstance()
    if (currentInstance) {
      injectHook(currentInstance, lifeCycle, hook)
    }
  }
}

/**
 * we decide support those hook. in high version,
 * user can use wx.themeChange to do.
 */

export const onAppShow = creteAppHook(APP_LIFE_CYCLE.ON_SHOW)

export const onAppHide = creteAppHook(APP_LIFE_CYCLE.ON_HIDE)

export const onAppError = creteAppHook(APP_LIFE_CYCLE.ON_ERROR)

/**
 * pageHook
 */

export const onShow = createPageHook(PAGE_LIFE_CYCELE.ON_SHOW)

export const onReady = createPageHook(PAGE_LIFE_CYCELE.ON_READY)

export const onHide = createPageHook(PAGE_LIFE_CYCELE.ON_HIDE)

export const onUnload = createPageHook(PAGE_LIFE_CYCELE.ON_UNLOAD)

export const onPullDownRefresh = createPageHook(PAGE_LIFE_CYCELE.ON_PULL_DOWN_REFRESH)

export const onReachBottom = createPageHook(PAGE_LIFE_CYCELE.ON_REACH_BOTTOM)

export const onShareAppMessage = createPageHook(PAGE_LIFE_CYCELE.ON_SHARE_APP_MESSAGE)

export const onShareTimeline = createPageHook(PAGE_LIFE_CYCELE.ON_SHARE_TIMELINE)

export const onAddToFavorites = createPageHook(PAGE_LIFE_CYCELE.ON_ADD_TO_FAVORITES)

export const onPageScroll = createPageHook(PAGE_LIFE_CYCELE.ON_PAGE_SCROLL)

export const onResize = createPageHook(PAGE_LIFE_CYCELE.ON_RESIZE)

export const onTabItemTap = createPageHook(PAGE_LIFE_CYCELE.ON_TAB_ITEM_TAP)
