# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

- Assumption - There is already a primary key, foriegn key relation between facilities and agents table

- Ticket : Alter the Facilities table to add a new column of uuid
- Description : Add a new column to store the uuid under facilities table, to be stored as string
- Estimate : 1 SP
- Acceptance Criteria :
1. A Random Unique String should be added, during insertion of the record
2. It should not be null
3. Index should be created on field to fetch the record faster

- Implementation
- ALTER FACILTIES ADD COLUMN uuid text
- ALTER AGENTS ADD COLUMN uuid text
- ALTER SHIFTS ADD COLUMN uuid text
=============================================================================================
- Create new a service to generate the uuid
Description - Create a function to generate the random unique string  
- Estimate : 1 SP
- Acceptance Criteria:
1. A random string should be generated of 36 characters
- Implementation:
 - Use uuid v4 module to generate the string

=============================================================================================

- Modify the create facility, agents and shifts Service
- Description 
 - Insert a new value of uuid along with insertion data
- Estimate : 2 SP
- Acceptance Criteria:
1. UUID should be generated and added to the respective models
2. UUID should not allow null values
3. UUID should be unique in nature

- Implementation:
 - Update the database models for each tables 
 - Update the unit test case to add the uuid before insertion of record
 - allowNull should be false for the new field added in database models

=============================================================================================

- Modify the Existing getShiftsByFacility Service
- Description 
- It should accept the random uuid instead of database id
- We need to modify the unit test cases based on the change
- Estimate : 2 SP
- Acceptance Criteria:
1. User should be able to get the shifts based on the uuid
2. User should be able to get the agents information added for each facilities
3. Unit test cases should be working as it is with 99% coverage.
4. Use of Database ID,anywhere should not be seen

- Implementation:
 - Change the query for database from id to uuid
 - Update the unit test case to send the uuid instead of id
=============================================================================================
- Modify the generateReport Service to use uuid
- Description 
- It should accept the random uuid instead of database id
- We need to modify the unit test cases based on the change
- Estimate : 2 SP
- Acceptance Criteria:
1. User should be able to generate based on the facilities uuid
2. Unit test cases should be working as it is with 99% coverage.
3. Use of Database ID,anywhere should not be seen

- Implementation:
 - Need to use uuid + adding extra random string to generate the pdf filename
 - Update the unit test case to use the uuid instead of id
