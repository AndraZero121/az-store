import { BookOpenIcon, BoxesIcon, GlobeLockIcon, HistoryIcon, HomeIcon, MenuIcon, PhoneIcon, User2Icon, X } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "./Link"
import globalPathOrigin from "./global-path"
import { useAuthorization } from "../content/Authentication"
import RequestAPIApp from "../../lib/request"
import { toast } from "sonner"
import CanvasGenerateImagePicture from "../../lib/canvas-generate-img"

const dataNavigateNonLogin = {
  label: "Profile",
  showLabel: false,
  links: [
    {
      icon: <HomeIcon />,
      label: "Beranda",
      text: "Menu utama",
      path: "/"
    },
  ]
}
const dataNavigateWithLogin =  {
  label: "Profile",
  showLabel: false,
  links: [
    {
      icon: <HomeIcon />,
      label: "Beranda",
      text: "Menu utama",
      path: "/"
    },
    {
      icon: <User2Icon />,
      label: "Akun",
      text: "Menu pada akun kamu",
      path: "/account"
    },
    {
      icon: <HistoryIcon />,
      label: "Riwayat",
      text: "Riwayat transaksi & pembayaran",
      path: "/account/transaction-history"
    },
  ]
}
const dataNavigate = [
  ...globalPathOrigin,
  {
    label: "Lainnya",
    links: [
      {
        icon: <PhoneIcon />,
        label: "Bantuan layanan",
        text: "Dukungan untuk bantuan layanan",
        path: "/help-services"
      },
      {
        icon: <GlobeLockIcon />,
        label: "Kebijakan Privasi",
        text: "Perlindungan serta penggunaan data",
        path: "/privacy"
      },
      {
        icon: <BookOpenIcon />,
        label: "Syarat & Ketentuan",
        text: "Aturan penyedia layanan",
        path: "/terms"
      },
    ]
  }
]
const linkedGoback = [
  {
    label: "Lainnya",
    showLabel: false,
    links: [
      {
        icon: <HomeIcon />,
        label: "Beranda",
        text: "Kembali ke menu utama",
        path: "/"
      },
      {
        icon: <User2Icon />,
        label: "Akun",
        text: "Menu pada akun kamu",
        path: "/account"
      },
    ]
  },
]

function Header_LinkProfile({ label, icon, text, path, showCaseBorder = false, closeSection }) {
  return <Link className="w-full h-[70px] flex items-center cursor-pointer" href={path} onClick={closeSection}>
    <div className="w-[75px] h-[75px] flex items-center justify-center">
      {icon}
    </div>
    <div className="w-[calc(100%-75px)] h-[70px] border-neutral-200 py-2.5 pl-2 flex flex-wrap items-center" style={{
      borderTopWidth: showCaseBorder?1:0
    }}>
      <h1 className="font-semibold w-full text-nowrap overflow-hidden text-ellipsis whitespace-nowrap">{label}</h1>
      <p className="text-sm w-full text-neutral-600 dark:text-neutral-400 text-nowrap overflow-hidden text-ellipsis whitespace-nowrap">{text}</p>
    </div>
  </Link>
}

function Header_GroupLink({ label, showLabel = true, links = [], closeSection }) {
  const linkContainList = Array.isArray(links)? links.filter(a => (
    !!a.text && !!a.label && !!a.icon &&
    !!a.path && typeof (a.text && a.label && a.path) === "string")
  ) : []

  return <>
    {showLabel&&<div className="w-full p-2 pt-2.5 px-4.5 text-gray-600">
      <span className="text-sm text-gray-600">{label}</span>
    </div>}
    <div className="bg-white w-full py-1.5 pr-3 pb-2.5 shadow-sm">
      {linkContainList.map((linked, i) => (
        <Header_LinkProfile
          closeSection={closeSection||null}
          key={i}
          label={linked.label}
          icon={linked.icon}
          text={linked.text}
          path={linked.path}
          showCaseBorder={(parseInt(i)!==0)}
        />
      ))}
    </div>
  </>
}

export default function Header() {
  const author = useAuthorization()
  const [isOpen, setIsOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [profileUser, setProfile] = useState({ loading: true, data: {} })
  const topRecommendList = globalPathOrigin.flatMap(a =>
    a.links.filter(l => l.topRecommend)
  ).slice(0, 3)

  async function GetProfileUser() {
    const pictureImg = CanvasGenerateImagePicture(400, 400)
    const request = await RequestAPIApp("/auth/profile", { showErrorOnToast: false })
    if(request.data?.user) {
      setProfile({
        data: {
          profile: request.data.user.profile||pictureImg,
          username: request.data.user.name,
          isLogin: true
        },
        loading: false
      })
      return;      
    }
    if(request.isError) {
      toast.error("Gagal mendapatkan profile pengguna",{
        description: request.isClient? "Kesalahan berasal dari sisi klien/internet klien":"Kesalahan berasal dari sisi server"
      })
    }
    const getLocalUser = author.getUser()
    // Authentikasi Tidak Resmi
    if(!getLocalUser || typeof getLocalUser !== "object" || !getLocalUser?.name) {
      if(!!getLocalUser) {
        author.RemoveAuth() // Remove Auth Corrupted
      }
      setProfile({
        data: {
          isLogin: false
        },
        loading: false
      })
      return;
    }
    setProfile({
      data: {
        profile: getLocalUser.profile||pictureImg,
        username: getLocalUser.name,
        isLogin: true
      },
      loading: false
    })
  }

  function CloseAllMenuSection() {
    if(isOpen) {
      setIsOpen(false)
    }
    if(showMenu) {
      setShowMenu(false)
    }
  }

  function KeyboardDown(e) {
    // ✨ Action downkey "Shift + CTRL + X" to open and close sidebar menu
    if(e.keyCode === 88 && !!e.shiftKey && !!e.ctrlKey) {
      setIsOpen(!isOpen)
    }
  }

  useEffect(() => {
    GetProfileUser()
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", KeyboardDown)
    return () => {
      window.removeEventListener("keydown", KeyboardDown)
    }
  }, [isOpen])

  return <>
    <header className="sticky top-0 left-0 w-full h-[50px] bg-ba-shiroko-palette-medium/80 backdrop-blur-sm flex items-center text-white shadow-md z-50">
      <button className="w-[60px] h-[50px] flex items-center justify-center text-white cursor-pointer" onClick={() => {
        setIsOpen(true)
      }}>
        <MenuIcon />
      </button>
      <div className="w-[calc(100%-60px)] flex items-center justify-between">
        <div className="w-auto">
          <Link href="/">
            <b className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">Az Store</b>
          </Link>
        </div>
        <div className="w-auto px-4.5 flex items-center overflow-hidden">
          {topRecommendList.map((a, i) => (
            <Link href={a.path} className="px-2 py-2.5 flex items-center cursor-pointer max-md:hidden" key={i}>
              <span className="mr-2 scale-85">{a.icon}</span>
              <span className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">{a.label}</span>
            </Link>
          ))}
          <button className="px-2 py-2.5 flex items-center cursor-pointer" onClick={() => { setShowMenu(true) }}>
            <span className="mr-2 scale-85">
              <BoxesIcon />
            </span>
            <span className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">Semua Menu</span>
          </button>
        </div>
      </div>
    </header>
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/25 z-50 duration-300"
      style={{
        opacity: isOpen? "100":"0",
        pointerEvents: isOpen? "auto":"none",
        backdropFilter: isOpen? "blur(2px)":"blur(0px)"
      }}
      onClick={(e) => {
        if(e.target.getAttribute("data-navigation-bg") === "bg-tch") {
          setIsOpen(false)
        }
      }}
      data-navigation-bg="bg-tch"
    ></div>
    <nav
      className="w-full max-w-[410px] h-full fixed top-0 left-0 bg-ba-shiroko-palette-white ba-headers-content-bg z-50 shadow-md duration-300"
      style={{ marginLeft: isOpen? "0px":"-410px" }}
    >
      <div className="ba-headers-title-text-full flex items-center select-none">
        <div className="w-[calc(100%-50px)] pl-[40px] pointer-events-none">
          <h2 className="text-center font-semibold">Menu</h2>
        </div>
        <button
          className="w-[50px] flex items-center justify-center cursor-pointer"
          data-navigation-bg="bg-ch"
          onClick={(e) => {
          if(e.target.getAttribute("data-navigation-bg") === "bg-ch") {
            setIsOpen(false)
          }
        }}>
          <X className="pointer-events-none"/>
        </button>
      </div>
      <div className="w-full h-[calc(100%-47px)] overflow-y-auto">
        {!profileUser.loading?<Link className="w-full h-[80px] flex items-center group cursor-pointer z-50" href="/account" onClick={CloseAllMenuSection}>
          <div className="w-[68px] h-[60px] flex items-center justify-center pl-2">
            <div className="w-[50px] h-[50px] flex items-center rounded-full border border-neutral-200 justify-center overflow-hidden bg-white">
              {!!profileUser?.data?.profile&&<img src={String(profileUser?.data?.profile||"/guest-user.webp")} alt="Foto Profile" loading="lazy"/>}
            </div>
          </div>
          <div className="w-[calc(100%-68px)] px-2.5 pl-3 text-nowrap overflow-hidden text-ellipsis whitespace-nowrap">
            <h1 className="text-base font-semibold mb-1 block w-full text-nowrap overflow-hidden text-ellipsis whitespace-nowrap">{`Hai ${String(profileUser?.data?.username||"tamu!")}`}</h1>
            {!!(profileUser?.data?.isLogin)? <span className="text-sm text-blue-500 group-hover:underline">Buka profile kamu</span>:
            <p className="text-sm overflow-hidden text-ellipsis">Saat ini kamu belum masuk!, <span className="text-blue-500 group-hover:underline">klik untuk masuk menggunakan akun kamu</span></p>}
          </div>
        </Link>:<div className="w-full h-[80px] flex justify-center items-center text-neutral-500 italic">
          <p>Loading...</p>
        </div>}
        {(!!(profileUser?.data?.isLogin)? [dataNavigateWithLogin,...dataNavigate]:[dataNavigateNonLogin,...dataNavigate]).map((groupLink, i) => (
          <Header_GroupLink key={i} links={groupLink.links} label={groupLink.label} showLabel={groupLink.showLabel} closeSection={CloseAllMenuSection}/>
        ))}
        <div className="h-[30px]"></div>
      </div>
    </nav>
    <div
      className="fixed w-full h-full top-0 left-0 duration-150 flex items-center justify-center px-3 py-4.5 bg-black/40 z-50"
      style={{
        opacity: showMenu? "100":"0",
        pointerEvents: showMenu? "auto":"none"
      }}
      data-navigation-bg="bg-ch"
      onClick={(e) => {
        if(e.target.getAttribute("data-navigation-bg") === "bg-ch") {
          setShowMenu(false)
        }
      }}
    >
      <div className="w-full max-w-xl rounded-[0.65rem] overflow-hidden shadow-md duration-150 bg-ba-shiroko-palette-white ba-headers-content-bg" style={{ scale: showMenu? "1":"0.97" }}>
        <div className="ba-headers-title-text flex items-center justify-end">
          <div className="w-full">
            <h2 className="text-center font-semibold">Menu</h2>
          </div>
          <button className="absolute w-[55px] h-[48px] flex items-center justify-center cursor-pointer" onClick={() => { setShowMenu(false) }}>
            <X className="pointer-events-none"/>
          </button>
        </div>
        <div className="w-full max-h-[calc(100vh-190px)] p-2.5 pt-0.5 px-3 overflow-y-auto">
          {([...linkedGoback, ...globalPathOrigin]).map((menucard, i) => (
            <div key={i}>
              <div className="text-sm py-2.5">
                <span className="text-sm text-gray-500">{menucard.label}</span>
              </div>
              <div className="w-full flex flex-wrap bg-white rounded-sm overflow-hidden shadow-sm">
                {menucard.links.map((carditem, i) => (
                  <Link href={carditem.path} key={i} className="w-full p-2 md:w-[calc(100%/2)] flex items-center" onClick={CloseAllMenuSection}>
                    <div className="w-[40px] h-[40px] flex items-center justify-center">
                      <div className="w-[32px] h-[32px] flex items-center justify-center">
                        {carditem.icon}
                      </div>
                    </div>
                    <div className="w-[calc(100%-40px)] pl-2.5">
                      <h2 className="overflow-hidden text-ellipsis whitespace-nowrap">{carditem.label}</h2>
                      <p className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">{carditem.text}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
}