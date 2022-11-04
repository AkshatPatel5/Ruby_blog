# frozen_string_literal: true

ActiveAdmin.register_page 'ArticleAndComment' do
  menu parent: 'Article'
  controller do
    def index
      @articles = Article.all
    end
  end
  content do
    render partial: 'index'
  end
  
  action_item :view_site do
    link_to 'View Users', '/admin/users'
  end

  breadcrumb do
    %w[admin articles_and_comments]
  end
  
  page_action :add_event, method: :post do
    # ...
    redirect_to admin_articleandcomment_path, notice: 'Your event was added'
  end
 

  # index do
  #   id_column
  #   column :title
  #   column :body
  # end
end
