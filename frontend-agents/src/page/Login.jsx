import Input from "../components/meta/Input"
import Button from "../components/meta/Button"
import { EyeIcon, EyeOff, MailIcon } from "lucide-react"
import { useState } from "react"
import Link from "../components/meta/Link"
import * as validate from "../lib/validate"
import HandleingValidateError from "../lib/handle-validate"
import RequestAPIApp from "../lib/request"
import { toast } from "sonner"
import { useAuthorization } from "../components/content/Authentication"
import HeadOperation from "../components/content/HeadOperation"

const createLoginValidate = new validate.Form("register")
createLoginValidate.append({
  email: validate.string("Email")
    .require().isEmail().min(2),
  password: validate.string("Kata Sandi")
    .require().min(8).max(255),
})

export default function Login() {
  const author = useAuthorization()
  const [showPassword, setShowPassword] = useState(false)
  const [messageErr, setMessageErr] = useState({})

  async function SubmitForm(e) {
    e.preventDefault()
    const forms = new FormData(e.target)
    const dataForm = Object.fromEntries(forms)
    const structureForm = {
      email: dataForm.email,
      password: dataForm.password,
    }
    // Validate Form
    const isvalid = createLoginValidate.validate(structureForm)
    if(isvalid) {
      const parseErrorValid = HandleingValidateError(isvalid)
      setMessageErr(parseErrorValid.context)
      toast.error("Ada beberapa yang perlu diubah, silahkan cek", {
        description: `Ada sekitar ${Object.keys(parseErrorValid.context).length} yang perlu diperbaiki atau di isi!`
      })
      return;
    }
    setMessageErr({})
    // Request To API
    const requestdata = await RequestAPIApp("/auth/login", {
      method: "POST",
      data: structureForm,
      showErrorOnToast: true,
    })
    if(!!requestdata.data?.user && !!requestdata.data?.token) {
      author.setAuth(requestdata.data.token, requestdata.data.user)
      return; // Success Login
    }
    // Handle Error Client (Automaticly Send By RequestAPIApp)
    if(requestdata.isClient) return;
    // Handle Error Response
    toast.error("Error disisi server!")
  }
  return <>
    <HeadOperation
      title="Az Store - Masuk"
    />
    <div className="w-full h-full min-h-screen flex items-center justify-center px-3 py-[40px]">
      <form className="max-w-md w-full flex flex-col justify-center items-center px-2.5" onSubmit={SubmitForm}>
        <div className="w-full mb-3">
          <h2 className="font-bold text-2xl">Masuk</h2>
          <p className="mt-1.5">Silahkan masuk dahulu untuk dapat mengaksesnya.</p>
        </div>
        <label className="w-full my-1">
          {!messageErr?.email? <p className="mb-1 font-semibold">Email</p>
          :<p className="mb-1 font-semibold text-red-500">{`Email (${messageErr.email})`}</p>}
          <Input
            className="text-left"
            type="email"
            name="email"
            icon={<MailIcon size={18}/>}
            placeholder="Email (shiroko@gmail.com)"
          />
        </label>
        <label className="w-full my-1">
          {!messageErr?.kata_sandi? <p className="mb-1 font-semibold">Kata Sandi</p>
          :<p className="mb-1 font-semibold text-red-500">{`Kata Sandi (${messageErr.kata_sandi})`}</p>}
          <Input
            className="text-left"
            name="password"
            icon={showPassword?<EyeOff size={18}/>:<EyeIcon size={18}/>}
            type={showPassword?"text":"password"}
            placeholder="Password"
          />
          <p className="my-2 text-[0.86rem] text-neutral-500 select-none" onClick={() => {
            setShowPassword(!showPassword)
          }}>
            {showPassword?<span className="text-blue-500 cursor-pointer">Jangan perlihatkan kata sandinya</span>
            :<span className="text-blue-500 cursor-pointer">Perlihatkan kata sandinya.</span>}
          </p>
        </label>
        <div className="py-2.5 pt-3.5">
          <p>Belum memiliki akun? <Link className="text-blue-500 cursor-pointer" href="/auth/register">Silahkan daftar disini</Link></p>
        </div>
        <Button className="mt-4" type="submit">
          <span className="px-2 font-semibold">Login</span>
        </Button>
      </form>
    </div>
  </>
}