FROM postgres
# Install the docker vs code plugin


# below you can refer to the documentation https://hub.docker.com/_/postgres/ to understand the env variables.
ENV POSTGRES_PASSWORD fact123
ENV POSTGRES_DB student_inventory


COPY createdb.sql /docker-entrypoint-initdb.d
