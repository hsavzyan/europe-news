# Europe News

Europe News is a web application that fetches and displays news articles from the Guardian API. The news articles are specifically focused on Europe.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

This project uses [Yarn](https://yarnpkg.com/) as the package manager. You can check your current version with `yarn --version`.

To install the project:

1. Clone the repository:
```bash
git clone https://github.com/hsavzyan/europe-news.git
```

2. Install the dependencies:
```bash
cd europe-news
yarn install
```
Usage
-----

To start the development server:
```bash
yarn start
```
Project Structure
-----------------

The project's structure is as follows:

-   `src/`: This directory contains all the source code for the React application.
    -   `App.jsx`: This is the main component of the application. It fetches the news data from the Guardian API and manages the application state.
    -   `Article.jsx`: This component displays a full news article.
    -   `Header.jsx`: This component displays the header of the application.
    -   `NewsCard.jsx`: This component displays a brief overview of a news article.
    -   `main.jsx`: This is the entry point of the application.
    -   `assets/`: This directory contains any static assets used in the application.
    -   `*.css`: These files are the stylesheets for their respective components.

Contributing
------------

Contributions are welcome! Please feel free to submit a Pull Request.

License
-------

This project is licensed under the terms of the MIT license.

