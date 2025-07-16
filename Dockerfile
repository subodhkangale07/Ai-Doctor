# Use a base image with Python 3.10
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y gcc g++ libpq-dev

# Install Python build tools
RUN pip install --upgrade pip setuptools wheel build

# Copy project files
COPY . .

# Install requirements
RUN pip install -r requirements.txt

# Expose the port uvicorn will run on
EXPOSE 10000

# Start the FastAPI server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "10000"]
