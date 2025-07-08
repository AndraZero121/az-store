import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"

function MapEventsHandler({ onMoveEnd }) {
  useMapEvents({
    moveend: (event) => {
      onMoveEnd(event.target.getCenter())
    },
  })
  return null
}

export default function GetLocationWithMap({ defaultCenter, onChange }) {
  const [center, setCenter] = useState({
    lat: defaultCenter?.lat || -6.304378,
    lng: defaultCenter?.lng || 106.8090
  })
  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const request = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      const dataRes = request.data

      if(dataRes && dataRes.display_name) {
        if(typeof onChange === 'function') {
          onChange({
            location: dataRes.display_name,
            type: dataRes.type,
            rank: dataRes.place_rank,
            name: dataRes.name,
            box: dataRes.boundingbox
          })
        }
      } else {
        if(typeof onChange === 'function') {
          onChange(null)
        }
        toast.error("Alamat tidak ditemukan", {
          description: "Coba pindah kedaratan yang memiliki lokasi"
        })
      }
    } catch(error) {
      console.log(error)
      const response = error.response
      toast.error("Permintaan Gagal", {
        description: !!response? "Kesalahan pada permintaan":"Kesalahan pada sisi klien"
      })
    }
  }

  const handleMapMoveEnd = (newCenter) => {
    setCenter(newCenter)
    getAddressFromCoordinates(newCenter.lat, newCenter.lng)
  }

  return <MapContainer
    center={center}
    zoom={13}
    scrollWheelZoom={true}
    style={{ width: "100%", height: "100%" }}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={center}></Marker>
    <MapEventsHandler onMoveEnd={handleMapMoveEnd} />
  </MapContainer>
}