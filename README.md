# Rocketclicker

Click to the moon!

**[Anleitung für Technik!](FOH.md)**


![qr code](public/qr.png)


## Administration

**Hosting on render.com is for free, but the server will go to sleep when not used. Waking up takes about a full minute, so plan for that!**

- The main page (aka the qr code) points to `/`. It is just the button/ click interface for participants, or, a waiting screen when the game has not started yet.

- The page `/waiting` is the waiting screen. It will show up if there is no current game. If the game is started from the admin page, it will redirect automatically to `/level/1`.

- The page `/game/<number>` is game screen, so what needs to be projected and where people should look at while tapping their phones. If the game has not started it will redirect to `/waiting`. `<number>` represents the game level. If it is not set, it will redirect to 1. A the end of the level it will redirect to `/level/<number+1>`.

- The level `/level/<number>` pages act as a stop between levels and redirect automatically after a set amount of time. `<number>` represents the game level. If not set it will redirect to 1. A the end of the timer it will redirect to `/game/<number>`.

- The page `/admin` contains a minimal admin interface. You can see if a game is running (then there is info), you can stop it or start it, and you can see the total amount of clicks and the pseudonyms of users.

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

## Assets

`/end` screen uses footage from [Apollo 17 Liftoff](https://www.youtube.com/watch?v=9HQfauGJaTs) and [Crypto to the moon by Leo Moreno](https://www.youtube.com/watch?v=Bke8vvZSEMg)

Other sounds made by Maren <3