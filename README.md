# Quick Start

## Install node

This project uses node version 21.7.3, but is compatible with later versions. Download from [here](https://nodejs.org/en/download)

## Install project depedencies

Run the following command to install project dependencies.

```bash
npm install
# or
yarn install
```

- node comes with npm, but you can also use yarn. Install yarn by running:

```bash
npm install yarn
```

Mac users may encounter error when installing, refer to this [link](https://stackoverflow.com/questions/64562563/how-can-i-ovecome-this-error-in-npm-install) for solution.

## Start Application

### Using Docker

1. Install `Docker` into your system.
2. Run `docker-compose up --build frontend` to run the Django server
3. Application is available at [http://localhost:3000](http://localhost:3000)

### Using npm command

Run the development server with the following command:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
