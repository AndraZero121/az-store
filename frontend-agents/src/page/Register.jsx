import Input from "../components/meta/Input"
import Button from "../components/meta/Button"
import GetLocationWithMap from "../components/content/GetLocationWithMap"
import { EyeIcon, EyeOff, MailIcon, Map, PhoneIcon, User2 } from "lucide-react"
import { useRef, useState } from "react"
import Link from "../components/meta/Link"
import * as validate from "../lib/validate"
import HandleingValidateError from "../lib/handle-validate"
import RequestAPIApp from "../lib/request"
import { toast } from "sonner"
import HeadOperation from "../components/content/HeadOperation"

const createRegisterValidate = new validate.Form("register")
createRegisterValidate.append({
  name: validate.string("Nama")
    .require().min(4).max(255),
  email: validate.string("Email")
    .require().isEmail().min(2),
  phone: validate.number("Nomer Telpon")
    .require().min(3),
  address: validate.string("Alamat")
    .require().min(2),
  password: validate.string("Kata Sandi")
    .require().min(8).max(255),
  password_confirmation: validate.string("Kata Sandi")
    .require().min(8).max(255)
})

export default function Register() {
  const [inputuseMap, setinputuseMap] = useState(false)
  const [showToMap, setShowToMap] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [messageErr, setMessageErr] = useState({})
  const addressRef = useRef()

  const inputUseMap = () => {
    setinputuseMap(!inputuseMap)
    if(!inputuseMap === true) {
      setTimeout(() => {
        setShowToMap(!inputuseMap)
      }, 300)
    } else {
      setShowToMap(!inputuseMap)
    }
  }

  async function SubmitForm(e) {
    e.preventDefault()
    const forms = new FormData(e.target)
    const dataForm = Object.fromEntries(forms)
    const structureForm = {
      name: dataForm.name,
      email: dataForm.email,
      phone: Number(dataForm.phone),
      address: dataForm.address,
      password: dataForm.password,
      password_confirmation: dataForm.password_confirmation,
    }
    // Validate Form
    const isvalid = createRegisterValidate.validate(structureForm)
    if(isvalid) {
      const parseErrorValid = HandleingValidateError(isvalid)
      setMessageErr(parseErrorValid.context)
      toast.error("Ada beberapa yang perlu diubah, silahkan cek", {
        description: `Ada sekitar ${Object.keys(parseErrorValid.context).length} yang perlu diperbaiki atau di isi!`
      })
      return;
    }
    // Validate Phone Number List
    const phoneStr = String(structureForm.phone)
    if(!phoneStr.startsWith("62")) {
      toast.error("Nomer telpon harus diawali 62... dan seterusnya")
      return;
    }
    // Validate Password Confrimation
    if(structureForm.password !== structureForm.password_confirmation) {
      toast.error("Kata sandi dengan konfirmasi sandinya salah",{
        description: "Cek kembali untuk konfirmasi kata sandi"
      })
      setMessageErr({
        kata_sandi: "Kata sandi dengan konfirmasi sandinya salah"
      })
      return;
    }
    setMessageErr({})
    // Request To API
    const requestdata = await RequestAPIApp("/auth/register", {
      method: "POST",
      data: {
        ...structureForm,
        phone: phoneStr
      },
      showErrorOnToast: true,
    })
    if(!!requestdata.data?.user) {
      toast.success("Berhasil terdaftar!")
      return; // Success Register
    }
    // Handle Error Client (Automaticly Send By RequestAPIApp)
    if(requestdata.isClient) return;
    // Handle Error Response
    toast.error("Error disisi server!")
  }

  return <>
    <HeadOperation
      title="Az Store - Daftar Akun"
    />
    <div className="w-full h-full min-h-screen flex items-center justify-center px-3 py-[40px]">
      <form className="max-w-md w-full flex flex-col justify-center items-center px-2.5" onSubmit={SubmitForm}>
        <div className="w-full mb-3">
          <h2 className="font-bold text-2xl">Daftar Akun</h2>
          <p className="mt-1.5">Silahkan daftar terlebih dahulu untuk dapat mengaksesnya.</p>
        </div>
        <label className="w-full my-1">
          {!messageErr?.nama? <p className="mb-1 font-semibold">Name</p>
          :<p className="mb-1 font-semibold text-red-500">{`Name (${messageErr.nama})`}</p>}
          <Input
            className="text-left"
            type="text"
            name="name"
            icon={<User2 size={18}/>}
            placeholder="Nama (Shiroko...)"
          />
        </label>
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
          {!messageErr?.nomer_telpon? <p className="mb-1 font-semibold">Nomer Telpon</p>
          :<p className="mb-1 font-semibold text-red-500">{`Nomer Telpon (${messageErr.nomer_telpon})`}</p>}
          <Input
            className="text-left"
            type="number"
            name="phone"
            icon={<PhoneIcon size={18}/>}
            placeholder="Telepon (628....)"
          />
        </label>
        <label className="w-full my-1">
          {!messageErr?.alamat? <p className="mb-1 font-semibold">Alamat</p>
          :<p className="mb-1 font-semibold text-red-500">{`Alamat (${messageErr.alamat})`}</p>}
          <Input
            className="text-left"
            name="address"
            disabled={inputuseMap}
            type="text"
            ref={addressRef}
            icon={<Map size={18}/>}
            placeholder="Alamat (Jl. Pintu Satu Senay...)"
          />
          <p className="my-2 text-[0.86rem] text-neutral-500">{inputuseMap?<>
            Tidak ingin menggunakan peta? <span className="text-blue-500 cursor-pointer" onClick={inputUseMap}>ubah ke input biasa</span>
          </>:<>
            Tidak tau posisi tepatnya? <span className="text-blue-500 cursor-pointer" onClick={inputUseMap}>input menggunakan peta</span>
          </>}</p>
          {inputuseMap&&<p className="text-[0.86rem] text-neutral-500 mb-2">Geser peta ke lokasi anda untuk mendapatkan posisi lokasi pada sebuah peta.</p>}
          <div className="w-full overflow-hidden rounded-md duration-150" style={{ height: inputuseMap?"340px":"0px" }}>
            {showToMap&&<GetLocationWithMap
              onChange={(e) => {
                addressRef.current.value = e?.location||""
              }}
            />}
          </div>
        </label>
        <label className="w-full my-1">
          {!messageErr?.kata_sandi? <p className="mb-1 font-semibold">Kata Sandi</p>
          :<p className="mb-1 font-semibold text-red-500">{`Kata Sandi (${messageErr.kata_sandi})`}</p>}
          <Input
            className="text-left"
            icon={showPassword?<EyeOff size={18}/>:<EyeIcon size={18}/>}
            name="password"
            type={showPassword?"text":"password"}
            placeholder="Kata sandi"
            />
          <Input
            classNameOut="mt-1.5"
            icon={showPassword?<EyeOff size={18}/>:<EyeIcon size={18}/>}
            className="text-left"
            name="password_confirmation"
            type={showPassword?"text":"password"}
            placeholder="Konfrimasi kata sandi"
          />
          <p className="my-2 text-[0.86rem] text-neutral-500 select-none" onClick={() => {
            setShowPassword(!showPassword)
          }}>
            {showPassword?<span className="text-blue-500 cursor-pointer">Jangan perlihatkan kata sandinya</span>
            :<span className="text-blue-500 cursor-pointer">Perlihatkan kata sandinya.</span>}
          </p>
        </label>
        <div className="py-2.5 pt-3.5">
          <p>Sudah punya akun? <Link className="text-blue-500 cursor-pointer" href="/auth/login">Silahkan masuk disini</Link></p>
        </div>
        <Button className="mt-4" type="submit">
          <span className="px-2 font-semibold">Register</span>
        </Button>
      </form>
    </div>
  </>
}