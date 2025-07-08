import { useAuthorization } from "../components/content/Authentication"
import HeadOperation from "../components/content/HeadOperation"
import RequestAPIApp from "../lib/request"
import CanvasGenerateImagePicture from "../lib/canvas-generate-img"
import { useEffect, useState } from "react"

export default function ProfileUser() {
  const author = useAuthorization()
  const [getProfile, setProfile] = useState({
    data: {}, loading: true
  })

  async function GetProfileUser() {
    const pictureImg = CanvasGenerateImagePicture(400, 400)
    const request = await RequestAPIApp("/auth/profile", { showErrorOnToast: false })
    let profileUser = {}
    if(request.data?.user) {
      profileUser = request.data.user
    } else {
      const getLocalUser = author.getUser()
      profileUser = getLocalUser
    }
    setProfile({
      data: {
        profile: profileUser.profile||pictureImg,
        username: profileUser.name,
        phone: profileUser.phone,
        address: profileUser.address,
        agent_code: profileUser.agent_code,
        balance: profileUser.balance,
        status: profileUser.status,
        last_transaction: profileUser.last_transaction // Belum Tau Bakal Di Isi Apa
      },
      loading: false
    })
  }

  useEffect(() => {
    GetProfileUser()
  }, [])

  return <>
    <HeadOperation
      title="Az Store - Profile Akun"
    />
    <div className="w-full p-3.5">
      <h2 className="text-2xl font-bold mb-4.5">Profile</h2>
      <div className="w-full border border-gray-200 rounded-md mt-1.5 mb-0.5 p-2.5 flex items-center shadow-xs">
        <div className="w-[70px] h-[70px] rounded-full overflow-hidden flex justify-center items-center">
          {getProfile.data?.profile&&<img src={getProfile.data.profile} className="w-full h-full object-cover" loading="lazy"/>}
        </div>
        <div className="w-[calc(100%-70px)] px-2.5 overflow-ellipsis overflow-hidden">
          <b className="text-xl text-nowrap overflow-ellipsis overflow-hidden">{getProfile.data?.username? getProfile.data?.username:"Loading..."}</b>
          <p className="text-nowrap overflow-ellipsis overflow-hidden">{getProfile.data?.address? getProfile.data?.address:"Loading..."}</p>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <div className="w-[calc(calc(100%/2)_-_5px)] border border-gray-200 rounded-md my-2.5 p-2.5 px-3.5 shadow-xs">
          <h3 className="text-md font-semibold">Saldo</h3>
          <p className="text-sm mt-1 text-neutral-600 text-nowrap overflow-ellipsis overflow-hidden">{getProfile.data?.balance? getProfile.data?.balance:"Loading..."}</p>
        </div>
        <div className="w-[calc(calc(100%/2)_-_5px)] border border-gray-200 rounded-md my-2.5 p-2.5 px-3.5 shadow-xs">
          <h3 className="text-md font-semibold">Kode Agen</h3>
          <p className="text-sm mt-1 text-neutral-600 text-nowrap overflow-ellipsis overflow-hidden">{getProfile.data?.agent_code? getProfile.data?.agent_code:"Loading..."}</p>
        </div>
      </div>
      {/* <pre style={{ fontSize: "0.5rem" }}>{JSON.stringify(getProfile,null,2)}</pre> */}
    </div>
  </>
}