import { Container, Table, Col, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

const LocationInfo = ({ location }) => {
  const points = location.points.sort((a, b) => a.points < b.points)
  return (
    <Container>
      {location.address}
      <Table striped hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Points</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {points?.map((point, index) => (
            <tr key={index}>
              <td>{point.member.name}</td>
              <td>{point.points}</td>
              <td>{point.member.team?.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

LocationInfo.propTypes = {
  location: PropTypes.object
}

export default LocationInfo
