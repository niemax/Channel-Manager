import ReactDOM from "react-dom"
import Spinner from "./Spinner"

interface ModalProps {
  visible: boolean
  toggle: () => void
  title: string
  modalText: string
  action: () => void
  isLoading: boolean
}

const Modal = ({
  visible,
  toggle,
  modalText,
  title,
  action,
  isLoading,
}: ModalProps) =>
  visible
    ? ReactDOM.createPortal(
        <div className="modal">
          <div
            className="modalPop"
            role="dialog"
            aria-label="confirmation modal"
            aria-modal="true"
          >
            <h2 className="font-bold text-xl">{title}</h2>
            <div className="textWrapper">
              <p>{modalText}</p>
            </div>
            <div className="flex flex-row justify-between w-full mt-10">
              <button onClick={() => toggle()} className="py-3 font-bold">
                Cancel
              </button>
              <button
                disabled={isLoading}
                onClick={() => {
                  action()
                }}
                className={`self-center rounded-md py-3 px-8 border-[1px] border-productBlue bg-productBlueOpaque shadow-md transition duration-500 hover:scale-110 text-productBlue`}
              >
                {isLoading ? <Spinner width="w-6" height="h-6" /> : "Confirm"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null

export default Modal
