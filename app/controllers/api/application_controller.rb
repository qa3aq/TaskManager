class Api::ApplicationController < ApplicationController
  include AuthHelper
  helper_method :current_user
  respond_to :json
end
