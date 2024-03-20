
// "snippet(s)" is how each user will contribute to a story,
// they will need to connected with a unique ID to both the user (userPostID?) 
// and the story (storyID) that they're apart of so that a user has a record of 
// their own individual posts (sort of like twitters 'reply' section)

// Each snippet needs to be numbered (snippetNumber), for correct arrangement in stories
// and also to make sure that snippets are not going over a set limit 
// (each story will have limit to the amount of snippets it contains)

// the value of the die (dieValue) and the criteria that the value has triggered 
// on that particular turn  (dieResult {linked to resultText}) 
// (user's will roll individually for each turn the result will only effect them)

// user response (userResponse) and the time it was posted (timePosted)

// story ID so that snippets are connected to the same story (snippetStoryID) + users
// can all contribute to the same 'post'(Story)

// the turn number which will be important because this will be a turn based
// social media app/game (turnNumber) - the turn number will be determined by a die roll
// at the start of a new story, the turns will be determined by the value of the die - highest first.
// the turn number for each snippet and user will be set from the initial roll

let userSnippet = {

    user: userID, // the users ID (string)
    snippetNumber: 0, // snippet number so that snippets can be organised also could be some sort of tally (number)
    snippetStoryID: storyID, // a unique identifier to group stories together (string)
    userTurn: 0, // 
    dieValue: 0, // value of the die (number)
    dieResult: resultText, // the criteria that needs to be followed based on the die roll (text)
    userResponse: snippet, // text
    timePosted: Date.now(), // time posted

    // breathing space

    comments: [

        {
            comment: message, //text
            commentBy: userID, //number or login name
            date: Date.now(), //date
            likes: 0 //count
        }, {
            comment: message, //text
            commentBy: userID, //number or login name
            date: Date.now(), //date
            likes: 0 //count
        }
    ]
}
