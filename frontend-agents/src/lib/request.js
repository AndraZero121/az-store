import axios from "axios"

const baseURL = "http://localhost:5515/api{path}"

async function RequestAPIApp(url, { authToken, ...options } = {}) {
  try {
    const axiosRequest = axios.request({
      ...options,
      headers: {
        ...(options.headers),
        Authorization: (!!authToken && authToken?.length > 1 && typeof authToken === "string")? `Bera ${authToken}`:undefined
      },
      url: new URL(String(url).trim()).href
    })
    return axiosRequest
  } catch(e) {
    const responses = e.response
    if(responses) {
      return {
        isError: true,
        ...responses
      }
    }
    return {
      isError: true,
      isClient: true,
      message: "Come fron client error, check your console on browser!"
    }
  }
}

async function request() {
  const authorizationToken = localStorage.getItem("auth")
  return {
    get: async (pathURL, options = {}) => {
      return RequestAPIApp(baseURL.replace(/{path}/g, pathURL), { ...options, authToken: authorizationToken, method: "GET" })
    },
    post: async (pathURL, options = {}) => {
      return RequestAPIApp(baseURL.replace(/{path}/g, pathURL), { ...options, authToken: authorizationToken, method: "POST" })
    },
    patch: async (pathURL, options = {}) => {
      return RequestAPIApp(baseURL.replace(/{path}/g, pathURL), { ...options, authToken: authorizationToken, method: "PATCH" })
    },
    put: async (pathURL, options = {}) => {
      return RequestAPIApp(baseURL.replace(/{path}/g, pathURL), { ...options, authToken: authorizationToken, method: "PUT" })
    },
    delete: async (pathURL, options = {}) => {
      return RequestAPIApp(baseURL.replace(/{path}/g, pathURL), { ...options, authToken: authorizationToken, method: "DELETE" })
    },
  }
}

module.exports = {
  request: request
}