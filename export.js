export const TEST = `<div class="sms">
<span class="chat-border">
	<span class="chat-topic">
		<span class="message" id="user1" style="color: rgb(38, 38, 38); font-size: 20px; position: absolute;top: -6px; left: 20px;">User</span>
	</span>
	<span class="chat-close-btn" style="position: absolute; top: 6px; right: 10px; transform: scale(0.7);">&times;</span>
	<div class="chat-message" id="chatMessages"></div>

	<div class="chat-under">
		<span class="import">
			<input type="text" id="textInput" placeholder="type here ..." required>
		</span>
		<button class="send" onclick="sendMessage()"></button>
	</div>
</span>
</div>`