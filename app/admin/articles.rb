ActiveAdmin.register Article do
  menu parent: "Article"
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :title, :body, :image

  sidebar "Article Details", only: [:show, :edit] do
    ul do
      li link_to "Comments", admin_article_comments_path(resource)
    end
  end

  csv do
    column :title
    column(:commenter) { |article| article.comments.first.commenter }
    column(:comment_body) { |article| article.comments.first.commenter }
    # column(:date)
    column('body',humanize_name: false) # preserve case
  end
  #
  # or
  #
  # permit_params do
  #   permitted = [:title, :body]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  
end
