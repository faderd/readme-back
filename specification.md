# Проект "Readme"

## Подготовка к запуску проекта

1. Установите необходимые пакеты. Для этого из папки `./readme` запустите команду `npm install`.

2. В папке `./readme/apps/blog/prisma` создайте файл `.env` и заполните переменными окружения. Пример переменных окружения приведен в файле `.env-example`.

3. В папке `./readme/environments` создайте файлы `.blog.env`, `.notify.env`, и `.users.env`. Заполните созданные файлы переменными окружения. Примеры находятся в файлах `*.env-example`.

4. Создайте типы для Prisma. Для этого из папки `./readme` запустите команду `nx run blog:db-generate`.

5. Создейте контейнеры Docker. Для этого:
    * из папки `./readme/blog` запустите команду `docker-compose up -d`;
    * из папки `./readme/notify` запустите команду `docker-compose up -d`;
    * из папки `./readme/users` запустите команду `docker-compose up -d`;

## Работа проекта

### Запуск сервисов

Для запуска сервисов запустите следующую команду в терминале:


`nx run-many --target=serve --projects=blog,notify,users`

### Сервис Blog
По умолчанию сервис стартует по адресу: `http://localhost:3334/api`.
Спецификация OpenAPI доступен на `http://localhost:3334/api/spec`.

### Сервис Notify
По умолчанию сервис стартует по адресу: `http://localhost:3336/api`.

### Сервис Users
По умолчанию сервис стартует по адресу: `http://localhost:3333/api`.
