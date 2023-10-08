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

# Creating a new app

If you would like to create a new app, just run the following command on the root directory:

```bash
python3.10 manage.py startapp <app_name> apps/<app_name>
```

You may need to modify the `INSTALLED_APPS` variable on `api/settings.py` file to include the new app, and also change the apps' name on `apps/<app_name>/apps.py` file.