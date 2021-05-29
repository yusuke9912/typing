class A < ActiveRecord::Migration[5.2]
  def change
    add_reference :max_score30s, :users, foreign_key: true
    add_reference :max_score60s, :users, foreign_key: true
    add_reference :max_score90s, :users, foreign_key: true
  end
end
