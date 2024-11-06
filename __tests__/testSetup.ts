// add all jest-extended matchers
import * as matchers from 'jest-extended'
import { setConfig } from 'next/config'
import config from '../next.config.mjs'

expect.extend(matchers)

setConfig(config)
