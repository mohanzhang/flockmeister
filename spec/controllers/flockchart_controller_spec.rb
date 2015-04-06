require 'rails_helper'

describe FlockchartController do
  describe "GET generate" do
    it "blows up if not passed correct json" do
      expect {
        get :generate, json: "thisisnotjson!!!"
      }.to raise_error(JSON::ParserError)
    end

    it "does not allow more than 12 chickens at once" do
      peck_data = (1..13).map do |i|
        { name: "chicken#{i}", pecks: [] }
      end

      expect {
        get :generate, json: peck_data.to_json
      }.to raise_error("Too many birds")
    end
  end
end
