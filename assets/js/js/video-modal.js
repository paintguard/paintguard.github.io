// Video Modal JavaScript
console.log('🎬 Video Modal Loading...');

function openVideoModal() {
    console.log('▶️ Opening video modal...');
    
    const videoModal = document.getElementById('instructionVideoModal');
    const mainVideo = document.getElementById('main-instruction-video');
    const backgroundVideo = document.getElementById('intro-background-video');
    
    if (!videoModal || !mainVideo) {
        console.error('❌ Video elements not found');
        return;
    }
    
    // Set the video source with proper parameters
    const videoUrl = 'https://www.youtube.com/embed/RHrUwL20QGo?autoplay=1&mute=0&rel=0&modestbranding=1&showinfo=0&controls=1';
    console.log('🔗 Setting video URL:', videoUrl);
    mainVideo.src = videoUrl;
    
    // Hide background video
    if (backgroundVideo) {
        backgroundVideo.style.display = 'none';
    }
    
    // Show modal
    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        // Use Bootstrap modal if available
        const modal = new bootstrap.Modal(videoModal);
        modal.show();
        console.log('✅ Bootstrap modal shown');
    } else {
        // Fallback manual modal
        videoModal.style.display = 'block';
        videoModal.classList.add('show');
        videoModal.style.backgroundColor = 'rgba(0,0,0,0.8)';
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
        console.log('✅ Manual modal shown');
    }
}

function closeVideoModal() {
    console.log('❌ Closing video modal...');
    
    const videoModal = document.getElementById('instructionVideoModal');
    const mainVideo = document.getElementById('main-instruction-video');
    const backgroundVideo = document.getElementById('intro-background-video');
    
    // Stop video
    if (mainVideo) {
        mainVideo.src = '';
    }
    
    // Restore background video
    if (backgroundVideo) {
        backgroundVideo.style.display = 'block';
    }
    
    // Hide modal
    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        const modal = bootstrap.Modal.getInstance(videoModal);
        if (modal) {
            modal.hide();
        }
    } else {
        // Manual close
        if (videoModal) {
            videoModal.style.display = 'none';
            videoModal.classList.remove('show');
        }
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
    }
    
    console.log('✅ Video modal closed');
}

// Escape key handler
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const videoModal = document.getElementById('instructionVideoModal');
        if (videoModal && (videoModal.classList.contains('show') || videoModal.style.display === 'block')) {
            closeVideoModal();
        }
    }
});

// Bootstrap modal event listeners (if Bootstrap is available)
document.addEventListener('DOMContentLoaded', function() {
    const videoModal = document.getElementById('instructionVideoModal');
    if (videoModal && typeof bootstrap !== 'undefined') {
        videoModal.addEventListener('hidden.bs.modal', function() {
            const mainVideo = document.getElementById('main-instruction-video');
            const backgroundVideo = document.getElementById('intro-background-video');
            
            if (mainVideo) {
                mainVideo.src = '';
            }
            if (backgroundVideo) {
                backgroundVideo.style.display = 'block';
            }
        });
    }
});

console.log('✅ Video Modal Ready!');

// Make functions globally available
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;