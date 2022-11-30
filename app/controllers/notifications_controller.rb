class NotificationsController < ApplicationController
  def update
    @notification = Notification.find(params[:id])
    respond_to do |format|
      if @notification.update(notification_params)
        format.html { redirect_to @article }
        format.json { render json: current_user.notifications.where(read: false).count }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @notification.errors, status: :unprocessable_entity }
      end
    end
  end
  private
  def notification_params
    params.require(:notification).permit(:read)
  end
end
