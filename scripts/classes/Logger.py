import logging

from decouple import config

LOG_LEVEL = config("LOG_LEVEL", default="ERROR").upper()


class Logger:
    def __init__(self, name, log_file=None):
        numeric_level = getattr(logging, LOG_LEVEL, logging.INFO)

        self.logger = logging.getLogger(name)
        self.logger.setLevel(numeric_level)

        # Create a formatter to define the log message format
        log_format = (
            "[%(asctime)s ON %(filename)s:%(lineno)d] %(levelname)s: %(message)s"
        )
        formatter = logging.Formatter(log_format, datefmt="%H:%M:%S")

        # Create a file handler if a log file is specified
        if log_file:
            file_handler = logging.FileHandler(log_file)
            file_handler.setFormatter(formatter)
            self.logger.addHandler(file_handler)

        # Create a stream handler to log to the console
        stream_handler = logging.StreamHandler()
        stream_handler.setFormatter(formatter)
        self.logger.addHandler(stream_handler)

    def __getattr__(self, name):
        if hasattr(self.logger, name):
            return getattr(self.logger, name)
        raise AttributeError(f"'Logger' object has no attribute '{name}'")
