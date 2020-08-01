class ScrapeJob < ApplicationJob
  CHILD_EXPIRES_IN = 5.minutes

  def perform(url)
    begin
      uri = URI(url)
      scrape = Scrape.create!(url: url, child: child(uri))
      message = scrape.as_message
    rescue => e
      message = e.message
    ensure
      ActionCable.server.broadcast 'scrape_channel', message: message
    end
  end

  private

  def child(uri)
    Rails.cache.fetch(uri, expires_in: CHILD_EXPIRES_IN) do
      content = Net::HTTP.get(uri)
      Nokogiri::HTML(content).enum_for(:traverse).count
    end
  end
end
