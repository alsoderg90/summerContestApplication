import { useState, useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent
} from 'react-leaflet'
import PropTypes from 'prop-types'
import axios from 'axios'
import L from 'leaflet'
import marker from '../../assets/marker-icon-2x-green.png'
import markerShadow from '../../assets/marker-shadow.png'
import checkpointsService from '../../api/checkpoints'

const greenIcon = L.icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const LocationMarker = ({ setLocation, location, setActiveTab }) => {
  useMapEvent('click', (e) => {
    const { lat, lng } = e.latlng
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      )
      .then((res) => {
        setLocation(res.data)
        setActiveTab('location')
      })
      .catch((err) => {
        console.log(err.message)
      })
  })

  return location === undefined ? null : (
    <Marker icon={greenIcon} position={location}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

const Leaflet = ({ location, setLocation, setActiveTab }) => {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    })
  }, [])

  const [locations, setLocations] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const res = await checkpointsService.getAll()
      setLocations(res.data)
    }
    fetchData().catch(console.error)
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
      {locations?.map((location, index) => {
        const position = [location.lat, location.lon]
        return (
          <Marker
            key={index}
            position={position}
            eventHandlers={{
              click: (e) => {
                setLocation(location)
                setActiveTab('info')
              }
            }}
          >
            <Popup>{`${location.address} <br> ${location.name}`}</Popup>
          </Marker>
        )
      })}

      <LocationMarker
        location={location}
        setLocation={setLocation}
        setActiveTab={setActiveTab}
      />
    </MapContainer>
  )
}

LocationMarker.propTypes = {
  setLocation: PropTypes.func.isRequired,
  location: PropTypes.object,
  setActiveTab: PropTypes.func
}

Leaflet.propTypes = {
  setLocation: PropTypes.func.isRequired,
  location: PropTypes.object,
  setActiveTab: PropTypes.func
}

export default Leaflet
