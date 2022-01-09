/**
 * wechat shared and lifecycle.
 *
 * In vue3 we don't need Mixins. so we don't plan to support
 * mixins(API behaviors) in native wechat application.
 *
 *
 */

import { currentApp } from './instance'
import {
  AppInstance,
  ComponentInstance,
  PageInstance,
  RecordPartial,
  ValueOf
} from './interface'
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

