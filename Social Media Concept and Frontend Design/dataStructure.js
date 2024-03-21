// Stories will be a compilationg of snippets (userSnippets)
// userSnippet has (snippetStoryID: storyID) not entirely sure if that makes sense yet but feel it's important
// Stories need to be linked to the snippet ID's to group them all correctly 
// each story needs a unique ID
// An array containing each of the snippets that have been added to it

let story = {

    // ID's and Keys
    storyID: '', // string?
    snippetGroup: snippetID, 

    // Name 
    storyName: '', // title of the story

    // Story Contents 
    compiledStory: [
        
        {userResponse, snippetID, userID, timePosted, snippetNumber}, 
        {userResponse, snippetID, userID, timePosted, snippetNumber} 
    
    ], // an array containing the user responses and some extra info to differentiate each users snippet


    // breathing space
}

// "snippet(s)" is how each user will contribute to a story,
// they will need to connected with a unique ID to both the user (userPostID?) 
// and the story (storyID) that they're apart of so that a user has a record of 
// their own individual posts (sort of like twitters 'reply' section) DONE

// Each snippet needs to be numbered (snippetNumber), for correct arrangement in stories
// and also to make sure that snippets are not going over a set limit 
// (each story will have limit to the amount of snippets it contains) DONE

// the value of the die (dieValue) and the criteria that the value has triggered 
// on that particular turn  (dieResult {linked to resultText}) 
// (user's will roll individually for each turn the result will only effect them) DONE
// user response (userResponse) and the time it was posted (timePosted)

// story ID so that snippets are connected to the same story (snippetStoryID) + users
// can all contribute to the same 'post'(Story) DONE

// the turn number which will be important because this will be a turn based
// social media app/game (turnNumber) - the turn number will be determined by a die roll
// at the start of a new story, the turns will be determined by the value of the die - highest first.
// the turn number for each snippet and user will be set from the initial roll DONE

let userSnippet = {

    // ID's and Keys
    user: userID, // the users ID (string)
    snippetStoryID: storyID, // a unique identifier to group stories together (string)
    snippetID: 0, //unique snippet ID

    // Numbers & Turns 
    snippetNumber: 0, // snippet number so that snippets can be organised also could be some sort of tally (number)
    turnNumber: 0, // the users turn

    // die value and results
    dieValue: 0, // value of the die (number)
    dieResult: resultText, // the criteria that needs to be followed based on the die roll (text)

    // users response
    userResponse: snippet, // text
    timePosted: Date.now(), // time posted

    // breathing space
}
