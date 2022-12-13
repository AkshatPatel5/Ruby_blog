# frozen_string_literal: true

# Sidekiq Job to test job in busy state
class PlayJob
  include Sidekiq::Job

  def perform(type)
    case type
    when 'easy'
      sleep 5
      puts 'this is easy job 5 sec wait'
    when 'medium'
      sleep 20
      puts 'this is medium job 20 sec wait'
    when 'hard'
      sleep 30
      puts 'this is hard job 30 sec wait'
    when 'error'
      sleep 15
      puts 'there is a error, wait for 15 sec'
      raise 'raised error'
    end
  end
end
