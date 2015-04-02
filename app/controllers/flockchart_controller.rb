require 'open3'

class FlockchartController < ApplicationController
  def generate
    Open3.capture3(Rails.root.join("flockcharter/flockcharter").to_s, stdin_data: params[:json])
    image_path = "/Users/mohanzhang/tmp/output.png"
    send_file image_path, type: 'image/png', disposition: 'inline'
  end
end
