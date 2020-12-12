class User < ApplicationRecord

  has_many :send_messages, foreign_key: "sender_id", class_name: "Message"
  has_many :receive_messages, foreign_key: "receiver_id", class_name: "Message"


  def self.is_authenticated(email,password)

    user = User.find_by_email(email)

    if ( user.present? )
      return user.password === password
    else
      return false;
    end

  end

end
