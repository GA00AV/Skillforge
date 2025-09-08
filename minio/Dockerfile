FROM quay.io/minio/minio


# Install MinIO client (mc)
RUN curl -sSL https://dl.min.io/client/mc/release/linux-amd64/mc -o ./mc && chmod +x ./mc

# Add startup script
COPY ./start.sh ./start.sh
RUN chmod +x ./start.sh

ENTRYPOINT ["./start.sh"]
