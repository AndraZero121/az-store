import { BusIcon, ChartAreaIcon, CreditCardIcon, MapPinIcon, PercentIcon, ReceiptIcon, WalletIcon } from "lucide-react"

const globalPathOrigin = [
  {
    label: "Menu Tiket Bus",
    links: [
      {
        icon: <BusIcon />,
        label: "Pemesanan Tiket",
        text: "Pesan tiket bus mudah dan cepat",
        path: "/bus/booking",
        topRecommend: true,
        bgColor: "#892eff",
        fnColor: "white",
      },
      {
        icon: <MapPinIcon />,
        label: "Master Kota",
        text: "Pengaturan data kota",
        path: "/bus/master-city",
        bgColor: "#45a8ff",
        fnColor: "white",
      },
      {
        icon: <PercentIcon />,
        label: "Voucher",
        text: "Manajemen voucher tiket bus",
        path: "/bus/voucher",
        bgColor: "#2e69ff",
        fnColor: "white",
      },
      {
        icon: <ChartAreaIcon />,
        label: "Laporan Tiket Bus",
        text: "Laporan transaksi tiket bus",
        path: "/bus/report",
        bgColor: "#24cbd1",
        fnColor: "white",
      },
      {
        icon: <ReceiptIcon />,
        label: "Struk",
        text: "Daftar struk tiket bus",
        path: "/bus/receipt",
        bgColor: "#ff962e",
        fnColor: "white",
      },
    ],
  },
  {
    label: "Menu Topup E-Wallet",
    links: [
      {
        icon: <WalletIcon />,
        label: "Topup",
        text: "Isi ulang saldo E-Wallet",
        path: "/e-wallet/topup",
        topRecommend: true,
        bgColor: "#419600",
        fnColor: "white",
      },
      {
        icon: <CreditCardIcon />,
        label: "Master E-Wallet",
        text: "Pengaturan data E-Wallet",
        path: "/e-wallet/master",
        topRecommend: true,
        bgColor: "#ee00ff",
        fnColor: "white",
      },
      {
        icon: <PercentIcon />,
        label: "Voucher",
        text: "Manajemen voucher E-Wallet",
        path: "/e-wallet/voucher",
        bgColor: "#2e69ff",
        fnColor: "white",
      },
      {
        icon: <ChartAreaIcon />,
        label: "Laporan Topup E-Wallet",
        text: "Laporan transaksi topup E-Wallet",
        path: "/e-wallet/report",
        bgColor: "#24cbd1",
        fnColor: "white",
      },
      {
        icon: <ReceiptIcon />,
        label: "Struk",
        text: "Daftar struk topup E-Wallet",
        path: "/e-wallet/receipt",
        bgColor: "#ff962e",
        fnColor: "white",
      },
    ],
  }
]
export default globalPathOrigin