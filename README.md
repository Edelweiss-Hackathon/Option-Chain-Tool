# Stock Option Chain

Our Stock Option Chain webpage is a realtime and responsive webpage that displays the Options prices of CALL and PUT for several Strike Prices and calculates the IV and Expiration time as well for the same. The data received after execution of JAR file is received via socket programming and then processed upon further by the backend and then relayed to the frontend over realtime.

![Logo](https://github.com/Edelweiss-Hackathon/Option-Chain-Tool/blob/master/resources/logo.png)

## Features

- Interactive and Clean User Interface
- Realtime updates without manual reload
- Minimal latency between data reception and relaying
- Highlighting of In the money and Out of the money options

## Tech Stack

**Client:** React, HTML, CSS

**Server:** Node, Express

## Run Locally

Clone the project

```bash
  git clone https://github.com/Edelweiss-Hackathon/Option-Chain-Tool.git
```

Go to the backend directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Go to the frontend directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Run the JAR file

```bash
  cd ../resources
```

Unzip database.zip file before running the following command

```bash
  java -Ddebug=true -Dspeed=2.0 -classpath feed-play-1.0.jar hackathon.player.Main dataset.csv 9011
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Authors

- [@Aryan Parekh](https://github.com/Aryan-29)
- [@Bhavya Sura](https://github.com/Baboon12)
- [@Hardik Panchal](https://github.com/Hardik-90)
- [@Krish Panchal](https://github.com/Krishpanchal)
- [@Manav Rupani](https://github.com/ManavStud)


## Feedback

If you have any feedback, please reach out to us at aryan.parekh@somaiya.edu

## Screenshots

![Screen](https://github.com/Edelweiss-Hackathon/Option-Chain-Tool/blob/master/resources/Screen1.PNG)
## Demo

Link for Demo Video
[https://youtu.be/qFvGj-SQR6Y]
