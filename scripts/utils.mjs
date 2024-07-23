/* eslint-disable node/prefer-global/process */
import { config } from 'dotenv'

config()

export const branch = process.env.ENV || process.env.BRANCH || 'main'
console.log('Branch', branch)

const keys = {
  base_domain: process.env.BASE_DOMAIN,
  supa_anon: process.env.SUPA_ANON,
  supa_url: `${process.env.PORT_TYPE || 'https'}://${process.env.API_URL}`,
  api_domain: `${process.env.API_DOMAIN}/functions/v1`,
}

export function getRightKey(keyname) {
  // console.log('getRightKey', branch, keyname)
  if (!keys || !keys[keyname])
    return ''
  return keys[keyname]
}
export const supa_url = getRightKey('supa_url')
export const supa_anon = getRightKey('supa_anon')
