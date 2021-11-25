require "test_helper"

class Web::SessionsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get web_sessions_new_url
    assert_response :success
  end
end
