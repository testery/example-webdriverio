Feature: VALIDATING AND VERIFYING DATA

@etl
Scenario: Statistics Job
    Given 'test.csv' is a CSV file with the following records
    |Name	  |Age |Score |Grade  |
	|Samantha |18  |96    |A      |
	|Alexis	  |14  |84    |B      |
    And I read the 'test.csv' CSV file
    And I verify the data on 'test.csv' matches the following patterns
    |Name	  |Age |Score |Grade  |
    |.*		  |\d* |\d*	  |[ABCDF]|
    And I verify the data on 'test.csv' is in the following ranges
    |Age	  |Score   |
    |13<x<19  |0<x<100 |
    When I run the statistics ETL job on 'test.csv'
    # Then I verify a 'test-stats.csv' file is created
    # And I verify the file format of 'test-stats.csv' is 'CSV'
    # And I read the 'test-stats.csv' CSV file
    # And I verify the 'test-stats.csv' CSV file has '1' rows
    # Then I verify the data on 'test-stats.csv' has the following values
    # |Avg Age| Avg Score |
    # |	16	| 90        |