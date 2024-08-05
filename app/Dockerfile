FROM python:3.11.4-slim-buster

# Define work directory
WORKDIR /usr/src/app

# Set UID and GID
ARG USER_ID=1000
ARG GROUP_ID=1000

# Create appuser with the specified UID and GID
RUN groupadd -g ${GROUP_ID} appgroup \
  && useradd -u ${USER_ID} -g appgroup -m appuser

# Install dependencies as root
RUN apt-get update && apt-get install -y gettext \
  && pip install --upgrade pip

# Switch to new user
USER appuser

# Copy requirements and install python dependencies
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project
COPY . .
