# frozen_string_literal: true

# Sidekiq Job to mail a user on creation of a article
class MailJob
  include Sidekiq::Job
  queue_as :mail

  def perform(id, aid)
    sleep 10
    user = User.find(id)
    article = Article.find(aid)
    # Do something
    UserMailer.with(user: user, article: article).article_email.deliver_now
  end
end
