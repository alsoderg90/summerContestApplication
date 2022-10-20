import { Modal, Button } from 'react-bootstrap'
import { BsFillTrashFill } from 'react-icons/bs'
import PropTypes from 'prop-types'

export const DeleteButtonWithConfirmation = ({
  show,
  handleClose,
  onClick,
  showModal
}) => {
  return (
    <>
      <Button variant='danger' onClick={showModal}>
        <BsFillTrashFill />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='danger' onClick={onClick}>
            <BsFillTrashFill />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

DeleteButtonWithConfirmation.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  onClick: PropTypes.func,
  showModal: PropTypes.func
}

export const DeleteButton = ({ onClick }) => {
  return (
    <Button variant='danger' onClick={onClick}>
      <BsFillTrashFill />
    </Button>
  )
}

DeleteButton.propTypes = {
  onClick: PropTypes.func
}
