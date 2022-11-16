# frozen_string_literal: true

# Active job to test about how active job works
class ExampleJob < ApplicationJob
  queue_as :default

  def perform(name, count)
    # Do something later
    puts name, count
  end
end
