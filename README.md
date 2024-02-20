# Real-time Chat Application Backend

## Overview

This project is the backend for a real-time chat application built using Go. It leverages WebSockets for real-time bi-directional communication between clients and the server. The backend handles user authentication, message delivery, chat rooms, and more.

## Getting Started

### Prerequisites

- Go (version 1.15 or later recommended)
- Docker (for running services like databases)
- Any Go-supported database (PostgreSQL recommended, for storing user and chat data)

### Running Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/chat-app-backend.git
   cd chat-app-backend
   ```

2. Set up your environment variables by copying the `.env.example` file to `.env` and adjusting the variables as needed.

3. Install dependencies:

   ```bash
   go mod tidy
   ```

4. Run the server:

   ```bash
   task run
   ```

The server should now be running and listening for connections on the specified port.

## Project Structure

- `api/`: API definitions and protocol files.
- `cmd/`: Entry points for the application.
- `internal/`: Core application code that's not intended to be used by external applications.
- `config/`: Configuration files and default settings.
- `scripts/`: Utility scripts for tasks like database migration.
- `tests/`: Test cases and test data.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to discuss proposed changes or report bugs.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
