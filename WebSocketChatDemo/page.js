function ChatUser(n) {
    this.name = n;
    this.timeOfLogin = new Date();
}

function ChatMessage(n, m) {
    this.nickName = n;
    this.chatData = m;
    this.timeOfMessage = new Date();
}