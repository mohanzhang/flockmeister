require 'open3'

class FlockchartController < ApplicationController
  def generate
    command = Rails.root.join("flockcharter/dist/build/flockcharter/flockcharter").to_s
    stdout, stderr, status = Open3.capture3(command, stdin_data: safeguarded_json)

    raise stderr if status != 0
    render text: stdout, status: 200
  end

  private

  # Save myself from getting trolled
  def safeguarded_json
    # Make sure this is actually JSON
    hash = JSON.parse(params[:json])

    # Refuse to handle more than 12 chickens at once. What are you, a factory farmer??
    raise "Too many birds" if hash.size > 12

    return params[:json]
  end
end
