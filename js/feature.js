// ========== 1. 主动发信（定时弹窗） ==========
// 每30秒主动显示一条消息（可改为你想要的间隔）
setInterval(() => {
    const messages = [
        '💬 嗨，我还在呢～ 想聊什么？',
        '☀️ 今天天气不错，心情好吗？',
        '📚 记得休息一下，别太累哦',
        '🌟 你最近有什么有趣的事吗？'
    ];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    // 在页面上显示（找一个 id 为 "chat-area" 或 "message-box" 的元素，若没有则用 alert）
    const chatBox = document.getElementById('chat-box') || document.getElementById('messages');
    if (chatBox) {
        const div = document.createElement('div');
        div.textContent = '🤖 主动：' + msg;
        div.style.color = '#888';
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    } else {
        // 如果找不到聊天框，就用浏览器通知（需用户允许）
        if (Notification.permission === 'granted') {
            new Notification('Milk 陪伴', { body: msg });
        } else if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }
}, 30000); // 30秒，可调整

// ========== 2. 陪伴功能（每分钟一句暖心话） ==========
setInterval(() => {
    const companionWords = [
        '🌷 世界很大，你在我的心里',
        '☕ 累了就喝杯茶，我陪你',
        '🎵 听首歌放松一下吧',
        '💪 你做得很好，继续加油'
    ];
    const word = companionWords[Math.floor(Math.random() * companionWords.length)];
    const statusBar = document.getElementById('status') || document.getElementById('footer');
    if (statusBar) {
        statusBar.textContent = '💕 ' + word;
    } else {
        console.log('陪伴提示：', word);
    }
}, 60000); // 每分钟

// ========== 3. 指定选择题（等概率） ==========
// 监听用户输入，识别“从...中选”或“选一个”
document.addEventListener('DOMContentLoaded', function() {
    // 假设你的输入框 id 是 "input" 或 "message-input"
    const input = document.getElementById('input') || document.getElementById('message-input');
    const sendBtn = document.getElementById('send') || document.getElementById('submit');
    if (!input) return;

    function handleChoice(text) {
        // 匹配 "从苹果、香蕉、橘子中选" 或 "选一个：红黄蓝"
        let match = text.match(/从([^中]+)中选/);
        if (!match) match = text.match(/选一个[:：]\s*(.+)/);
        if (match) {
            let options = match[1].split(/[、,，\s]+/).filter(s => s.trim().length > 0);
            if (options.length === 0) return null;
            const picked = options[Math.floor(Math.random() * options.length)];
            return picked;
        }
        return null;
    }

    function processMessage() {
        const text = input.value.trim();
        if (!text) return;
        const result = handleChoice(text);
        if (result) {
            // 在聊天框显示结果（假设有个显示区）
            const chatBox = document.getElementById('chat-box') || document.getElementById('messages');
            if (chatBox) {
                const div = document.createElement('div');
                div.textContent = '🎲 我选了：' + result;
                div.style.color = '#007bff';
                chatBox.appendChild(div);
                chatBox.scrollTop = chatBox.scrollHeight;
            } else {
                alert('随机选择结果：' + result);
            }
            input.value = '';
        }
        // 若不匹配选择，则保留原有逻辑（这里不干涉）
    }

    // 绑定发送事件
    if (sendBtn) {
        sendBtn.addEventListener('click', processMessage);
    }
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') processMessage();
    });
});

// 请求通知权限（页面加载时）
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}