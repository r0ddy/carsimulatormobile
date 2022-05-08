import {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import io from 'socket.io-client/dist/socket.io';
import './UserAgent.js'

export default function App() {
  const socket = io(
    'https://devicenetwork-dot-car-simulator-349213.uk.r.appspot.com/',
    {
      jsonp: false,
    });

  const [frame, setFrame] = useState(null);

  useEffect(() => {
    socket.emit('join', {device_type: 'phone'});
    socket.on('notif', (data) => {
      console.log(data);
      setFrame(data);
    });
  }, []);

  const formatHtml = () => {
    return '<html><body><img src="data:image/jpg;base64,' + frame + '" width="100%" style="background-color: black; min-height: 100%; min-width: 100%; position: fixed; top: 0; left: 0;"></body></html>'
  };

  return (
    <View style={styles.container}>
      <WebView
        style={styles.vidStream}
        startInLoadingState
        scrollEnabled={false}
        source={{html: formatHtml(), baseUrl: '/'}}
        originWhitelist={['*']} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vidStream: {
    width:640,
    height:480
  }
});
