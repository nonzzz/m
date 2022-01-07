import type { AppInstance, AppOptions } from './interface'

const APP_LIFE_CYCLE = {
  ON_LAUNCH: 'onLaunch',
  ON_SHOW: 'onShow',
  ON_HIDE: 'onHide',
  ON_ERROR: 'onError',
  ON_PAGE_NOT_FOUND: 'onPageNotFound',
  ON_UNHANDLED_REJECTION: 'onUnhandledRejection',
  ON_THEME_CHANGE: 'onThemeChange',
}

/**
 * createApp is a superset of weChat App in app.js
 */

export function createApp<T extends WechatMiniprogram.IAnyObject>(
  opt: AppOptions<T>
)
export function createApp(opt: any): void {
  App(opt)
}
