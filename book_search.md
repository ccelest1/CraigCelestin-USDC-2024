# Book Search - Documentation

### Problem
- Imagine organization has access to the scanned content to a # of books
- I am being asked to implement the function `findSearchTermInBooks()` that searches for word in scanned book content
- __Objective__: Write JS function with provided findSearchTermBooks() signature
    - function consumes 2 inputs: `@param {string} searchTerm` as the term, `@param {Json} scannedTextObj` as possessing book content and info
    - function returns `{JSON} object` that has lines containing search word in ['Content']['Text']
        * `findSearchTermInBooks(searchTerm: str, scannedTextObj: json) -> json:`

- input object: scannedTextObj
    * if default json object, use json.parse() (performs json -> js obj) and vice versa (js obj -> json) with json.stringify()
    *
    ```js
    [
        {
            "title" : string,
            "isbn" : string,
            "content":[
                {
                "page": int
                "line": int,
                "text": str
                }  (1) [ zero or more... ]
            ],
        }, (2) [ zero or more... ]
    ]
    ```
    - provided are two indicated instances of there being 0 or more objects
    - suggested is that there can be a list with 0 books, list with books that have no scanned content
    - other possible scenarios: object with a book that has multiple scanned content, objects with several books containing varying content
    - output can have empty results array if no matches are found
    *
    ```js
        'searchterm': `${searchTerm}`,
        // containing all potential hits
        'results' : [ha
            {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 0
            }, (3) [ zero or more... ]
        ]
     ```


### Restate Problem
- Given two inputs: (1) scanned object that contains 0 or more books with 0 or more content and (2) a searchTerm, return the matches of said string occurring in content with a predefined format
    * the format includes a dict with the SearchTerm and Results key-value pairs
        - the search term being the SearchTerm's value
        - a dict containing the isbn of the book, page numbers, and line numbers of where said matches occur in the array for the results value

### Data Structures to Use
- in solution, using dicts, strings, arrays, and integers

### Initial Clarifying Questions
- regarding the search itself
    1. do we care about case sensitivity?
        - does 'the' and 'The' count as equivalent
    2. do we care/how do we account for non alpha-numerical characters?
        -  books with lines that contain hyphens or non-alpha numeric
            * so theres a particular test case where: if a person wants to search for: searchTerm! or searchTerm
                - If they want exclusively searchTerm and instances of searchTerm! don't count or they want all mentions of searchTerm and instances of searchTerm! count it becomes tricky as to whether we should be non-alpha num agnostic or not
    3. do we account for corruption or incomplete objects i.e either of inputs missing key-value pairs or values how do we optimize for missing content?
    4. as its a scanning system, what if we encounter information that is nonsensical?

### Overall Analysis
- Algo Process

    - Goal of Function
        * return the matches for a particular search term as a json object given said string and a json object containing books and scanned content taking into consideration case-sensitivity

    - Assertions and Assumptions
        * results for string matching are case sensitive, alpha-num agnostic
            - 'the' and 'THE' are not equivalent so use `===`
                * `if searchTerm === `
    - Edge Cases
        * words that aren't search term but contain term in it ex. searchTerm of 'the' and string 'then', provided a search term that is empty, an object containing no content, an object containing no books, if user inputs a non string input, if we have an object with multiple books and one of them has no pieces of scanned text e.g. the first book we get to has no scanned text -> navigate to next book (found match for SearchTerm), account for search term that has a hypen like 'dark-', what if a user wants to search for the number of spaces occurring in a solution

### Pseudcode
- My initial solution would involve:
    * in order to find matches for a search time in lines of content given a provided book object we need to:
        1. given a provided search term, search through the provided `scannedTextObj`
            * (test for edge case) object can have 0 or more books, test if there are 0, if there are 0 we can return result as we wont find term
            * if there is 1 or >1:
                * (test for edge case) book can have 0 or more content, test if there is 0 content, we can break out and check next book if there is a nextBook (
                    1. first case is if there is only 1 book and it has no content
                        - if ObjLength==1
                            - if !scannedTextObj[pointer]['content']:    return results
                    2. second case if there is more than 1 book and if the first or one of the books has no content
                        - if !scannedTextObj[pointer]['content'] -> go to nextbook (pointer+=1)
                        )
                * now we know that we are currently at found content for a provided book with an object that we know has at least 1 book
                    2. now we need to check the 'text' in 'content'
                        - we need to implement a string search algorithm, we can only consider matches for the searchTerm that have this exact string while taking into account case sensitivity
                            * checking for case sensitivity, just requires `====`
                    3. iterating for search, just means iterating through the searchTerm and string and checking and appending matches
                        - but we do have to check for strings that have searchTerm as substring, then != the and should not count,
                            * (simple) do a string.split operation on Text -> supply helper with split string -> -helper- check if string === searchTerm (takes into account case sensitivity) -> if True append this to the results array
        2. as we find matches through search, we need to append the dict(s) of the found searchTerm locations to the results array
            - `results.push()`
            - push in the isbn, page, and line of each found match
        3. then return result

    - Revised Approach
        * the approaches both implemented and theoretical include:
            1. [Actual] use two helper functions and ask if we have an object with only 1 book or several
            2. [stack] I believe we can have a better approach using a stack in order to have far more search granularity and implement a better search algorithm like knuth-morris-pratt or boyer-moore that uses suffixes and prefixes
            3. [recursive] iterate through provided solution object and append to a list only if we find content -> (0) [base case: if array has no more content] (1) use .pop() to remove results in both cases: no match or match for searchTerm using more adv search algo (knuth-morris or stack) -> (2) recursiveCall(array) -> (0)


### Examples for Tests
#### Example \#1
```js
// Positive Test
const searchTerm1 = 'and'
const scannedTextObj = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            }
        ]
    }
]
// result should be
const result1 = {
    'SearchTerm':'and',
    'Results':[
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line":[9,10]
        }
    ]
    /*
    or
    Results : [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        }
    ]
    */
}
```

#### Example \#2
```js
// Negative Test
const searchTerm2 = 'blue'
const scannedTextObj = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            }
        ]
    }
]
// result should be
const result2 = {
    'SearchTerm':'blue',
    'Results':[]
}
```

#### Example \#3
```js
// Case-sensitive test
const searchTerm3 = 'The'
const scannedTextObj = ...
const result3 = {
    'SearchTerm':'The',
    'Results':[
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}
```

#### Example \#4 - multiple books
```js
const searchTerm2 = 'and'
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
    },
    {
        "Title": "Catcher in the Rye",
        "ISBN": "3200040385312",
        "Content": [
            {
                "Page": 200,
                "Line": 15,
                "Text": "the ocean was dark"
            },
        ]
    }
]
// result should be
const result2 = {
    'SearchTerm': 'dark',
    'Results': [
        { 'ISBN': '9780000528531', 'Page': 31, 'Line': 8 },
        { 'ISBN': '3200040385312', 'Page': 200, 'Line': 15 }
    ]
}
```

### Other Examples - for tests
```
    * provided a search term that is empty, a search term that is not found in any of the provided information in json object, an object containing no content, an object containing no books, if user inputs a non string input, if scanned book lacks a title or isbn
```

### Preliminary Solution
- __Time Complexity__: O(n*m), where n is the number of books in scannedTextObj and m is the length of the text, meaning that the number of operations is constrained/determined heavily by the multiplicative product of both inputs i.e. if we provide an object with tons of books that have long lines of content we will have several compute operations

- __Space Complexity__: O(1), we are using operations that all involve constant time as they are bounded by previously defined inputs


#### Additional Details
- Reflecting on Attempt
    * its ok
