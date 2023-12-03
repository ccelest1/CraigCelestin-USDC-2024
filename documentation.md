## Overall Process and Decision Making
- first steps were to break down problem based on assessment pdf instructions
    * performed in book_search.md
    * restate problem -> think of any possible questions -> id data structures -> think about assertions and edge cases -> pseudocode -> convert to js code -> walk through with test cases
- understand required tests and potential paths
    * understand that I am required to have three types of tests to confirm that my function is considering all potential inputs, outputs, and constraints: one of the most prominent being capitalization

## Testing and Iteration
### Strategy for Writing Tests
- need to write three kind of tests:
    1. positive (tests return match)
    2. negative (tests don't return matches)
    3. case-sensitive (tests that match for capitalization)

- Testing Strategies
    * Strategy 1
    * Strategy 2

- __Making the Test Suite more Robust__

### Part of Solution I Am Most Proud About

### Most Difficult Part of Problem to Solve

### Edge Cases Addressed
- (thought about how to handle edge case of multiple appearances) Wanted to think about a better way to display if Search Term is found on multiple pages or if there were multiple content lines provided per page
    * so here are the alternative scenarios:
        - search Term is found in same book, on the same page, on several lines
                - the word and is found on page 31, line 12, 13, 14 -> can I do
        ```js
            {
            "ISBN": "9780000528531",
            "Page": 31
            "Line": [12,13,14]
            },
        ```
        - search Term is found on multiple pages on multiple lines
        ```js
        {
            "ISBN": "9780000528531",
            "Page(s)":
                {
                    31:[12,13],
                    32:[11,14]
                }
        },
        ```
