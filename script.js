const videoElement = document.getElementById('video');
const resultText = document.getElementById('result-text');
const feedbackText = document.getElementById('feedback-text');

// Memuat file audio pemberitahuan
const alertSound = new Audio('beep.mp3'); // Gantilah dengan path audio MP3 Anda

// Memilih kamera belakang
function startCamera() {
    const constraints = {
        video: {
            facingMode: 'environment' // Menggunakan kamera belakang
        }
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream) {
                videoElement.srcObject = stream;
            })
            .catch(function(error) {
                console.error("Tidak dapat mengakses kamera: ", error);
            });
    } else {
        alert("Perangkat Anda tidak mendukung akses kamera.");
    }
}

// Fungsi untuk memulai deteksi objek dengan kamera
function startObjectDetection() {
    resultText.innerHTML = "Mendeteksi objek di depan Anda...";
    resultText.style.color = "#4CAF50"; // Tampilkan pesan deteksi

    // Deteksi objek secara simulasi
    setInterval(() => {
        const distance = detectObjectDistance(); // Simulasi pengukuran jarak
        provideAudioFeedback(distance); // Berikan umpan balik audio berdasarkan jarak
    }, 1000);
}

// Fungsi untuk mendeteksi objek dan memberi umpan balik suara berdasarkan jarak
function detectObjectDistance() {
    // Simulasi jarak dalam meter
    const distance = Math.random() * 2; // Jarak acak antara 0 dan 2 meter
    return distance;
}

// Fungsi untuk memberikan umpan balik audio berdasarkan jarak objek
function provideAudioFeedback(distance) {
    let volume = 0; // Default volume adalah 0 (tidak ada suara)

    if (distance < 0.5) {
        feedbackText.innerHTML = "Objek sangat dekat!";
        volume = 1.0; // Suara keras
    } else if (distance >= 0.5 && distance < 1) {
        feedbackText.innerHTML = "Objek dekat.";
        volume = 0.5; // Suara pelan
    } else {
        feedbackText.innerHTML = "Objek jauh.";
        volume = 0; // Tidak ada suara
    }

    // Mengatur volume audio
    alertSound.volume = volume;

    // Memutar audio jika objek terdeteksi dalam jarak dekat
    if (volume > 0) {
        alertSound.play().catch(error => console.log("Error playing audio: ", error));
    }
}

// Mulai kamera saat halaman dimuat
startCamera();

// Fungsi untuk menginisialisasi deteksi saat tombol ditekan
document.getElementById("start-btn").addEventListener("click", startObjectDetection);


