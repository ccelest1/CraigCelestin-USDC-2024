## Overall Process and Decision Making
- first steps were to break down problem based on assessment pdf instructions
    * performed in book_search.md
    * restate problem -> think of any possible questions -> id data structures -> think about assertions and edge cases -> pseudocode -> convert to js code -> walk through with test cases
- understand required tests and potential paths
    * understand that I am required to have three types of tests to confirm that my function is considering all potential inputs, outputs, and constraints: one of the most prominent being capitalization

## Testing and Iteration
### Strategy for Writing Tests
- wrote three types of tests
    1. positive (tests return match)
    2. negative (tests don't return matches)
    3. case-sensitive (tests that match for capitalization)

- Testing Strategies
    * Strategy 1
    ```js
    // pass first two provided tests using the search term 'the' and provided scanned Object content (that we get back the expected result and that we get back a Results array that has the expected length) - i made sure to follow this approach for my other tests
    /*
        then i provided my own tests

        the first being positive (test that would return a match)
        I knew 'and' was present in two strings and it would be a extended testing of detecting strings for positive match
        I should get a return that has two dicts in the results array

        the second being a negative (test that shouldn't return matches)
        I knew blue wan't present in any of the strings

        the second is a case sensitive (test that matches for 'The' and not 'the')
        I know that 'The' should only return, based on the input, page 31-line 8 and not page 31-line 9
        I passed this test as well
    */
    ```

    * Strategy 2
    ```js
    // list containing no books [x]
    // list with one book and no scanned content [x]
    // search term found on text in same book
    // in one book, search term is found multiple lines in text
    // multiple books where the search term is found once on multiple lines
    // multiple books but one empty bracket where a book would theoretically go
    // multiple books with one book containing empty content
    // search term found on text multiple times in same book among multiple books
    // corrupted scanned books
        // do we account or not account for text matches in books that are missing some key-value pairs ? I figured that if we are missing any of these then we shouldn't return them as they aren't considered valid books
        // one book missing isbn
        // one book missing content
        // one book missing title
        // one book missing page
        // one book missing line
        // one book missing text
    /*
        books with lines that contain hyphens or non-alpha numeric
        so theres a particular test case where
        if a person wants to search for: searchTerm! or searchTerm
        If they want exclusively, searchTerm and instances of searchTerm! don't count or they want exclusively searchTerm! and instances of searchTerm don't count it becomes tricky

        for this particular implementation

        I believe a theoretical solution would be to have a stack implementation
        where we pop elements from a stack when we find the first character of search term
            - hypothetical scenarios
                * we encounter a string that has that term as a substring, we want to ask are there character(s) preceding the first char in the searchTerm or character(s) succeeding the last char in searchTerm
                    - we want to ignore matches of the searchTerm as a substring
                * if we encounter multiple instances of searchTerm, then we want to keep regenerating that stack e.g. we are searching for 'it' and we have a sentence 'it was here, it was there' -> we will pop the stack for the first 'it' and if we haven't cleared the string, regenerate the stack and pop for the second instance of 'it' and thus we have two instances of it being found
    */
    /*
        other edge cases - we can think of scenarios that when processing scanned information, the information doesn't get scanned properly or our system doesn't ingest the content in a good format

        that could mean that content is missing either one or all of, 'Page', 'Line', 'Text' or for the book we are missing one or all of 'Title', 'ISBN', or 'Content'

        or for the value pairs themselves they are being scanned improperly and have missing values or errors in text, in a really extended and technical solution we can check to see if the values make sense i.e do the pages and lines make sense in regards to the book found in an online db and does the text make grammatical and structural sense (are there words that don't make sense)
    */
    //
    const multipleBooks = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
        ]
    }
    {
        "Title": "Catcher in the Rye",
        "ISBN": "320004038531",
        "Content": [
            {
                "Page": 200,
                "Line": 15,
                "Text": "the ocean was dark"
            },
        ]
    }
    ]
    ```

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
