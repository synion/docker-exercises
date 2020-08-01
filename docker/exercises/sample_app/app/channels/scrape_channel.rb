class ScrapeChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'scrape_channel'
  end

  def receive(data)
    ScrapeJob.perform_later(data.fetch('url'))
  end

  def unsubscribed
  end
end
