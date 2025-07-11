# Use Python image
FROM python:3.11

# Set workdir
WORKDIR /app

# Copy backend code
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Start FastAPI using uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
