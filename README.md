# K378-BISPIS

## A system to track and incentivize physical wellness

Created to help users plan and coordinate their exercises and communicate with likeminded, sports oriented people. The system will offer personalized content based on the users capabilities and track their progress (via health related metrics).

Tech stack:
- React
- NestJS
- PostgreSQL
- Docker

`main` branch - dedicated to latest and tested features, only merge when everything is alright. `dev` branch - for all the work-in-progress features. If two or more users are working on the same feature, a new, seperate development branch should be created.

## Documentation
### Entity-relation diagram
![Image of ER model.](https://i.imgur.com/4NIVOPB.png)

The ER model contains basic relations between the user and the rest of the system. The model contains user roles, entries with physical data and part of the social subsystem (events, groups, challenges, organizations, custom goals).

This model is not final and is subject to change as the project moves on.

### API endpoints
The following are all the currently available REST API endpoints with their expected requests and responses.

#### /auth/signup
Request format:
```json
{
	"name": "testname",
	"email": "testmail@gmail.com",
	"password": "test123"
}
```

Successful response format:
```json
{
  "access_token": "JWT access token"
}
```

#### /auth/login
Request format:
```json
{
	"username": "testname",
	"password": "test123"
}
```

Successful response format:
```json
{
  "access_token": "JWT access token"
}
```

#### /auth/forgotpass
Request format:
```json
{
	"email": "testmail@gmail.com"
}
```

Successful response format:
`true` if a corresponding user is found and reset email is sent, `false` otherwise.

### User interfaces
#### Authentication
<p align="center">
  <img src="https://i.imgur.com/xIObjFk.png" alt="Registration" width="200" />
  <img src="https://i.imgur.com/OmFLL3H.png" alt="Login" width="200" />
  <img src="https://i.imgur.com/p7IXtN7.png" alt="Recovery" width="200" />
</p>

User interfaces for signing up, logging in and recovering a lost password.

