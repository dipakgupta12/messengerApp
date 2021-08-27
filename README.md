# messengerApp

This is a chatting App.

Here are the following instructions to setup:-

Take clone of the Repo.

# Frontend setup

cd MessengerApp/messenger
yarn install
yarn start

# Backend setup

cd MessengerApp/web-api

change username and password in config/database.yml for database.
rails db:create
rails db:migrate
rails s -p 3002

# Features:-

Signup:- you can signup by filling information like name, image, email and password.
Login:- you can login by filling email and password.
Logout:- you can logout by clicking logout from the Top Right corner.
ChatRooms: This shows list of chatRooms. you can create a chat room onclick of "+" Icon on the top right of chatrooms,
           you'll see a list of users. when you select a user from this list a chatroom
           will be created. And it will appear in the ChatRooms Box/container. Right now
           this only supports "one to one" communication.
           
ChatRoom:  when you click on any chatRoom a room window will be open in the Right.
           In this window you can type and send any message. This is only suuports text.
           You can close this window by click on "X" icon.
           Maximum three windows can be opened at the time when tried to open more than three,
           it will replace the recent one.
