Rails.application.routes.draw do
  root 'ui#show'

  get 'flockchart' => 'flockchart#generate', format: :png
end
