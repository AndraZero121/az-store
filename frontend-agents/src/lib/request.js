import axios from "axios"
import authOperation from "../components/content/_AuthOperation"
import { toast } from "sonner"

const baseURL = "http://localhost:8080/api"

async function RequestAPIApp(url, { useAuth = true, showErrorOnToast = true, ...options } = {}) {
  try {
    const basedAxios = axios.create({
      baseURL: baseURL
    })
    const getToken = localStorage.getItem(authOperation.savetokenkey)
    const axiosRequest = await basedAxios.request({
      ...options,
      headers: {
        ...(options.headers),
        Authorization: (!!useAuth && !!getToken && getToken?.length > 1 && typeof getToken === "string")?
        `${authOperation.prefixToken} ${getToken}`:undefined
      },
      url: url
    })
    return {
      ...axiosRequest,
      isJson: String(axiosRequest?.headers["content-type"]||"")?.match("application/json")
    }
  } catch(e) {
    const responses = e.response
    if(responses) {
      return {
        isError: true,
        ...responses,
        isJson: String(responses?.headers["content-type"]||"")?.match("application/json")
      }
    }
    if(showErrorOnToast) {
      toast.error("Upss, kesalahan di sisi client!",{
        description: "Kesalahan ini terjadi pada sisi client karena internet atau logika pada operasinya"
      })
    }
    return {
      isError: true,
      isClient: true,
      message: "Come fron client error, check your console on browser!"
    }
  }
}

export default RequestAPIApp

// function request() {
//   const authorizationToken = localStorage.getItem(authOperation.savetokenkey)
//   return {
//     get: async (pathURL, options = {}) => {
//       return RequestAPIApp(baseURL.replace(/{path}/g, pathURL), { ...options, authToken: authorizationToken, method: "GET" })
//     },
//     post: async (pathURL, options = {}) => {
//       return RequestAPIApp(baseURL.replace(/{path}/g, pathURL), { ...options, authToken: authorizationToken, method: "POST" })
//     },
//     patch: async (pathURL, options = {}) => {
//       return RequestAPIApp(baseURL.replace(/{path}/g, pathURL), { ...options, authToken: authorizationToken, method: "PATCH" })
//     },
//     put: async (pathURL, options = {}) => {
//       return RequestAPIApp(baseURL.replace(/{path}/g, pathURL), { ...options, authToken: authorizationToken, method: "PUT" })
//     },
//     delete: async (pathURL, options = {}) => {
//       return RequestAPIApp(baseURL.replace(/{path}/g, pathURL), { ...options, authToken: authorizationToken, method: "DELETE" })
//     },
//   }
// }

// module.exports = {
//   request: request
// }