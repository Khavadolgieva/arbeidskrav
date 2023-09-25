import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function CustomToast({ text }) {
  return (
    <ToastContainer className="position-static">
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Tiden er ute</strong>
          
        </Toast.Header>
        <Toast.Body>{text}.</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default CustomToast
