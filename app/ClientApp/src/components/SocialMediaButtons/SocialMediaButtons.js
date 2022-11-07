import {
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share'
import { Col, Container, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { SocialIcon } from 'react-social-icons'
const SocialMediaButtons = ({ location }) => {
  console.log({ location })
  const message = location?.points?.map((point) => {
    return `${point.member.name}: ${point.points} points\n`
  })
  return (
    <Container>
      <Row>
        <Col>
          <TelegramShareButton
            url='www.google.fi'
            title={`${location.address}\n ${message}`}
          >
            <SocialIcon network='telegram'></SocialIcon>
          </TelegramShareButton>{' '}
          <TwitterShareButton
            url='www.google.fi'
            title={`${location.address}\n ${message}`}
          >
            <SocialIcon network='twitter'></SocialIcon>
          </TwitterShareButton>{' '}
          <WhatsappShareButton
            title={`${location.address}\n ${message}`}
            url='www.google.fi'
          >
            <SocialIcon network='whatsapp'></SocialIcon>
          </WhatsappShareButton>
        </Col>
      </Row>
    </Container>
  )
}

export default SocialMediaButtons

SocialMediaButtons.propTypes = {
  location: PropTypes.object
}
