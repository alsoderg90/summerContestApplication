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
import L from 'leaflet'
import { useDispatch, useSelector } from 'react-redux'
import {
  getLocations,
  setNewLocation,
  setSelectedLocation
} from 'redux/modules/locations/actions'
import {
  selectLocations,
  selectNewLocation
} from 'redux/modules/locations/selectors'
import marker from 'assets/marker-icon-2x-green.png'
import markerShadow from 'assets/marker-shadow.png'

const greenIcon = L.icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const LocationMarker = ({ newLocation }) => {
  const dispatch = useDispatch()

  const handleClick = (data) => {
    dispatch(setNewLocation(data))
  }

  useMapEvent('click', (e) => {
    const { lat, lng } = e.latlng
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      )
      .then((res) => {
        handleClick(res.data)
        //setActiveTab('info')
      })
      .catch((err) => {
        console.log(err.message)
      })
  })

  return newLocation === undefined ? null : (
    <Marker icon={greenIcon} position={newLocation}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

const Leaflet = ({ setActiveTab }) => {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    })
  }, [])

  const dispatch = useDispatch()
  const locations = useSelector((state) => selectLocations(state))
  const newLocation = useSelector((state) => selectNewLocation(state))

  useEffect(() => {
    if (!locations) dispatch(getLocations())
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
                dispatch(setSelectedLocation(location))
              }
            }}
          >
            <Popup>{`${location.address} <br> ${location.name}`}</Popup>
          </Marker>
        )
      })}

      <LocationMarker newLocation={newLocation} setActiveTab={setActiveTab} />
    </MapContainer>
  )
}

LocationMarker.propTypes = {
  newLocation: PropTypes.object,
  setActiveTab: PropTypes.func
}

Leaflet.propTypes = {
  setActiveTab: PropTypes.func
}

export default Leaflet
