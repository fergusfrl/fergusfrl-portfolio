---
title: Ordering of Aggregate Functions in PostgreSQL
description: Use PostgreSQL to aggregates arrays
publishedDate: June 23, 2021
tags:
  - SQL
  - PostgreSQL
snippet: When using multiple aggregate functions in PostgreSQL, the set of results is iterated through once. This is interesting behavior because it means that the order of the aggregated results is preserved across selection clauses. Looking at the output of the script below, we know that the three individuals are "George Martins", "Mary Wong" and "Amy Kelly".
---

When using multiple aggregate functions in PostgreSQL, the set of results is iterated through once.

This is interesting behavior because it means that the order of the aggregated results is preserved across selection clauses. Looking at the output of the script below, we know that the three individuals are "George Martins", "Mary Wong" and "Amy Kelly".

```sql
SELECT
    ARRAY_AGG(first_name) as 'FirstNames',
    ARRAY_AGG(last_name) as 'LastNames'
FROM
    users;

-- output
-- FirstNames | LastNames
-- { 'George', 'Mary', 'Amy' }, { 'Martins', 'Wong', 'Kelly' }
```

Happy Coding 🎉
