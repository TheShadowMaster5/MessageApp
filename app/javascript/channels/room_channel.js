import consumer from "./consumer"

consumer.subscriptions.create({channel: "RoomChannel", room_id: 1}, {
  connected() {
      console.log("connected......");
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data)
  {
    console.log(data);

    var node = document.createElement("DIV");
    var textnode = document.createTextNode(data.message.message);
    node.appendChild(textnode);
    var sender_id = document.getElementById('MessagePage').getAttribute('data-sender-user-id');
    if(sender_id == data.message.sender_id)
    {
      node.classList.add('SenderMessage');
    }
    else
    {
      node.classList.add('ReceiverMessage');
    }
    document.getElementById("messages_list").appendChild(node);
  }
});
