import { Outlet } from "react-router"
import { HistoryIcon, KeySquare, PenIcon, User2Icon, X } from "lucide-react"
import { Toaster } from "sonner"
import Link from "../../components/meta/Link"

const listLinkAccount = [
  {
    category: "Menu",
    list: [
      {
        icon: <User2Icon />,
        label: "Profil",
        path: "/account"
      },
      {
        icon: <HistoryIcon />,
        label: "Riwayat",
        path: "/account/transaction-history"
      },
    ]
  },
  {
    category: "Perubahan - Danger Zone",
    redZone: true,
    list: [
      {
        icon: <PenIcon />,
        label: "Ubah Profil",
        path: "/account/update-profile"
      },
      {
        icon: <KeySquare />,
        label: "Ubah Kata Sandi",
        path: "/account/change-password"
      },
    ]
  },
]

export default function AccountSidebar({ children }) {
  return <div className="w-full max-w-3xl flex flex-wrap m-auto">
    <nav className="w-full top-[50px] sm:fixed sm:w-[250px] my-1.5 select-none bg-white">
      {listLinkAccount.map((category, i) => (
        <div key={i} className="w-full px-4.5">
          <div className="my-2.5">
            <p className={"text-[0.89rem] "+(category.redZone?"text-red-500":"text-neutral-500")}>{category.category}</p>
          </div>
          <div className="w-full">
            {category.list.map((items, c) => (
              <Link href={items.path} className="w-full flex items-center my-1.5" key={c}>
                <div className="w-[38px] h-[38px] flex items-center justify-start">
                  <span>{items.icon}</span>
                </div>
                <div className="w-[calc(100%-38px)]">
                  <p className="font-normal">{items.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
    <div className="w-full sm:pl-[300px]">
      {children? children:<Outlet />}
    </div>
  </div>
}