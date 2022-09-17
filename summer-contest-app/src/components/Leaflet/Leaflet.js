import { useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent
} from 'react-leaflet'
import PropTypes from 'prop-types'
import axios from 'axios'

const LocationMarker = ({ setLocation, location }) => {
  useMapEvent('click', (e) => {
    const { lat, lng } = e.latlng
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      )
      .then((res) => {
        setLocation(res.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  })

  return location === undefined ? null : (
    <Marker position={location}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

const Leaflet = ({ location, setLocation }) => {
  useEffect(() => {
    const L = require('leaflet')

    delete L.Icon.Default.prototype._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    })
  }, [])

  return (
    <MapContainer
      center={[62.24754, 25.712153]}
      zoom={13}
      style={{ height: '50vh' }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      <LocationMarker location={location} setLocation={setLocation} />
    </MapContainer>
  )
}

LocationMarker.propTypes = {
  setLocation: PropTypes.func.isRequired,
  location: PropTypes.object
}

Leaflet.propTypes = {
  setLocation: PropTypes.func.isRequired,
  location: PropTypes.object
}

export default Leaflet
