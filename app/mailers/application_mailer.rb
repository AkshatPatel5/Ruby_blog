# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'akpatel@deqode.com'
  layout 'mailer'
end
