/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * further hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and
     * return the appropriate object here. */

    var result = {
        "SearchTerm": `${searchTerm}`,
        "Results": []
    };
    const ObjectLength = scannedTextObj.length;

    //check if provided no scannedTextObj
    if (!scannedTextObj) {
        return result;
    }

    // implement search helper function with defined types
    // using two pointers allows for a quicker search
    /**
     *
     * @param {string} term
     * @param {string} line
     * @returns {boolean}
     */
    const search = (term, line_txt) => {
        let [l, r] = [0, line_txt.length];
        while (l <= r) {
            // accounted for case sensitivity with triple === boolean
            if (line_txt[l] === term || line_txt[r] === term) {
                return true;
            }
            l++;
            r--;
        }
        return false;
    }
    const checkContent = (content_isbn, book_content, term_to_search) => {
        const ContentLength = book_content.length;
        let ContentPointer = 0;
        // iterate through provided scanned content
        while (ContentPointer < ContentLength) {
            // understanding that we have a dictionary structure and w want to make sure that the scanned content is valid
            const ContentDict = book_content[ContentPointer]
            if (!ContentDict['Page'] || !ContentDict['Line'] || !ContentDict['Text']) {
                ContentPointer += 1
            } else {
                const ContentPage = ContentDict['Page'];
                const ContentLine = ContentDict['Line'];
                const LineText = ContentDict['Text'].split(" ");
                let stripped = [];
                // account for words with hyphens like dark-
                // regex expression using replace and g (global) flag
                for (let i of LineText) {
                    i = i.replace(/-/g, "")
                    stripped.push(i);
                }
                if (search(term_to_search, stripped)) {
                    result['Results'].push(
                        {
                            "ISBN": content_isbn,
                            "Page": ContentPage,
                            "Line": ContentLine
                        }
                    );
                }
                ContentPointer += 1;
            }
        }
    }
    let BookPointer = 0;
    if (ObjectLength == 1) {
        const Book = scannedTextObj[BookPointer];
        if (Book) {
            // not a valid book
            if (!Book['Title'] || !Book['ISBN'] || !Book['Content']) {
                return result;
            } else {
                const BookISBN = Book['ISBN']
                const BookContent = Book['Content'];
                // check if 0 pieces of scanned text: if there is 0 pieces and object only has 1 book, we know there can be no matches
                if (!BookContent) {
                    return result;
                } else {
                    checkContent(BookISBN, BookContent, searchTerm);
                }
            }

        }
        // if the object has a length of 1 with no actual book i.e empty brackets there can be no match for a searchTerm
        if (!Book) {
            return result;
        }
    }
    if (ObjectLength > 1) {
        while (BookPointer < ObjectLength) {
            const Book = scannedTextObj[BookPointer];
            // skip if not a valid book instance, i.e. corrupted book that is missing essential information
            if (!Book['Title'] || !Book['ISBN'] || !Book['Content']) {
                BookPointer += 1;
            } else {
                const BookISBN = Book['ISBN'];
                let contentPointer = 0;
                const BookContent = Book['Content'];
                // checking if content exists i.e. not an empty book
                if (BookContent) {
                    const BookContentLength = BookContent.length;
                    const currentContent = BookContent[contentPointer];
                    // checking if theres no empty content
                    if (currentContent) {
                        while (contentPointer < BookContentLength) {
                            checkContent(BookISBN, BookContent, searchTerm);
                            // increment as we have checked current content
                            contentPointer += 1;
                        }
                    } else {
                        // skip if we find empty content array
                        contentPointer += 1;
                    }
                }
                // skip if there is no content
                BookPointer += 1;
            }
        }
    }
    return result;
}

/** Example input object. */
const twentyLeaguesIn = [
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

/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___|
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/

 */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/**
 * Positive Test
 */
const test3Assert = {
    "SearchTerm": "and",
    "Results": [
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
}

const test3a_result = findSearchTermInBooks('and', twentyLeaguesIn);
if (JSON.stringify(test3Assert) === JSON.stringify(test3a_result)) {
    console.log("PASS: Test 3a");
} else {
    console.log('FAIL: Test 3a');
    console.log("Expected:", test3Assert);
    console.log("Received:", test3a_result);
}

const test3b_result = findSearchTermInBooks("and", twentyLeaguesIn);
if (test3b_result.Results.length == 2) {
    console.log("PASS: Test 3b");
} else {
    console.log("FAIL: Test 3b");
    console.log("Expected:", test3Assert.Results.length);
    console.log("Received:", test3b_result.Results.length);
}

/**
 * Negative Test
 */

const test4Assert = {
    "SearchTerm": "blue",
    "Results": []
}

const test4a_result = findSearchTermInBooks('blue', twentyLeaguesIn);
if (JSON.stringify(test4Assert) === JSON.stringify(test4a_result)) {
    console.log('PASS: Test 4a');
} else {
    console.log('FAIL: Test 4a');
    console.log('Expected:', test4Assert);
    console.log('Received:', test4a_result);
}

const test4b_result = findSearchTermInBooks('blue', twentyLeaguesIn);
if (test4b_result.Results.length == 0) {
    console.log("PASS: Test 4b");
} else {
    console.log("FAIL: Test 4b");
    console.log("Expected:", test4Assert.Results.length);
    console.log("Received:", test4b_result.Results.length);
}

/**
 * Case-sensitive Test
 */
const test5Assert = {
    'SearchTerm': 'The',
    'Results': [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

const test5a_result = findSearchTermInBooks('The', twentyLeaguesIn);
if (JSON.stringify(test5Assert) === JSON.stringify(test5a_result)) {
    console.log('PASS: Test 5a');
} else {
    console.log('FAIL: Test 5a');
    console.log('Expected:', test5Assert);
    console.log('Received:', test5a_result);
}

const test5b_result = findSearchTermInBooks('The', twentyLeaguesIn);
if (test5b_result.Results.length == 1) {
    console.log("PASS: Test 5b");
} else {
    console.log("FAIL: Test 5b");
    console.log("Expected:", test5Assert.Results.length);
    console.log("Received:", test5b_result.Results.length);
}

/**
 * noBooks search
 */
const noBooks = []
const testAssertNoBooks = {
    'SearchTerm': 'find',
    'Results': []
}

const testnoBooksA = findSearchTermInBooks('find', noBooks);
if (JSON.stringify(testAssertNoBooks) === JSON.stringify(testnoBooksA)) {
    console.log('PASS: Test No Books A');
} else {
    console.log('FAIL: Test No Books A');
    console.log('Expected:', testAssertNoBooks);
    console.log('Received:', testnoBooksA);
}
const testnoBooksB_result = findSearchTermInBooks('find', noBooks);
if (testnoBooksA.Results.length == 0) {
    console.log("PASS: Test No Books B");
} else {
    console.log("FAIL: Test No Books B");
    console.log("Expected:", testAssertNoBooks.Results.length);
    console.log("Received:", testnoBooksB_result.Results.length);
}

const OneBookNoContent = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": []
    },
    {
        "Title": "Harry Potter",
        "ISBN": "3200040385312",
        "Content": [
            {
                "Page": 1400,
                "Line": 105,
                "Text": "I found the snitch !"
            },
        ]
    }
]

const testAssertOneBookNoContent = {
    'SearchTerm': 'snitch',
    'Results': [
        { 'ISBN': '3200040385312', 'Page': 1400, 'Line': 105 }
    ]
}

const testOneBookNoContent_A = findSearchTermInBooks('snitch', OneBookNoContent);
if (JSON.stringify(testAssertOneBookNoContent) === JSON.stringify(testOneBookNoContent_A)) {
    console.log('PASS: Test OneBookNoScan A');
} else {
    console.log('FAIL: Test OneBookNoScan A');
    console.log('Expected:', testAssertOneBookNoContent);
    console.log('Received:', testOneBookNoContent_A);
}
const testOneBookNoContent_B = findSearchTermInBooks('find', noBooks);
if (testOneBookNoContent_B.Results.length == 0) {
    console.log("PASS: Test OneBookNoScan B");
} else {
    console.log("FAIL: Test OneBookNoScan B");
    console.log("Expected:", testAssertOneBookNoContent.Results.length);
    console.log("Received:", testOneBookNoContent_B.Results.length);
}


/**
 * testing for searchTerm found in multiple books
 */
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

const testAssertMultiple = {
    'SearchTerm': 'dark',
    'Results': [
        { 'ISBN': '9780000528531', 'Page': 31, 'Line': 8 },
        { 'ISBN': '3200040385312', 'Page': 200, 'Line': 15 }
    ]
}

const test6a_result = findSearchTermInBooks('dark', multipleBooks);
if (JSON.stringify(testAssertMultiple) === JSON.stringify(test6a_result)) {
    console.log('PASS: Test 6a');
} else {
    console.log('FAIL: Test 6a');
    console.log('Expected:', testAssertMultiple);
    console.log('Received:', test6a_result);
}

const test6b_result = findSearchTermInBooks('dark', multipleBooks);
if (test6b_result.Results.length == 2) {
    console.log("PASS: Test 6b");
} else {
    console.log("FAIL: Test 6b");
    console.log("Expected:", testAssertMultiple.Results.length);
    console.log("Received:", test6b_result.Results.length);
}


/*
testing for multiple books, but one empty bracket where book would go
*/
const multipleBooks2 = [
    {

    },
    {
        "Title": "The Incredibles",
        "ISBN": "132000323232",
        "Content": [
            {
                "Page": 104,
                "Line": 26,
                "Text": "stop it elastigirl"
            },
        ]
    }
]

const test7Assert = {
    'SearchTerm': 'elastigirl',
    'Results': [
        { 'ISBN': '132000323232', 'Page': 104, 'Line': 26 }
    ]
}


const test7a_result = findSearchTermInBooks('elastigirl', multipleBooks2);
if (JSON.stringify(test7Assert) === JSON.stringify(test7a_result)) {
    console.log('PASS: Test 7a');
} else {
    console.log('FAIL: Test 7a');
    console.log('Expected:', test7Assert);
    console.log('Received:', test7a_result);
}
const test7b_result = findSearchTermInBooks('elastigirl', multipleBooks2);
if (test7b_result.Results.length == 1) {
    console.log("PASS: Test 7b");
} else {
    console.log("FAIL: Test 7b");
    console.log("Expected:", test7Assert.Results.length);
    console.log("Received:", test7b_result.Results.length);
}
