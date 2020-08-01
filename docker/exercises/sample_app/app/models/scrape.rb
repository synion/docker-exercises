class Scrape < ApplicationRecord
  def as_message
    "#{url} - #{child} kids"
  end
end
