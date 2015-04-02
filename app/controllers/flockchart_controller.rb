class FlockchartController < ApplicationController
  def generate
    image_path = Rails.root.join('app/assets/images/logo.png')
    send_file image_path, type: 'image/png', disposition: 'inline'
  end
end
