# Rocketclicker

Click to the moon!


![qr code](public/qr.png)


## Administration

**Hosting on render.com is for free, but the server will go to sleep when not used. Waking up takes about a full minute, so plan for that!**

The main page (aka the qr code) points to `/`. It is just the button/ click interface for participants, or, a waiting screen when the game has not started yet.

The page `/game` is game screen, so what needs to be projected and where people should look at while tapping their phones. If the game has not started there is a waiting screen.

The page `/admin` contains a minimal admin interface. You can see if a game is running (then there is info), you can stop it or start it, and you can see the total amount of clicks and the pseudonyms of users.

<img width="918" alt="Screenshot 2024-06-18 at 17 04 31" src="https://github.com/lislis/rocketclicker/assets/1006478/98931bdc-af44-46c1-b636-5898a9bffd14">



## Setup

This is an Express server with a Vue3 frontend.

Start the server with

`$ npm run start`

For local development of the frontend with hotreload `cd frontend` and run

`$ npm run dev`

The deployment assumes the built frontend to be served as static files by Express.

To prepare this build the frontend with `$ npm run build`. I just checked the built files into git for convenience.

If you want to try and separate backend and frontend feel free to mess around with the addresses. No guarantees given.
