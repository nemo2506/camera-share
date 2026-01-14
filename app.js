const servers = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" } // Serveur STUN gratuit pour WebRTC
  ]
};

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startCameraButton = document.getElementById('startCamera');
const connectButton = document.getElementById('connectButton');
const sessionIdDisplay = document.getElementById('sessionId');
const remoteSessionIdInput = document.getElementById('remoteSessionId');

let peerConnection, localStream;

// Génère un ID unique pour la session
const generateSessionId = () => Math.random().toString(36).substring(2, 10);

// Stockage des sessions (utilisé comme simulateur pour GitHub Pages)
const sessions = new Map();

// Démarrer la caméra côté iPhone
startCameraButton.addEventListener('click', async () => {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    localVideo.srcObject = localStream;

    // Crée une session locale
    const sessionId = generateSessionId();
    sessionIdDisplay.textContent = sessionId;

    // Sauvegarde l'ID et offre WebRTC
    peerConnection = new RTCPeerConnection(servers);
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    sessions.set(sessionId, {
      offer: peerConnection.localDescription
    });

    console.log('Session créée avec ID:', sessionId);
  } catch (err) {
    console.error('Erreur lors de l’activation de la caméra:', err);
  }
});

// Se connecter côté PC
connectButton.addEventListener('click', async () => {
  try {
    const remoteSessionId = remoteSessionIdInput.value;
    const session = sessions.get(remoteSessionId);
    
    if (!session) {
      alert('Session ID invalide with ' + remoteSessionId);
      return;
    }

    // Crée la connexion WebRTC
    peerConnection = new RTCPeerConnection(servers);
    peerConnection.ontrack = (event) => {
      remoteVideo.srcObject = event.streams[0];
    };

    // Récupère l'offre de la session et crée une réponse
    await peerConnection.setRemoteDescription(session.offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    console.log('Connexion établie avec la session:', remoteSessionId);
  } catch (err) {
    console.error('Erreur lors de la connexion:', err);
  }
});
