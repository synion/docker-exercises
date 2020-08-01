class ScrapesController < ApplicationController
  def index
    render :index, locals: { scrapes: scrapes }
  end

  private

  def scrapes
    Scrape.limit(10)
  end
end
