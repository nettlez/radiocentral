window.AudioContext || window.webkitAudioContext)();

const visualizer = document.getElementById('visualizer');
const canvasCtx = visualizer.getContext('2d');
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

let audioSource;
let isPlaying = false;

function setupAudioNodes() {
  const source = audioContext.createMediaElementSource(audioSource);
  source.connect(analyser);
  analyser.connect(audioContext.destination);
}

function draw() {
  requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);

  canvasCtx.fillStyle = '#0f0f0f';
  canvasCtx.fillRect(0, 0, visualizer.width, visualizer.height);

  const barWidth = (visualizer.width / bufferLength;
let barHeight;
let x = 0;

for(let i = 0; i < bufferLength; i++) {
barHeight = dataArray[i];
    canvasCtx.fillStyle = '#00ff00';
canvasCtx.fillRect(x, visualizer.height - barHeight, barWidth, barHeight);

x += barWidth + 1;
}
}

function togglePlay() {
if(isPlaying) {
audioSource.pause();
isPlaying = false;
} else {
audioContext.resume().then(() => {
audioSource.play();
isPlaying = true;
});
}
}

const dropdown = document.getElementById('stations');
const connectBtn = document.getElementById('connect-btn');

connectBtn.addEventListener('click', () => {
const selectedStation = dropdown.value;
audioSource = new Audio(selectedStation);
setupAudioNodes();
togglePlay();
});

draw();
