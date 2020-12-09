@smoke
Feature: VALIDATING AND VERIFYING DATA

@etl 
Scenario: READING AND WRITING CSV
    Given 'test.csv' is a file with the following records
        |Name	            |Age        |Score      |Grade  |
        |Samantha           |18         |96         |A      |
        |Alexis	            |14         |84         |B      |
    And I read the 'test.csv' file
    And I verify the data on 'test.csv' matches the following patterns
        |Name	            |Age        |Score      |Grade  |
        |.*		            |\d*        |\d*	    |[ABCDF]|
    And I verify the data on 'test.csv' is in the following ranges
        |Age	            |Score      |
        |13<x<19            |0<x<100    |
    When I run the statistics ETL job on 'test.csv'
    Then I verify a 'test-stats.csv' file is created
    And I verify the file format of 'test-stats.csv' is '.csv'
    And I read the 'test-stats.csv' file
    Then I verify the data on 'test-stats.csv' has the following values
        |Avg Age            | Avg Score |
        |	16	            | 90        |
    And I verify the data on 'test-stats.csv' is in the following ranges
        |Avg Age            |
        |18<x<20            |

@etl
Scenario: READING AND WRITING JSON
    Given 'test.json' is a file with the following records
        |Name	            |Age        |Score      |Grade  |
        |Samantha           |18         |96         |A      |
        |Alexis	            |14         |84         |B      |
    And I read the 'test.json' file
    And I verify the data on 'test.json' matches the following patterns
        |Name	            |Age        |Score      |Grade  |
        |.*		            |\d*        |\d*	    |[ABCDF]|
    And I verify the data on 'test.json' is in the following ranges
        |Age	            |Score      |
        |13<x<19            |0<x<100    |
    When I run the statistics ETL job on 'test.json'
    Then I verify a 'test-stats.json' file is created
    And I verify the file format of 'test-stats.json' is '.json'
    And I read the 'test-stats.json' file
    Then I verify the data on 'test-stats.json' has the following values
        |Avg Age            | Avg Score |
        |	16	            | 90        |
    And I verify the data on 'test.json' is in the following ranges
        |Avg Age	      |
        |0<x<5            |

@etl
Scenario: READING AND WRITING SQL
    Given I connect to the following MySql database
        |database           |port    |user     |host                        |
        |Rfam               |4497    |rfamro   |mysql-rfam-public.ebi.ac.uk |
    And I run the following sql query
    """
    SELECT fr.rfam_acc, fr.rfamseq_acc, fr.seq_start, fr.seq_end
    FROM full_region fr, rfamseq rf, taxonomy tx
    WHERE rf.ncbi_id = tx.ncbi_id
    AND fr.rfamseq_acc = rf.rfamseq_acc
    AND tx.ncbi_id = 10116
    AND is_significant = 1
    LIMIT 2
    """
    Then I verify the data on 'extracted data' has the following values
        |rfam_acc           |rfamseq_acc      |seq_start |seq_end           |
        |RF02143            |AABR05000762.1   |4020      |3788              |  
        |RF00665            |AABR05005166.1   |6218      |6135              |  
    When I run the bioinformatics ETL job
    Then I run the following sql query
    """
    SELECT fr.seq_start, fr.seq_end
    FROM full_region fr, rfamseq rf, taxonomy tx
    WHERE rf.ncbi_id = tx.ncbi_id
    AND fr.rfamseq_acc = rf.rfamseq_acc
    AND tx.ncbi_id = 10116
    AND is_significant = 1
    LIMIT 1
    """
    Then I verify the data on 'transformed data loaded into db' has the following values
        |seq_start          |seq_end           |
        |4020               |3788              |  
