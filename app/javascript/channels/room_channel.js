import consumer from "./consumer"

document.addEventListener('turbolinks:load', () =>{

  var element   = document.getElementById('MessagePage');
  const room_id = element!== null ? element.getAttribute('data-chat_room_id') : 1;
  consumer.subscriptions.create({channel: "RoomChannel", room_id: room_id},
  {
    connected() {
        console.log("connected......");
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data)
    {
      var node = document.createElement("DIV");
      var textnode = document.createTextNode(data.message.message);
      node.appendChild(textnode);
      var sender_id = document.getElementById('MessagePage').getAttribute('data-loggedin_person_user_id');
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


})
