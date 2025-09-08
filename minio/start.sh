#!/bin/sh
set -e
MINIO_ALIAS="local"
MINIO_URL="http://127.0.0.1:9000"
MINIO_ACCESS_KEY=${MINIO_ROOT_USER:-minioadmin}
MINIO_SECRET_KEY=${MINIO_ROOT_PASSWORD:-minioadmin}
EVENT_BUCKET=${EVENT_BUCKET:-tempvideo}
PROUDCTION_BUCKED=${PRODUCTION_BUCKET:-production}

# Start MinIO in background
minio server /data --console-address ":${UI_PORT:-9090}" &
pid="$!"

# Wait for MinIO to be ready
echo "Waiting for MinIO..."
until curl -s "$MINIO_URL/minio/health/ready" > /dev/null; do
  sleep 2
done

# Configure mc
mc alias set $MINIO_ALIAS $MINIO_URL $MINIO_ACCESS_KEY $MINIO_SECRET_KEY

# Create bucket if not exists
mc mb --ignore-existing $MINIO_ALIAS/$EVENT_BUCKET
mc mb --ignore-existing $MINIO_ALIAS/$PROUDCTION_BUCKED

# Make production bucket public for read
mc anonymous set download $MINIO_ALIAS/$PROUDCTION_BUCKED
echo "Waiting 10 for RabbitMQ..."
sleep 10
# Configure RabbitMQ target
echo "Configuring event to rabbitmq..."
until mc admin config set $MINIO_ALIAS notify_amqp:1 \
  url="${MINIO_NOTIFY_AMQP_URL:-amqp://guest:guest@rabbitmq:5672}" \
  exchange="${MINIO_NOTIFY_AMQP_EXCHANGE:-minio_exchange}" \
  exchange_type="${MINIO_NOTIFY_AMQP_EXCHANGE_TYPE:-fanout}" \
  routing_key="${MINIO_NOTIFY_AMQP_ROUTING_KEY:-minio_routing}" \
  no_wait="off" \
  auto_deleted="off";do
  echo "rabbitmq not ready!"
  sleep 5
done


# Add bucket notification for PUT events
mc event remove $MINIO_ALIAS/$EVENT_BUCKET --force || true

mc event add $MINIO_ALIAS/$EVENT_BUCKET arn:minio:sqs::1:amqp --event put

# Bring MinIO back to foreground
wait "$pid"
