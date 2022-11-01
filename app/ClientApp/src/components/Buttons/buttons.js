import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BsFillTrashFill } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { BiRefresh } from 'react-icons/bi'
import PropTypes from 'prop-types'

export const DeleteButton = ({ onClick, ...rest }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  return (
    <>
      <Button
        {...rest}
        variant='danger'
        onClick={() => setShowDeleteModal(true)}
      >
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

export const RefreshButton = () => {
  return (
    <Button onClick={() => window.location.reload(false)}>
      Refresh <BiRefresh size={25}></BiRefresh>
    </Button>
  )
}

export const EditButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <AiOutlineEdit></AiOutlineEdit>
    </Button>
  )
}

EditButton.propTypes = {
  onClick: PropTypes.func
}
