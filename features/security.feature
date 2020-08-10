Feature: Security

@active
Scenario: Run Command
  When I run a command
  Then the output is "foo"
  
  # Then the exit code is 0