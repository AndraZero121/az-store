import { useNavigate } from "react-router"

export default function Button({ children, className, linkingpath, onClick, ...props }) {
  const navigate = useNavigate()

  return <button className={"active:scale-95 duration-100 min-w-[120px] ba-button-blue "+className} {...props} onClick={(e) => {
    if(!!linkingpath && linkingpath?.length > 0 && typeof linkingpath === "string") {
      navigate(linkingpath)
    }
    if(onClick && typeof onClick === "function") {
      onClick(e)
    }
  }}>
    <div className="ba-button-content">
      {children}
    </div>
  </button>
}