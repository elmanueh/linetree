<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

# LineTree - Your Family, Your Story

**LineTree** is a web-based platform for **building**, **editing**, **viewing**, and **exporting** family trees. It allows you to manage people, relationships, and metadata (dates, places, gender), and exchange data in GEDCOM format.

</div>

<details>
<summary>Table of Contents</summary>

- [🌳 Main Features](#🌳-main-features)
- [🚀 Getting Started](#🚀-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [🤝 Contribute to the Project](#🤝-contribute-to-the-project)
- [🛠️ Stack](#🛠️-stack)

</details>

## 🌳 Main Features

- **Family tree creation and editing**: Allows you to add, modify, and delete people and family relationships in an intuitive and visual way.
- **Interactive display**: Dynamic graphical representation of the tree with fluid navigation between ancestors and descendants.
- **Standard export and import**: Support for common formats such as GEDCOM.
- **Secure and private storage**: Each user can save their trees in their account with full control over permissions and privacy.

## 🚀 Getting Started

### Prerequisites

To deploy and run the project, you need:

- **Docker** (version >= 20.10 recommended)
- **Docker Compose** (version compatible with your Docker)
- **`.env`** configuration file with the necessary variables for the application

> 💡 _It is not necessary to install Node.js, MongoDB, or GraphDB on your system, since all services run inside Docker containers_.

### Installation

1. Clone the repository

```sh
git clone https://github.com/elmanueh/linetree.git
```

2. Enter the project directory

```sh
cd linetree
```

3. Deploy the application with Docker

```bash
docker-compose up --build
```

Rename `.env.example` in each service and add your credentials:

> _Currently under development._

## 🤝 Contribute to the project

This repository is **Free Software** (MIT). Your help is welcome!

If you have any suggestions that could improve the project, please fork the repository and create a pull request. You can also simply open an issue with the "enhancement" tag. Here's a quick guide:

1. Fork the project (https://github.com/elmanueh/linetree/fork)
2. Clone your fork (https://github.com/elmanueh/linetree/fork) (`git clone <fork URL>`)
3. Add the original repository as a remote (`git remote add upstream <original repository URL>`)
4. Create your Feature Branch (`git switch -c feature/AwesomeFeature`)
5. Make your changes (`git commit -m 'Add: some AwesomeFeature`)
6. Push the branch (`git push origin feature/AwesomeFeature`)
7. Open a pull request (https://github.com/elmanueh/linetree/pulls)

## 🛠️ Stack

- [![NestJS][nestjs-badge]][nestjs-url] - A backend framework for Node.js based on TypeScript and a modular architecture.
- [![TypeScript][typescript-badge]][typescript-url] - Statically typed JavaScript.
- [![React][react-badge]][react-url] - A library for building user interfaces.
- [![Vite][vite-badge]][vite-url] - A rapid build tool for frontend projects.
- [![Tailwind CSS][tailwind-badge]][tailwind-url] - A CSS styling framework with utility classes.

[typescript-url]: https://www.typescriptlang.org/
[react-url]: https://react.dev/
[tailwind-url]: https://tailwindcss.com/
[nestjs-url]: https://nestjs.com/
[vite-url]: https://vitejs.dev/
[typescript-badge]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[react-badge]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[tailwind-badge]: https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white
[nestjs-badge]: https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white
[vite-badge]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[contributors-shield]: https://img.shields.io/github/contributors/elmanueh/linetree.svg?style=for-the-badge
[contributors-url]: https://github.com/elmanueh/linetree/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/elmanueh/linetree.svg?style=for-the-badge
[forks-url]: https://github.com/elmanueh/linetree/network/members
[stars-shield]: https://img.shields.io/github/stars/elmanueh/linetree.svg?style=for-the-badge
[stars-url]: https://github.com/elmanueh/linetree/stargazers
[issues-shield]: https://img.shields.io/github/issues/elmanueh/linetree.svg?style=for-the-badge
[issues-url]: https://github.com/elmanueh/linetree/issues
