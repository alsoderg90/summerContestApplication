import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BsFillTrashFill } from 'react-icons/bs'
import PropTypes from 'prop-types'

export const DeleteButton = ({ onClick }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  return (
    <>
      <Button variant='danger' onClick={() => setShowDeleteModal(true)}>
        <BsFillTrashFill />
      </Button>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowDeleteModal(false)}>
            Close
          </Button>
          <Button
            variant='danger'
            onClick={() => {
              onClick()
              setShowDeleteModal(false)
            }}
          >
            <BsFillTrashFill />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

DeleteButton.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  onClick: PropTypes.func,
  showModal: PropTypes.func
}
