class Message < ApplicationRecord
    belongs_to :send_message, class_name: "User", optional: true
		belongs_to :receive_message, class_name: "User", optional: true 
end
