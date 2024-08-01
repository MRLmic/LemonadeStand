# Lemonade Stand

This project was completed as part of an interview process.

## Technologies
* React.js: v18.2.0
* .NET: 7.0
* Entity Framework Core (EF Core): v7.0
* PostgreSQL

* Formerly hosted on Azure, this project has been taken down. 

## User Stories
* As a user, I can add varying quantities of products to my cart.
* As a user, I can clear my entire order with a single action.
* As a user, I can see the total cost of my cart updated instantly as I add or adjust items.
* As a user, I can submit my order, enter my customer data, and receive a confirmation number.

## UI Requirements 
In addition to the below specifications, it was also requested that I reproduce a provided UI mock-up. 

_mock-up_
![Provided Mockup](mockup.png)
_final result with data populated_
<!-- TODO Add image of app with data populated -->

## Specs
Acceptance criteria provided: 
1. Allow you to modify lemonade types and sizes in the datastore and automatically update types and sizes displayed to the customer 
2. Allow customers to initially buy 2 types of lemonade:
  a. Regular lemonade 
  b. Pink lemonade 
2. Allow customers to initially buy 2 sizes of lemonade: 
  a. Regular size 
  b. Large size 
3. Allow customers to enter their personal information to pick up their orders: 
  a. Name 
  b. Phone number or email 
4. Display an order number for customers 
5. Record orders in a data store to keep track of orders 
6. Store codebases in a public git repository 


## ERD
- The following is a representation of how I have structured my tables:
![ERD](<Lemonade ERD.png>)


### Next Steps:
- implement responsive UI design (original specs did not require)
