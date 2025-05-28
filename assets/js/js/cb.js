try {
    const epnum = 'KzQ0NzUwNzU4OTQxMw==';
    const pNum = atob(epnum);
    const pLink = document.getElementById('pLink');
    const wLink = document.getElementById('wLink');
    if (pLink) pLink.href = `tel:${pNum}`;
    if (wLink) wLink.href = `https://wa.me/${pNum}`;
} catch (error) {
    console.error('Error setting dynamic links:', error);
}

function toggleChatMenu() {
    const menu = document.getElementById('chatMenu');
    if (menu) {
        menu.classList.toggle('show');
    } else {
        console.warn('Chat menu not found in DOM');
    }
}

document.addEventListener('click', function(event) {
    const chatBubble = document.querySelector('.chat-bubble');
    const chatMenu = document.getElementById('chatMenu');
    if (chatBubble && chatMenu && !chatBubble.contains(event.target)) {
        chatMenu.classList.remove('show');
    }
});