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
    const ObjectLength = scannedTextObj.length
    //check if 0 book objects
    if (ObjectLength === 0) {
        return result
    }
    // implement search helper function with defined types
    // using two pointers allows for a binary string search of O(n log n)
    /**
     *
     * @param {string} term
     * @param {string} line
     * @returns {boolean}
     */
    const search = (term, line_txt) => {
        let [l, r] = [0, line_txt.length]
        while (l < r) {
            if (line_txt[l] === term || line_txt[r] === term) {
                return true
            }
            l++
            r--
        }
        return false
    }
    let ObjectPointer = 0
    while (ObjectPointer < ObjectLength) {
        if (ObjectLength == 1) {
            // check if 0 pieces of scanned text: if there is 0 pieces and object only has 1 book, we know there can be no matches
            const ObjectContent = scannedTextObj[ObjectPointer]['Content']
            if (!ObjectContent) {
                return result
            } else {
                const ContentLength = ObjectContent.length
                let ContentPointer = 0
                // iterate through provided scanned content
                while (ContentPointer < ContentLength) {
                    const ContentISBN = scannedTextObj[ObjectPointer]['ISBN']
                    const ContentPage = ObjectContent[ContentPointer]['Page']
                    const ContentLine = ObjectContent[ContentPointer]['Line']
                    const LineText = ObjectContent[ContentPointer]['Text'].split(" ")
                    if (search(searchTerm, LineText)) {
                        result['Results'].push(
                            {
                                "ISBN": ContentISBN,
                                "Page": ContentPage,
                                "Line": ContentLine
                            }
                        )
                    }
                    ContentPointer += 1
                }
            }
        }
        if (ObjectLength > 1) {
            // for objects with more than 1 books
            /*
                if we get to a book that has no content, we need to increment pointer or this can be performed recursively
                or have 1 function that we call separately for content and one called for books
            */
        }
        ObjectPointer += 1
    }
    // for (let i of scannedTextObj) {
    //     console.log(i['Title'])
    //     console.log(i['ISBN'])
    //     console.log(i['Content'])
    // }
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
