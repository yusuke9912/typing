class B < ActiveRecord::Migration[5.2]
  def change
     add_reference :scores, :users, foreign_key: true
  end
end
