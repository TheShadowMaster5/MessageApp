class User < ApplicationRecord

  has_many :send_messages, foreign_key: "sender_id", class_name: "Message"
  has_many :receive_messages, foreign_key: "receiver_id", class_name: "Message"
  has_one_attached :avatar

  def self.is_authenticated(email,password)
      require "bcrypt"
      begin
        user = User.find_by(email: email)
        if user.present? && self.password_match(user,password)
          return true
        else
          return false
        end
      rescue
        return false
      end
  end

  def self.password_match(user,password)
    return BCrypt::Password.new(user.password) == password
  end

end
