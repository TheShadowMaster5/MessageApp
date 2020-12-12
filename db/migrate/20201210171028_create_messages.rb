class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.text :message
      t.integer :sender_id, foreign_key: true
      t.integer :receiver_id,foreign_key: true
      t.boolean :message_seen

      t.timestamps
    end
  end
end
