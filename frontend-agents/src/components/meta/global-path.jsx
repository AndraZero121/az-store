import { BusIcon, ChartAreaIcon, CreditCardIcon, MapPinIcon, PercentIcon, ReceiptIcon, WalletIcon } from "lucide-react"

const globalPathOrigin = [
  {
    label: "Tiket Bus",
    links: [
      {
        icon: <BusIcon />,
        label: "Pemesanan Tiket",
        text: "Pesan tiket bus mudah dan cepat",
        path: "/bus/booking",
        topRecommend: true,
      },
      {
        icon: <MapPinIcon />,
        label: "Master Kota",
        text: "Pengaturan data kota",
        path: "/bus/master-city",
      },
      {
        icon: <PercentIcon />,
        label: "Voucher",
        text: "Manajemen voucher tiket bus",
        path: "/bus/voucher",
      },
      {
        icon: <ChartAreaIcon />,
        label: "Laporan Tiket Bus",
        text: "Laporan transaksi tiket bus",
        path: "/bus/report",
      },
      {
        icon: <ReceiptIcon />,
        label: "Struk",
        text: "Daftar struk tiket bus",
        path: "/bus/receipt",
      },
    ],
  },
  {
    label: "Topup E-Wallet",
    links: [
      {
        icon: <WalletIcon />,
        label: "Topup",
        text: "Isi ulang saldo E-Wallet",
        path: "/e-wallet/topup",
        topRecommend: true,
      },
      {
        icon: <CreditCardIcon />,
        label: "Master E-Wallet",
        text: "Pengaturan data E-Wallet",
        path: "/e-wallet/master",
        topRecommend: true,
      },
      {
        icon: <PercentIcon />,
        label: "Voucher",
        text: "Manajemen voucher E-Wallet",
        path: "/e-wallet/voucher",
      },
      {
        icon: <ChartAreaIcon />,
        label: "Laporan Topup E-Wallet",
        text: "Laporan transaksi topup E-Wallet",
        path: "/e-wallet/report",
      },
      {
        icon: <ReceiptIcon />,
        label: "Struk",
        text: "Daftar struk topup E-Wallet",
        path: "/e-wallet/receipt",
      },
    ],
  }
]
export default globalPathOrigin