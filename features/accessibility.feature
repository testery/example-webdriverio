Feature: Accessibility

  @table
  @pass @me
  Scenario Outline: Site Accessibility
    When I navigate to '<url>'
    Then take a screenshot
    And I run an accessibility test
	  Then there should be no accessibility violations

    Examples:
      | url                               |
      | https://www.carfax.com            |
      | https://www.amazon.com            |
      | https://www.testery.io            |
      | http://hekademeia.org/ |

  @pass
  Scenario: Checking Specific Accessibility Rules
  When I navigate to 'https://www.carfax.com'
  And I run an accessibility test
  Then the following rules are enforced
    | rule                                |
    | landmark-one-main                   |
    | button-name                         |
    | blink                               |
    | definition-list                     |
    | dlitem                              |
    | html-has-lang                       |
    | html-lang-valid                     |
    | html-xml-lang-mismatch              |
    | listitem                            |
    | marquee                             |
    | object-alt                          |
    | list                                |
    | accesskeys                          |
    | area-alt                            |
    | th-has-data-cells                   |
    | td-headers-attr                     |
    | td-has-header                       |
    | region                              |
    | aria-valid-attr                     |
    | aria-valid-attr-value               |
    | aria-input-field-name               |
    | aria-allowed-role                   |
    | aria-roles                          |
    | aria-toggle-field-name              |
    | aria-hidden-focus                   |
    | aria-hidden-body                    |
    | no-autoplay-audio                   |
    | autocomplete-valid                  |
    | landmark-banner-is-top-level        |
    | p-as-heading                        |
    | button-name                         |
    | aria-required-parent                |
    | aria-required-children              |
    | landmark-complementary-is-top-level |
    | landmark-contentinfo-is-top-level   |
    | css-orientation-lock                |
    | table-fake-caption                  |
    | document-title                      |
    | role-img-alt                        |
    | focus-order-semantics               |
    | aria-allowed-attr                   |
    | tabindex                            |
    | identical-links-same-purpose        |
    | scrollable-region-focusable         |
    | landmark-no-duplicate-main          |
    | label                               |
    | label-title-only                    |
    | form-field-multiple-labels          |
    | frame-tested                        |
    | frame-title-unique                  |
    | frame-title                         |
    | heading-order                       |
    | empty-heading                       |
    | hidden-content                      |
    | duplicate-id-active                 |
    | duplicate-id                        |
    | duplicate-id-aria                   |
    | input-image-alt                     |
    | image-alt                           |
    | avoid-inline-spacing                |
    | input-button-name                   |
    | label-content-name-mismatch         |
    | landmark-unique                     |
    | valid-lang                          |
    | link-in-text-block                  |
    | link-name                           |
    | landmark-main-is-top-level          |
    | page-has-heading-one                |
    | bypass                              |
    | landmark-one-main                   |
    | landmark-no-duplicate-banner        |
    | landmark-no-duplicate-contentinfo   |
    | aria-required-attr                  |
    | scope-attr-valid                    |
    | server-side-image-map               |
    | svg-img-alt                         |
    | color-contrast                      |
    | image-redundant-alt                 |
    | table-duplicate-name                |
    | skip-link                           |
    | meta-refresh                        |
    | aria-roledescription                |
    | meta-viewport-large                 |
    | meta-viewport                       |     