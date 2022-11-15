class ExampleJob < ApplicationJob
  queue_as :default

  def perform(name, count)
    # Do something later
    puts name, count
  end
end
