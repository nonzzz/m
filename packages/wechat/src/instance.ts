import type { AppInstance, ComponentInstance, PageInstance } from './interface'

/**
 * in wechat mini program. will initilize app and page instance. so we should set it
 * as null.
 */

export let currentApp: AppInstance | null = null

export let currentPage: PageInstance | null = null

export let currentComponent: ComponentInstance | null = null

export function getCurrentInstance(): PageInstance | ComponentInstance | null {
  return currentPage || currentComponent
}


