# 42-Internal-Hackthon

## Basic Idea
A timeframe estimator for keeping certain paces.


## API Integration

This project integrates with the [42 Intra API](https://api.intra.42.fr/apidoc) to fetch student data, project information, and achievements.

**Authentication:**

*   Currently, the application uses mock data.
*   Future versions will implement OAuth 2.0 authentication to securely access the 42 API.

**Key Endpoints (Planned):**

*   `/v2/users/{user_id}`:  Retrieve user details (profile, login, email, etc.).
*   `/v2/projects/{project_id}`: Get information about specific projects.
*   `/v2/users/{user_id}/locations`: Track user locations (presence in 42 school).
*   `/v2/users/{user_id}/cursus_users`: Get cursus information for a user.

**Note:** This section will be updated as the API integration progresses and new endpoints are utilized.  Refer to the [42 Intra API documentation](https://api.intra.42.fr/apidoc) for the most up-to-date information on available endpoints and usage.

### More features and details will be added...
