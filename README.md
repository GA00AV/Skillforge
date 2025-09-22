# SkillForge

SkillForge is a distributed e-learning platform that allows users to create and consume courses with adaptive video streaming. It showcases modern distributed systems design with async pipelines, blob storage, and containerized services.

## DEMO 
soon

## Features

* **User Authentication**: Signup/Login with session management via Redis.
* **Course Management**: Create and enroll in courses.
* **Video Upload & Processing**: Upload lectures that are processed asynchronously into HLS format.
* **Adaptive Streaming**: Videos streamed using Video.js for smooth playback.
* **Event-Driven Architecture**: RabbitMQ handles events for video processing.
* **Blob Storage**: MinIO stores uploaded videos.

## Tech Stack

* Frontend: React + V0 UI + Nginx
* Backend: Express.js + Apollo GraphQL
* Database: PostgreSQL with Prisma ORM
* Caching/Session: Redis
* Message Queue: RabbitMQ
* Object Storage: MinIO
* Video Processing: Worker node converting videos to HLS
* Streaming: Video.js
* Containerization: Docker & Docker Compose

## Architecture

```
Frontend (React) --> GraphQL API (Express + Apollo) --> PostgreSQL (Prisma ORM)
                                              |
                                              v
                                         Redis (Sessions)
                                              |
                                              v
                                         RabbitMQ (Events) --> Worker --> MinIO (Blob Storage) --> DB update
```

## Getting Started

### Prerequisites

* Docker & Docker Compose installed
* Node.js installed (for local dev if not using Docker)

### Running the Project
1. Change git settings to ensure correct file encoding(must for windows):
```bash
git config --global core.autocrlf input
```

2. Clone the repository:

```bash
git clone https://github.com/GA00AV/Skillforge.git
cd Skillforge
```

3. Start all services using Docker Compose:

```bash
docker-compose up --build
```

4. Open the frontend in browser:

```
http://localhost
```

## Usage

1. Signup or Login.
2. Browse and enroll in available courses.
3. Upload a course with lectures. The worker will process videos asynchronously.
4. Watch courses with adaptive streaming.


## Folder Structure

* `frontend/` - React application
* `backend/` - Express + Apollo GraphQL API
* `video-processor/` - Video processing service
* `docker-compose.yaml` - Docker orchestration for all services


## License

MIT License
