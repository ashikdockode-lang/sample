FROM python:3.8-slim

ENV PYTHONUNBUFFERED=1
ENV PORT=8000
ENV WORKERS=2

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app.py .
EXPOSE ${PORT}
CMD ["sh", "-c", "gunicorn --workers ${WORKERS} --bind 0.0.0.0:${PORT} --access-logfile=- app:app"]
