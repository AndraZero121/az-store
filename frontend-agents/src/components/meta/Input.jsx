import { cn } from "../../lib/utils"

export default function Input({ icon, classNameOut, className, ...other }) {
  return <div className={cn("w-full bg-ba-input-bg text-ba-input-text border border-ba-input-border rounded-sm overflow-hidden flex items-center justify-between", classNameOut)}>
    {icon&&<div className="w-[37px] flex items-center justify-center">
      {icon}
    </div>}
    <input className={cn("text-sm bg-transparent outline-none p-1.5 px-3 text-center",(icon?"w-[calc(100%-37px)] pl-0.5":"w-full"), className)} {...other}/>
  </div>
}