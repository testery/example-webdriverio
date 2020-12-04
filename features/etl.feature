Feature: VALIDATING AND VERIFYING DATA

@etl
Scenario: READING AND WRITING CSV
    Given 'test.csv' is a file with the following records
    |Name	  |Age |Score |Grade  |
	|Samantha |18  |96    |A      |
	|Alexis	  |14  |84    |B      |
    And I read the 'test.csv' file
     And I verify the data on 'test.csv' matches the following patterns
    |Name	  |Age |Score |Grade  |
    |.*		  |\d* |\d*	  |[ABCDF]|
    And I verify the data on 'test.csv' is in the following ranges
    |Age	  |Score   |
    |13<x<19  |0<x<100 |
    When I run the statistics ETL job on 'test.csv'
    Then I verify a 'test-stats.csv' file is created
    And I verify the file format of 'test-stats.csv' is '.csv'
    And I read the 'test-stats.csv' file
    Then I verify the data on 'test-stats.csv' has the following values
    |Avg Age| Avg Score |
    |	16	| 90        |

@etl
Scenario: READING AND WRITING JSON
    Given 'test.json' is a file with the following records
    |Name	  |Age |Score |Grade  |
	|Samantha |18  |96    |A      |
	|Alexis	  |14  |84    |B      |
    And I read the 'test.json' file
    And I verify the data on 'test.json' matches the following patterns
    |Name	  |Age |Score |Grade  |
    |.*		  |\d* |\d*	  |[ABCDF]|
    And I verify the data on 'test.json' is in the following ranges
    |Age	  |Score   |
    |13<x<19  |0<x<100 |
    When I run the statistics ETL job on 'test.json'
    Then I verify a 'test-stats.json' file is created
    And I verify the file format of 'test-stats.json' is '.json'
    And I read the 'test-stats.json' file
    Then I verify the data on 'test-stats.json' has the following values
    |Avg Age| Avg Score |
    |	16	| 90        |    

@etl
Scenario: READING AND WRITING SQL
    Given the 'tableA' table has the following data
    |Name	  |Age |Score |Grade  |
	|Samantha |18  |96    |A      |
	|Alexis	  |14  |84    |B      |
#     When I run the following query
# 	|select * from tableA|
#     And I verify the data on the table matches the following patterns
#     |Name	  |Age |Score |Grade  |
#     |.*		  |\d* |\d*	  |[ABCDF]|
#     And I verify the data on the table is in the following ranges
#     |Age	  |Score   |
#     |13<x<19  |0<x<100 |
#     When I run the statistics ETL job on table
#     Then I verify the transformed data is loaded into 'TableB' table
#     When I run the following query
# 	|select * from tableB|
#     And I verify the 'TableB' table has '1' rows
#     Then I verify the data on 'TableB' has the following values
#     |Avg Age| Avg Score |
#     |	16	| 90        |       