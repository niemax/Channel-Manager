import ReactDOM from "react-dom"

interface ModalProps {
  visible: boolean
  toggle: () => void
  title: string
  modalText: string
}

const Modal = ({ visible, toggle, modalText, title }: ModalProps) =>
  visible
    ? ReactDOM.createPortal(
        <div className="modal">
          <div className="modalPop" role="dialog" aria-modal="true">
            <div className="closeButton" onClick={toggle}></div>
            <h2>{title}</h2>
            <div className="textWrapper">
              <p>{modalText}</p>
            </div>
          </div>
        </div>,
        document.body
      )
    : null

export default Modal
