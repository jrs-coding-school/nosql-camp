

- Using Futon, create a new database named **register**.
- Find a receipt in your wallet or purse.  Using the paper receipt as a guide, add 3 JSON receipt documents to the database.   
- A receipt document must account for the following pieces of data.  Note: Some fields are not required.  
  - store number  (Unique identifier for all stores in our system.)
  - store town (the store's town)
  - store state (the store's state)
  - receipt number (unique business identifier for an individual receipt)
  - payment types (cash, debit, credit)
  - last 4 payment card numbers (if debit or credit, list last 4 card numbers)
  - tax (taxable amount of the balance)
  - balance (the total of all items purchased)
  - debit (total amount placed on debit card, if used.)
  - credit (total amount placed on credit card, if used.)
  - cash (total amount paid with cash, if used.)
  - number of items sold (a total count of all items sold)
  - items sold (an list of items sold including an identifier and amount for each item)

- Additional  Considerations:
  - How would you distinguish a receipt from other document types in the same database?  Include this in your design?
  - If a customer pays with debit, should you include cash and credit related fields in your document?


- Use curl to list all databases.
