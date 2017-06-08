import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

export default class NotificationClient extends Component {
	render(){
		return null;	
	}

    componentDidMount() {
        FCM.requestPermissions();
        FCM.getFCMToken().then(token => {
            console.log("Got token",token)
	    this.props.onChangeToken(token);
        });
        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            console.log('Got Notification',notif)
            FCM.presentLocalNotification({
                title: notif.title,
                body: notif.body,
                priority: "high",
                click_action: notif.click_action,
                show_in_foreground: true,
                local: true
            });
            if(notif.local_notification){
              //this is a local notification
            }
            if(notif.opened_from_tray){
              //app is open/resumed because user clicked banner
            }
        });
        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
            console.log('refreshTokenListener',token)
	    this.props.onChangeToken(token);
            // fcm token may not be available on first load, catch it here
        });
        FCM.getInitialNotification().then(function(notif){
            console.log('Got Notification',notif);
            FCM.presentLocalNotification({
                title: notif.title,
                body: notif.body,
                priority: "high",
                click_action: notif.click_action,
                show_in_foreground: true,
                local: true
            });
        });
    }

    componentWillUnmount() {
        this.notificationListener.remove();
        this.refreshTokenListener.remove();
    }
}
