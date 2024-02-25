import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button } from 'react-native';
// import { RTCView, RTCPeerConnection, mediaDevices } from 'react-native-webrtc';

const MeetingScreen = () => {
    return (
        <>
        <Text> hii </Text>
        </>
    );
}


// VideoCall.js

// const MeetingScreen = () => {
//   const localStream = useRef(null);
//   const remoteStream = useRef(null);
//   const peerConnection = useRef(null);

//   const [isCalling, setCalling] = useState(false);

//   useEffect(() => {
//     const init = async () => {
//       const stream = await mediaDevices.getUserMedia({ video: true, audio: true });
//       localStream.current = stream;
//     };

//     init();

//     return () => {
//       if (localStream.current) {
//         localStream.current.release();
//       }
//     };
//   }, []);

//   const startCall = async () => {
//     const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
//     peerConnection.current = new RTCPeerConnection(configuration);

//     localStream.current.getTracks().forEach((track) => {
//       peerConnection.current.addTrack(track, localStream.current);
//     });

//     peerConnection.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         // Send the candidate to the other peer via signaling server
//         console.log('Send ICE candidate to signaling server:', event.candidate);
//       }
//     };

//     peerConnection.current.ontrack = (event) => {
//       remoteStream.current = event.streams[0];
//     };

//     // Set up signaling to establish connection (WebSocket or any other signaling mechanism)
//     // For simplicity, you can use a WebSocket server for signaling.

//     setCalling(true);
//   };

//   const endCall = () => {
//     if (peerConnection.current) {
//       peerConnection.current.close();
//       setCalling(false);
//     }
//   };

//   return (
//     <View>
//       <View style={{ flex: 1 }}>
//         {localStream.current && (
//           <RTCView streamURL={localStream.current.toURL()} style={{ flex: 1 }} />
//         )}
//       </View>
//       <View style={{ flex: 1 }}>
//         {remoteStream.current && (
//           <RTCView streamURL={remoteStream.current.toURL()} style={{ flex: 1 }} />
//         )}
//       </View>
//       <View>
//         {!isCalling ? (
//           <Button title="Start Call" onPress={startCall} />
//         ) : (
//           <Button title="End Call" onPress={endCall} />
//         )}
//       </View>
//     </View>
//   );
// };

export default MeetingScreen;

