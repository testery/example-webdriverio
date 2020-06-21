Feature: Navigation

  @table
  @pass
  Scenario Outline: Navigation Tests
    When I navigate to '<url>'
    Then take a screenshot

    Examples:
      | url                   |
      | http://www.google.com |
      | http://www.yahoo.com  |
      | https://bitbucket.org |