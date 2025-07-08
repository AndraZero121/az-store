import globalPathOrigin from "../components/meta/global-path"
import Link from "../components/meta/Link"
import HeadOperation from "../components/content/HeadOperation"

const slideContents = [
  {
    image: "https://via.placeholder.com/600x260/FF5733/FFFFFF?text=Slide+1",
    title: "Produk Menarik Satu",
    description: "Temukan fitur luar biasa dari produk pertama kami.",
    href: "#product1"
  },
  {
    image: "https://via.placeholder.com/600x260/33FF57/FFFFFF?text=Slide+2",
    title: "Solusi Inovatif Dua",
    description: "Buka kemungkinan baru dengan solusi canggih kami.",
    href: "#product2"
  },
  {
    image: "https://via.placeholder.com/600x260/3357FF/FFFFFF?text=Slide+3",
    title: "Teknologi Masa Depan Tiga",
    description: "Rasakan masa depan hari ini dengan teknologi mutakhir kami.",
    href: "#product3"
  },
]

export default function Homepage() {
  return <>
    <HeadOperation
      title="Az Store - Web Agent Yang Terpercaya!"
    />
    <div className="w-full max-w-3xl m-auto">
      <div className="w-full p-2 px-3.5">
        {globalPathOrigin.map((linked, i) => (
          <div className="w-full" key={`type-${i}`}>
            <div className="w-full py-1.5">
              <span className="text-sm text-neutral-600">{`${linked.label}`}</span>
            </div>
            <div className="w-full flex flex-wrap">
              {linked.links.map((items, z) => (
                <Link className="w-full md:w-[calc(100%/2)] flex items-center cursor-pointer group" key={`items-${z}`} href={items.path}>
                  <div className="w-[56px] h-[76px] flex items-center justify-center pr-2.5">
                    <div className="w-[45px] h-[45px] flex items-center justify-center rounded-xl group-hover:rotate-2 group-hover:scale-105 duration-100" style={{ background: items.bgColor, color: items.fnColor }}>
                      <span className="scale-95 group-hover:rotate-6 group-hover:scale-100">{items.icon}</span>
                    </div>
                  </div>
                  <div className="w-[calc(100%-56px)] pl-2.5">
                    <h2 className="text-base font-semibold">{items.label}</h2>
                    <p className="text-sm text-gray-500">{items.text}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
}