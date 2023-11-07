import ReactDOM from "react-dom"
import Spinner from "./Spinner"
import { useCloseWithEsc } from "@/hooks/useCloseWithEsc"
import { TRPCClientErrorLike } from "@trpc/client"
import { AppRouter } from "@/server"

interface ModalProps {
  visible: boolean
  toggle: () => void
  title: string
  modalText: string
  action: () => void
  isLoading: boolean
  error: TRPCClientErrorLike<AppRouter> | undefined
}

const Modal = ({
  visible,
  toggle,
  modalText,
  title,
  action,
  isLoading,
  error,
}: ModalProps) => {
  useCloseWithEsc(visible, toggle)

  return visible
    ? ReactDOM.createPortal(
        <div className="modal">
          <div
            className="modalPop bg-white dark:bg-alternativeBlack"
            role="dialog"
            aria-label="confirmation modal"
            aria-modal="true"
          >
            <h2 className="font-bold text-xl">{title}</h2>
            <div className="textWrapper">
              <p>{modalText}</p>
            </div>
            {error && (
              <p className="text-red-500 font-bold mt-4">
                Error switching visibility
              </p>
            )}
            <div className="flex flex-row justify-between w-full mt-10">
              <button onClick={() => toggle()} className="py-3 font-bold">
                Cancel
              </button>
              <button
                disabled={isLoading}
                onClick={() => action()}
                className={`self-center rounded-md py-3 px-8 border-[1px] border-productBlue bg-productBlueOpaque shadow-md transition duration-500 hover:scale-110 text-productBlue dark:text-blue-300`}
              >
                {isLoading ? (
                  <Spinner width="w-6" height="h-6" />
                ) : error ? (
                  "Retry"
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null
}
export default Modal
