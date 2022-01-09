import path from 'path'
import fs from 'fs'
import ts2 from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const input = 'packages/wechat/src/index.ts'

const output = 'packages/wechat/lib/index.js'

const external = ['@vue/reactivity']

export default {
  input,
  output: {
    file: output,
    format: 'cjs'
  },
  external,
  plugins: [
    nodeResolve(),
    commonjs(),
    ts2({
      tsconfig: 'packages/wechat/tsconfig.json'
    })
  ]
}
