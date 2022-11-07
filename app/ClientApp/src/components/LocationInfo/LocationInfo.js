import React, { useState } from 'react'
import {
  Container,
  Table,
  Image,
  Col,
  Button,
  Row,
  OverlayTrigger,
  Popover
} from 'react-bootstrap'
import PropTypes from 'prop-types'
import SocialMediaButtons from 'components/SocialMediaButtons/SocialMediaButtons'

const LocationInfo = ({ location }) => {
  const points = location.points.sort((a, b) => a.points < b.points)
  const [show, setShow] = useState(false)

  const renderPopover = (props) => (
    <Popover id='button-tooltip' {...props}>
      <Popover.Header as='h3'>
        Share with your friends!
      </Popover.Header>
      <Popover.Body>
        <SocialMediaButtons location={location}></SocialMediaButtons>
      </Popover.Body>
    </Popover>
  )
  return (
    <Container fluid>
      <Row>
        <Col xs={10}>{location.address}</Col>{' '}
        <Col xs={2}>
          <OverlayTrigger
            show={show}
            placement='left'
            onClick={() => setShow(!show)}
            overlay={renderPopover}
          >
            <Button
              style={{ float: 'right' }}
              onClick={() => setShow(!show)}
            >
              Share
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>
      <Row>
        <Table striped hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Points</th>
              <th>Nationality</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {points?.map((point, index) => (
              <tr key={index}>
                <td>{point.member.name}</td>
                <td>{point.points}</td>
                <td>
                  <Image
                    alt={point.member.nationality}
                    width={100}
                    height={40}
                    src={point.member.flagUrl}
                  ></Image>
                </td>
                <td>{point.member.team?.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  )
}

LocationInfo.propTypes = {
  location: PropTypes.object
}

export default LocationInfo
