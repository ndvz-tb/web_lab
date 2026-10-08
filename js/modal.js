function showModal(message) {
    const modal = document.getElementById('errorModal');
    const messageEl = document.getElementById('modalErrorMessage');
    if (modal && messageEl) {
        messageEl.textContent = message;
        modal.style.display = 'block';
    }
}
function hideModal() {
    const modal = document.getElementById('errorModal');
    if (modal) {
        modal.style.display = 'none';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const okBtn = document.getElementById('modalOkBtn');
    if (okBtn) okBtn.addEventListener('click', hideModal);
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('errorModal');
        if (event.target === modal) {
            hideModal();
        }
    });
});