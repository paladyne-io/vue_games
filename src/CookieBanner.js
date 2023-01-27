const permission = Notification.permission

if (permission === 'granted') {
  showNotification()
} else if (permission === 'default') {
  requestAndShowPermission()
} else {
  alert('Use normal alert')
}

function requestAndShowPermission() {
  Notification.requestPermission(function (permission) {
    if (permission === 'granted') {
      showNotification()
    }
  })
}

function showNotification() {
  //  if(document.visibilityState === "visible") {
  //      return;
  //  }

  const title = 'Cookie Banner'
  const icon = 'https://paladyne.co/notificationlogo.png'
  const body = "We'd like to save a cookie for this page."

  const notification = new Notification(title, { body, icon })

  notification.onclick = () => {
    notification.close()
    window.parent.focus()
  }
}
