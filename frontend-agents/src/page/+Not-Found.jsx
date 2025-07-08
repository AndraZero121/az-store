import Button from "../components/meta/Button"

export default function NotFound() {
  return <div className="w-full h-screen min-h-[400px] flex items-center justify-center -mt-[50px] px-3">
    <div className="max-w-md flex flex-col justify-center items-center">
      <img
        src="/ba-assets/Maintenance_Plana_Arona.webp"
        alt="Maintenance Plana & Arona"
        width={270}
        className="w-[270px]"
      />
      <h1 className="text-2xl font-bold text-center mt-2">Oh Tidak, Sensei, Halaman Tidak Ada!</h1>
      <p className="text-base text-center mt-2">Saat ini halaman tidak dapat ditemukan, mungkin telah dihapus atau diganti!</p>
      <Button className="mt-2.5" linkingpath="/">
        <span className="px-2 font-semibold">Kembali Ke Beranda</span>
      </Button>
    </div>
  </div>
}