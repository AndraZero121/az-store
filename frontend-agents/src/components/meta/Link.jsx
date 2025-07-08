import { useNavigate } from "react-router"

export default function Link({ href, linkoption, onClick, children, ...props }) {
  const navigate = useNavigate()
  return <a
    {...props}
    href={href}
    onClick={(e) => {
      e.preventDefault();
      navigate(href, linkoption);
      if(typeof onClick === "function") {
        onClick(e)
      }
    }}
  >{children}</a>
}