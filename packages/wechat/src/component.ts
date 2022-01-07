/**
 * define wechat component.
 */

export type ComponentContext = WechatMiniprogram.Component.InstanceProperties &
  Omit<
    WechatMiniprogram.Component.InstanceMethods<Record<string, any>>,
    'setData' | 'groupSetData' | 'hasBehavior'
  >

export type ComponentSetup<Props extends Record<string, any>> = (
  props: Readonly<Props>,
  context: ComponentContext
) => void

export function defineComponent(props, setup): void {}
