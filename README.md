# API (ExpressJS)

```bash
$ cd api
```

## 1. Install Dependencies

```bash
$ yarn
```

## 2. Configure the Env vars

Copy the `.env.example` and create your `.env` file:
```bash
cp .env.example .env
```

Then, fill the connection string for your database:
```
DATABASE_URL="postgres://<user>:<password>@<host>:<port>/<database>"
```

## 3.1. (JS) Build & Run

```bash
$ yarn build
$ yarn run-js
```

## 3.2. (TS) Run

```bash
$ yarn run-ts
```

# App (React)

```bash
$ cd app
```

## 1. Install Dependencies

```bash
$ yarn
```

## 2. Configure the Env vars

Copy the `.env.example` and create your `.env` file:
```bash
cp .env.example .env
```

Then, set your API URL:
```
REACT_APP_API_URL='http://localhost:3002'
```

## 3. Run app

```bash
$ yarn start
```

## 4. (Optional) Build App

```bash
$ yarn build
```
