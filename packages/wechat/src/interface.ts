import type { EffectScope } from '@vue/reactivity'

export type Bindings = Record<string, any> | void

export type Query = Record<string, string | undefined>

export type AppInstance = Record<string, any>

export type AppSetup = (
  this: void,
  options: WechatMiniprogram.App.LaunchShowOption
) => Bindings

export type PageContext = WechatMiniprogram.Page.InstanceProperties &
  Omit<
    WechatMiniprogram.Page.InstanceMethods<Record<string, any>>,
    | 'setData'
    | 'groupSetData'
    | 'hasBehavior'
    | 'triggerEvent'
    | 'selectOwnerComponent'
    | 'getRelationNodes'
  >

export type PageSetup = (
  this: void,
  query: Query,
  context: PageContext
) => Bindings

export type PageOptions = {
  setup?: PageSetup
}

export type ComponentInstance = WechatMiniprogram.Component.InstanceProperties &
  WechatMiniprogram.Component.InstanceMethods<Record<string, unknown>> & {
    [prop: string]: any
    __scope__: EffectScope
    __props__: undefined | Record<string, any>
  }

export type PageInstance = WechatMiniprogram.Page.InstanceProperties &
  WechatMiniprogram.Page.InstanceMethods<Record<string, unknown>> & {
    [prop: string]: any
    __scope__: EffectScope
  }

export type AppOptions<T extends WechatMiniprogram.IAnyObject> = {
  setup?: AppSetup
} & WechatMiniprogram.App.Options<T>

export type Options = Record<string, any>

export type ValueOf<T> = T[keyof T]

export type RecordPartial<T extends keyof any, K> = {
  [P in T]?: K
}
