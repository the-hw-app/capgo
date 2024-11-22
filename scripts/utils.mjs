/* eslint-disable node/prefer-global/process */
import { env } from 'node:process'
import { config } from 'dotenv'
import keys from '../configs.json'

config()

export const branch = env.ENV || env.BRANCH || 'main'
console.log('Branch', branch)

const keys = {
  base_domain: process.env.BASE_DOMAIN,
  supa_anon: process.env.SUPA_ANON,
  supa_url: `${process.env.PORT_TYPE || 'https'}://${process.env.API_URL}`,
  api_domain: `${process.env.API_URL}/functions/v1`,
}

export function getRightKey(keyname) {
  // console.log('getRightKey', branch, keyname)
  if (!keys || !keys[keyname])
    return ''
  return keys[keyname]
}
export const supa_url = getRightKey('supa_url')
export const supa_anon = getRightKey('supa_anon')
