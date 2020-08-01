App.scrape = App.cable.subscriptions.create("ScrapeChannel", {
  connected: function() {
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
    $('#scrapes').append($("<p>", { html: data['message'] }));
  }
});
