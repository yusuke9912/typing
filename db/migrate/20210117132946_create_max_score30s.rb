class CreateMaxScore30s < ActiveRecord::Migration[5.2]
  def change
    create_table :max_score30s do |t|
      t.integer :score

      t.timestamps
    end
  end
end
