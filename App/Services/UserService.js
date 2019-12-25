import axios from 'axios'
import { Config } from 'App/Config'
import { is, curryN, gte } from 'ramda'

var CryptoJS = require("crypto-js");
const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number)
  return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
})
const in200s = isWithin(200, 299)

/**
 * This is an example of a service that connects to a 3rd party API.
 *
 * Feel free to remove this example from your application.
 * 
 * 


 */

function getReqHeaders(body) {
const currentTime=JSON.stringify(new Date().getTime());
var wordArray = CryptoJS.enc.Utf8.parse(JSON.stringify(body));
var bodymd5 = CryptoJS.enc.Base64.stringify(wordArray);
var hmac = CryptoJS.enc.Base64.stringify(CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, "secret-x123").update(JSON.stringify(body)).update(currentTime).finalize()) ;
const options = {
  headers: {'Authorization':hmac, 'X-date':currentTime}
};
console.log(currentTime);
return {body:bodymd5,headers:options}

}

const userApiClient = axios.create({

  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'hmac',
    'X-date': 'date'
  },
  timeout: 3000,
})




function fetchUser() {


 return userApiClient.get('testnative.php').then((response) => {
    // if (in200s(response.status)) {
    //   return response.data
    // }
    return response.data
  })
}


function loginUser(body) {
  
  const processedData=getReqHeaders({...body,deviceID:'xyz'});

  return userApiClient.post('login.php',processedData.body,processedData.headers).then((response) => {
     if (response.data.success) {
       return response.data
     }
     console.log("going to throw");
     throw "User doesnt exist";

   })
 }


export const userService = {
  fetchUser,
  loginUser
}
