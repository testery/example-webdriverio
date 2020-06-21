Feature: Hilton Search

  Scenario: User can search for hotels
    Given I navigate to the Hilton web app
    And I search for hotels in "Memphis"
    Then I see list of hotels in search results