# Book Search - Documentation

### Problem
- Imagine organization has access to the scanned content to a # of books
- I am being asked to implement the function `findSearchTermInBooks()` that searches for word in scanned book content
- __Objective__: Write JS function with provided findSearchTermBooks() signature
    - function consumes 2 inputs: `@param {string} searchTerm`, `@param {Json}` possessing book phrases
    - function returns `{JSON} object` that has lines containing search word
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

### Restate Problem

### Initial Clarifying Questions
1. first json obj - multiple pieces of scanned text in singular book
-
    ```js
    ...
    'content':[
        {
        'page':12,
        'line': 2,
        'text': 'text12'
        },
        {
        'page':104,
        'line':1,
        'text':'text104'
        }
    ]
    ```
2. second json obj - multiple books in json object
-
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
                }
            ],
        },
        {
            'title': string,
            "isbn" : string,
            "content":[
                {
                "page": int
                "line": int,
                "text": str
                }
            ],
        }
    ]
    ```

### Data Structures to Use
- in solution, using dicts, strings, and integers

### Overall Analysis
- Input: string being the search term, json object with phrases from books
    * json object contains >= 0 book objects
    * each book object contains a list of >= 0 pieces of scanned text
- Output: single json object containing used search term and 0 or + results from search
    * structure
        ```js
        'searchterm': `${searchTerm}`,
        // containing all potential hits and amtches
        'results' : [
            {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 0
            }
        ]
        ```
    * list of results can be empty

- Algo Process
    - Simplified Problem
        * we are provided a json object with book content with isbn, page, line number and we need to search for a provided search term

    - Goal of Function
        * return the matches for a particular search term as a json object given said string and a json object containing books and scanned content taking into consideration case-sensitivity

    - Types: both inputs (1) string and (2) json obj with an output being a json obj

    - Assertions and Assumptions
        * results for string matching are case sensitive
            - 'the' and 'THE' are not equivalent so use `===`
                * `if searchTerm === `
    - Edge Cases
        * words that aren't search term but contain term in it ex. searchTerm of 'the' and string 'then', provided a search term that is empty, an object containing no content, an object containing no books, if user inputs a non string input, if we have an object with multiple books and one of them has no pieces of scanned text e.g. the first book we get to has no scanned text -> navigate to next book (found match for SearchTerm), account for search term that has a hypen like 'dark-', what if a user wants to search for the number of spaces occurring in a solution

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
const searchTerm2 = 'blue'
const scannedTextObj = ...
// result should be
const result2 = {
    'SearchTerm':'blue',
    'Results':[]
}
```

### Other Examples - for tests
```
    * provided a search term that is empty, a search term that is not found in any of the provided information in json object, an object containing no content, an object containing no books, if user inputs a non string input, if scanned book lacks a title or isbn
```

#### _Backside_
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
                    3. iterating for search, just means iterating through the searchTerm and string and checking each matches
                        - but we do have to check for strings that have searchTerm as substring, then != the and should not count,
                            * (simple) do a string.split operation on Text -> supply helper with split string -> -helper- check if string === searchTerm (takes into account case sensitivity) -> if True append this to the results array
        2. as we find matches through search, we need to append the dict(s) of the found searchTerm locations to the results array
            - `results.push()`
            - push in the isbn, page, and line of each found match
        3. then return result

    - Revised Approach



### Preliminary Solution
- __Time Complexity__:

- __Space Complexity__:




#### Additional Details
- Reflecting on Attempt
