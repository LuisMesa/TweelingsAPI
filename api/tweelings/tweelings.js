const server = require('server');
const { get, post } = server.router;
const { render, json } = server.reply;

function getAll(ctx) {
  const array = [
    {
      tweets: [
        { src: 'https://pbs.twimg.com/profile_images/833525803266740224/rOXaAWPb_normal.jpg', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate'},
        { src: 'https://pbs.twimg.com/profile_images/833525803266740224/rOXaAWPb_normal.jpg', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate'},
        { src: 'https://pbs.twimg.com/profile_images/833525803266740224/rOXaAWPb_normal.jpg', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate'}

      ]
    }
  ]
  return json(array);
}

const thing1 = {
  all: get('/tweelings', getAll)
}

module.exports = thing1;