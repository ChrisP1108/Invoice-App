# Frontend Mentor - Invoice app solution

This is a solution to the [Invoice app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

### Screenshot

![]!(./screenshot.png "Invoice-App")

### Links

- Solution URL: https://www.frontendmentor.io/solutions/react-js-sass-hooksforredux-3wkJ36EC0#feedback
- Live Site URL: https://chrisp1108.github.io/Invoice-App/

## My process

### Built with

- React JS
- SASS
- Flexbox
- CSS Grid
- JSON Server
- Hooks For Redux


### What I learned

To develop this app, I utilized ReactJS Framework.  Along with utilizing React, I utilized a few Node packages to better manage things.

The most important package I utilized was hooks-for-redux.  This was substantially beneficial in managing state between components and
eliminated the need to be passing props around.  This particular form of redux made the entire process much easier to use with much less code than the other redux methods out there.  
Hooks for redux allowed me to manage HTTP requests to the JSON server.  I could update state within the redux store after an HTTP 
request got resolved to ensure that changes made in the UI were actually saved to the JSON server.  The redux reducers called would call a function
within the redux store, and if resolved, called another reducer to update the state.

Here's a link for more information on hooks-for-redux: https://www.npmjs.com/package/hooks-for-redux

Utilizing async / await functions, I managed the HTTP requests, along with having .then and .catch to resolve promises or catch errors.

This project was quite heavy on styling given it has a day and night mode theme colors.  The two modes would be triggered by state variable
being toggled between true / false and having a ternary operator to change the style accordingly in the main div container in the app.js file.

Some accomplishments that I'm proud of is all the modals I custom made myself, in particular the calendar modal.  The designs showed 5 rows, 
however I made 6 rows for date numbers as numbers were being pushed to a sixth row if the starting date of the month fell on a Friday or Saturday.
This required heavy use of the Javascript New Date function to output the correct numbers along with utilizing CSS flexbox and CSS grid to 
align the numbers accordingly.

I was quite thorough in matching the styling and setting all margins, paddings as precise as I could to the Figma graphic designs.  I utilized 
SASS for the styling which became quite essential to have with all the styling changes and all.

The biggest challenge I ran into was in the item list.  I struggled with an issue of item ids being duplicated which resulted in the fields of
two items changing simultaneously when typing.  It seemed to do this whenever a third item would be added to the list.  My end solution was
to only allow two items to be added to an invoice.  Not the most ideal, but it helps avoid the duplicate glitch from occuring.

If anyone can figure out how to resolve the issue I described with the items list, I'm all ears.

Since I mentioned HTTP requests, this app is built as a full stack app.  If you want to see it completely in action, you can run a JSON server
with a db.json file.

This project was quite challenging and time consuming, but I feel proud for having accomplishing it.  I've learned a lot from working on this
project, in particular my Javascript skills.

## Author

- Name - Chris Paschall
- Website - https://www.linkedin.com/in/christopher-paschall/
- Frontend Mentor - https://www.frontendmentor.io/profile/ChrisP1108
