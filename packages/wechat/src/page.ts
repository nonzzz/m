/**
 * define wechat page
 */

import { setCurrentPage, unshiftCurrentPage } from './instance'
import type { PageContext, PageInstance, PageOptions, Query } from './interface'
import { PageLifeCycleOptions, PAGE_LIFE_CYCELE } from './lifecycle'
import { isFn } from './shared'

export function definePage(opt: PageOptions) {
  if (!opt.setup) return
  const { setup } = opt
  const options: PageLifeCycleOptions = {}
  options[PAGE_LIFE_CYCELE.ON_LOAD] = function (
    this: PageInstance,
    query: Query
  ) {
    setCurrentPage(this)
    const context: PageContext = {
      is: this.is,
      route: this.route,
      options: this.options,
      createSelectorQuery: this.createSelectorQuery.bind(this),
      createIntersectionObserver: this.createIntersectionObserver.bind(this),
      selectComponent: this.selectComponent.bind(this),
      selectAllComponents: this.selectAllComponents.bind(this),
      getTabBar: this.getTabBar.bind(this),
      getPageId: this.getPageId.bind(this),
      animate: this.animate.bind(this),
      clearAnimation: this.clearAnimation.bind(this),
      getOpenerEventChannel: this.getOpenerEventChannel.bind(this)
    }
    const bindings = setup(query, context)
    if (bindings) {
      Object.keys(bindings).forEach((key) => {
        const val = bindings[key]
        // if user define a function and return it we should bind it at this fn
        if (isFn(val)) return (this[key] = val)
        this.setData({ [key]: val })
      })
    }
    unshiftCurrentPage()
  }
  Page(options)
}
