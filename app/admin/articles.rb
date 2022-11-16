# frozen_string_literal: true

ActiveAdmin.register Article do
  menu parent: 'Article'

  form title: 'A custom title' do |f|
    inputs 'Details' do
      input :title
      input :body, label: 'Body of the article'
      li "Created at #{f.object.created_at}" unless f.object.new_record?
    end
    panel 'Markup' do
      'The following can be used in the content below...'
    end
    inputs 'Content', :body
    para 'Press cancel to return to the list without saving.'
    actions
  end
  permit_params :title, :body, :image

  sidebar 'Article Details', only: %i[show edit] do
    ul do
      li link_to 'Comments', admin_article_comments_path(resource)
    end
  end

  csv do
    column :title
    column(:commenter) { |article| article.comments.first.commenter }
    column(:comment_body) { |article| article.comments.first.commenter }
    column('body', humanize_name: false) # preserve case
  end
  index do
    selectable_column
    id_column
    column :title
    column :body
    actions
  end
  member_action :comments do
    @comments = resource.comments
    @page_title = "#{resource.title}: Comments"
    # This will render app/views/admin/posts/comments.html.erb
  end
  action_item :view, only: :show do
    link_to 'View on site', article_path(article)
  end
end
