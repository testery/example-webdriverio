Feature: ETL

@etl
Scenario: ETL - CREATE CSV    
    Given 'test.csv' is a CSV file with the following records
    |Name		|Age|
	|Samantha	|7	|
	|Alexis		|3	|