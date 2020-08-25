Feature: Learning Objects

  Scenario: Creating a learning object weblink as an admin
    Given I have logged in as admin
    When I click on "Courses and Content Library" in the menu
    And click on "Learning Objects" in the menu
    And click on "Add New From Web"
    And select a value for "Topic" from the dropdown
    And fill in a title "Test Title"
    And upload an image
    And provide a brief description
    And add two tags
    And add a content link "https://blog.testery.io"
    And click save
    Then a message appears that says "Learn Link ____ has been created."

    When I click on view for "Test Title"
    Then I should see the title, description, and tags are populated

    When I click on "Read more"
    Then the URL "https://blog.testery.io" is opened in a new window

  Scenario: Creating a bookmark as a learner
    Given I have logged in as a learner
    When I click on "New"
    And click on the bookmark icon for the first item listed
    Then the bookmark icon fills in

    When I click on "Me" in the main menu
    Then I should see the first bookmark listed is the item bookmarked previously
