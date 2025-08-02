# About

Web site that provides real time messaging with your contacts or groups.
Server part: https://github.com/Yarik7610/messenger-server

## Images:

### Log in page:
![Снимок экрана 2024-07-03 164014](https://github.com/Yarik7610/messenger-client/assets/108609450/e34e87d7-5519-4f0e-984b-3efc46028862)

### Main page:
![Снимок экрана 2024-07-03 164046](https://github.com/Yarik7610/messenger-client/assets/108609450/0e93d892-8ab5-4250-8cda-5ae628041c56)

### Create chat window:
![Снимок экрана 2024-07-03 164101](https://github.com/Yarik7610/messenger-client/assets/108609450/79a99518-da22-42b6-b218-f25f11a22081)

### Admin ownership window:
![Снимок экрана 2024-07-03 164218](https://github.com/Yarik7610/messenger-client/assets/108609450/7d7144cf-2cf8-4339-b2cd-a50d93336859)

## Functionality:

1. Sign up / log in with JWT-token
2. Changing avatar
3. Adding contact
4. Creating / removing / editing chat group
5. Searching contact / chat group
6. Writing messages to chat / contact in real time via Socket.IO
7. Adding new members into chat group
8. Kicking group members if you are the admin, admin ownership for groups
9. Leaving the chat group / chat with contact
10. Online people status
11. Unread messages amount
12. Pagination in the chats on scrolling to top

## How to start

1. Run `yarn` and then `yarn dev`

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
