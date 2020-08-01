class CreateScrapes < ActiveRecord::Migration[5.2]
  def change
    create_table :scrapes do |t|
      t.string :url, null: false
      t.integer :child
      t.timestamps null: false
    end
  end
end
