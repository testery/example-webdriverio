Feature: Navigation

  @pass
  Scenario: User Searches Yahoo
    When I navigate to "http://www.yahoo.com"
    Then the page title is 'Yahoo'

  @pass
  Scenario: User Searches Google
    When I navigate to "http://www.google.com"
    Then the page title is 'Google'

  Scenario: This test will fail
    When I navigate to "http://www.google.com"
    Then the page title is 'Not Google'

  @ignore
  Scenario: User Goes to Amazon
    When I navigate to 'http://www.amazon.com'
    Then the page title is 'This test should not run since it is ignored'

  @github
  @pass
  Scenario: User Goes to Github
    When I navigate to 'http://www.github.com'
    Then the page title is 'GitHub: Where the world builds software · GitHubz'
    Then take a screenshot

  @table
  @pass
  Scenario Outline: Navigation Tests
    When I navigate to '<url>'
    Then the page title is '<title>'

    Examples:
      | name   | url                   | title  |
      | Google | http://www.google.com | Google |
      | Yahoo  | http://www.yahoo.com  | Yahoo  |

  @smoke
  Scenario: User Visits Homepage
    When I navigate to the webapp
    Then the page title is 'React App'
    When I click Users
    Then take a screenshot
    When I click Home
    Then take a screenshot
    When I click About
    Then take a screenshot
