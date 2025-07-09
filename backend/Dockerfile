# Use Python base image
FROM python:3.11

# Set working directory
WORKDIR /app

# Copy backend code
COPY . .

# Install required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Run FastAPI with uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
