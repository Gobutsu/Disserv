# Disserv

Disserv is a node tool that allows you to (try to) identify a discord server ID.

## ✨ Features
- Lookup the server on multiple servers lists
- Uses some bots internal API to either:
    - Tell if the bot is on the server (to confirm that the server exists)
    - Give direct information about the server
- Gives the server creation date
- Checks the existence of a widget

## 📦 Installation
To install and use Disserv, first clone the repository from GitHub:

`git clone https://github.com/Nenaff/Disserv.git`

Then navigate to the directory and run the following command to install the required dependencies:

`npm install`

## ⚙️ Usage
To use Disserv, run the following command:

    node disserv.js -id [Discord Server ID]

## ➕ Some other things you can do if you get no results
- Lookup the server ID on Google.
- If the server is a community one, you might find it on https://discordlookup.com/guild

## 🧍 What if I want to identify a user ID ?
No need to scrape anything, the Discord API allows you to do that. You can use https://discord.id/.