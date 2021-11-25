require "test_helper"

class Web::BoardsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get web_boards_show_url
    assert_response :success
  end
end
