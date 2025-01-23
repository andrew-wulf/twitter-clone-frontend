export function Modal(props) {


  if (props.show) {

    return (
      <>
        <div className="modal-bg" onClick={props.onClose}>
        </div>

        {props.content}

      </>
  
    )
  }
}