const video = document.getElementById('localVideo');
const startButton = document.getElementById('startButton');

// Demande d'accès à la caméra
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;

    // TODO : Ajouter la logique WebRTC ici pour envoyer le flux au PC
    console.log('Camera stream started.');
  } catch (err) {
    console.error('Erreur lors de l’accès à la caméra:', err);
  }
}

startButton.addEventListener('click', startCamera);