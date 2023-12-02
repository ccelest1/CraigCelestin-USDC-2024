# Book Search - Documentation

### Problem
- Imagine organization has access to the scanned content to a # of books
- I am being asked to implement the function `findSearchTermInBooks()` that searches for word in scanned book content
- __Objective__: Write JS function with provided findSearchTermBooks() signature
    - function consumes 2 inputs: `@param {string} searchTerm`, `@param {Json}` possessing book phrases
        - returns `{JSON} object` that has lines containing search word
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
1. there can be a json object based on suggestion:
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
2. json object based on suggestion
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
        'searchterm': `${searchTerm}`
        'results' : ... {isbn, page, line}
        ```
    * list of results can be empty

- Algo Process
    - Simplified Problem

    - Goal of Function

    - Types: both inputs (1) string and (2) json obj with an output being a json obj

    - Assertions and Assumptions
        * results for string matching are case sensitive
            - 'the' and 'THE' are not equivalent so use `===`
    - Edge Cases

#### Example \#1
```

```

#### Example \#2
```

```
#### Example \#3 & \#4
```

```

#### Constraints


### Preliminary Solution
- __Time Complexity__:

- __Space Complexity__:

#### _Backside_
- My initial solution would involve:


#### Additional Details
- Reflecting on Attempt
