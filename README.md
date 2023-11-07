## Overview

This project is bootstrapped with `create-next-app` with Typescript and is using the NextJS app router. The reason I chose to go with NextJS is that I wanted the implementation to simulate a real-world scenario by building an actual backend with tRPC, SQLite (better-sqlite3) and Drizzle ORM, and setting up a serverless backend was easy with Next and it goes exceptionally well with tRPC since both frontend and backend is Typescript. Also, the job description stated that NextJS and tRPC would be something that could potentially be used in the future so I wanted to dig deeper into that.

For the backend I have seeded some actual data to the database to simulate a real use-case **(100 hotels and 100 channels)**.

I also wrote some integration test for the tRPC backend and a couple unit tests for the UI (due to time constraints and little amount of information on how to write unit tests for components that use tRPC I decided to not use any more time on that).

On the UI side we're using tRPC with React-Query integration so that we have access to all the good stuff like server state, caching, refecthing, infinite queries, error states, and so on... The channels list is designed to fetch 10 records at a time and when the user scrolls to the bottom of the list, more 10 more will be fetched at a time. All of these results are cached for 3 minutes (in real-word this would be more or less depending on multiple factors, such as how many people are updating the hotel visibility, etc...).

A couple of UI libraries I chose to install: `react-select` and `react-switch` because building custom dropdowns and toggles and considering all best practices for them in this time-window is not enough. Also the libraries are relative small in bundle size and actively updated so there's that.

See more here: <br />
[https://react-select.com/home](react-select)
<br />
[https://react-switch.netlify.app/](react-switch)

## Getting Started

**First, clone the project:**

```bash
git clone https://github.com/niemax/mp_assignment.git
```

**Navigate to the project folder:**

```bash
cd mp_assignment
```

**Install dependencies:**

```bash
npm i
```

**Run the development server:**

```bash
npm run dev
```

**Testing:**

```bash
npm run test
```

The testing is done with Jest and the integration tests is ran against a separate database dedicated to the test environment.
