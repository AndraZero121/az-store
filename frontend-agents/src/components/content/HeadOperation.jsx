import { useEffect } from "react"

function CreateElementToHead(name) {
  const h = document.createElement(name)
  document.querySelector("head").append(h)
  return h
}

export default function HeadOperation({ title = "", description = "", keywords = "", author = "" } = {}) {
  useEffect(() => {
    if(!!title) {
      let elm = document.querySelector("head title")
      if(!elm) {
        elm = CreateElementToHead("title")
      }
      elm.innerText = String(title||"")
    }
    if(!!description) {
      let elm = document.querySelector("meta[name=\"description\"]")
      if(!elm) {
        elm = CreateElementToHead("meta")
        elm.setAttribute("name", "description")
      }
      elm.innerText = String(description||"")
    }
    if(!!keywords) {
      let elm = document.querySelector("meta[name=\"keywords\"]")
      if(!elm) {
        elm = CreateElementToHead("meta")
        elm.setAttribute("name", "keywords")
      }
      elm.innerText = String(keywords||"")
    }
    if(!!author) {
      let elm = document.querySelector("meta[name=\"author\"]")
      if(!elm) {
        elm = CreateElementToHead("meta")
        elm.setAttribute("name", "author")
      }
      elm.innerText = String(author||"")
    }
  }, [])
  return <></>
}