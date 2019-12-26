import axios from 'axios'
import { Config } from 'App/Config'

var CryptoJS = require('crypto-js')

function getReqHeaders(body) {
  const currentTime = JSON.stringify(new Date().getTime())
  var wordArray = CryptoJS.enc.Utf8.parse(JSON.stringify(body))
  var bodymd5 = CryptoJS.enc.Base64.stringify(wordArray)
  var hmac = CryptoJS.enc.Base64.stringify(
    CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, 'secret-x123')
      .update(JSON.stringify(body))
      .update(currentTime)
      .finalize()
  )
  const options = {
    headers: { Authorization: hmac, 'X-date': currentTime },
  }
  console.log(currentTime)
  return { body: bodymd5, headers: options }
}

const userApiClient = axios.create({
  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'hmac',
    'X-date': 'date',
  },
  timeout: 3000,
})

function fetchUser() {
  return userApiClient.get('testnative.php').then((response) => {
    return response.data
  })
}

function loginUser(body) {
  const processedData = getReqHeaders({ ...body, deviceID: 'xyz' })

  return userApiClient
    .post('login.php', processedData.body, processedData.headers)
    .then((response) => {
      if (response.data.success) {
        return response.data
      }
      console.log('going to throw', response.data, ' and body was', body)
      throw new Error('User doesnt exist')
    })
}

export const userService = {
  fetchUser,
  loginUser,
}
