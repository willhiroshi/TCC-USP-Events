# Getting started

This folder contains the backend side of the project. It is developed in `python 3.10`.
You can install it and the necessary dependencies running the `initialize` script:

```bash
bash initialize.sh
```

# Update library dependencies

If you used another library on the project, it is needed for you to update the dependencies needed on `requirements` file. Just run the following command on backend's root folder to do this:

```bash
pipreqs . --force
```

# Running the server locally

You can start the server locally by running the following command on the root directory:

```bash
bash runServer.sh <server_port>
```

The server will run on port 9000 by default if you don't provide any `server_port`.

# Scripts

There are several scripts in the `scripts` folder used to populate the database with upcoming events. It is necessary to create a `.env` file in the root folder of the backend for them to work correctly. Use the `.env-sample` file to help you set the necessary environment variables.
