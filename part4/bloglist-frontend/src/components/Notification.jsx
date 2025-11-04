import '../main.css'

const Notification = ({ msg, notification }) => {
  if (!msg && !notification) {
    return null
  }
  return (
    <div>
      {msg && <div className="error">{msg}</div>}

      {notification && <div className="success">{notification}</div>}
    </div>
  )
}

export default Notification
