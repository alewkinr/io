# Документация
Документация к `iO` - cервису для проверки аудиотреков на наличие авторских прав, разработанной на хакатоне «Цифровой Прорыв», финальный этап, заказчик решения — Газпром-Медиа.

#### [**Ссылка на Прототип проекта**](http://130.193.46.118)

# Вступление и описание решения

Проект 'iO' — cервис для проверки аудиотреков на наличие авторских прав..

Позволяет контент-мейкерам проверить музыкальную композицию на наличие авторских прав, до ее встраивания в видеоролик. Сервис распознает загруженную музыкальную композицию в нескольких базах (включая нашу собственную), узнает название и исполнителя. После этого проводит многоуровневую проверку в российских и зарубежных базах авторских прав. Далее, если запись запрещена к свободному распространению, сервис рекомендует похожие музыкальные композиции из списка бесплатных композиций - либо позволяет приобрести именно эту композицию.

Уникальностью нашего сервиса является: качественное распознавание звука, многоуровневая проверка наличия прав, функционал для наполнения библиотеки своих любимых треков, удобный интерфейс. Разработанные алгоритмы позволяют с высокой точностью определять исполнителя. До начала обработки видео пользователь может в удобном приложении проверить понравившийся трек, чтобы видеоролик, в который он встраивает аудио для размещения на Youtube и других платформах, не был удален за нарушение авторских прав.

Сервис использует нейронные сети для идентификации аудиодорожек и базы данных РОА и ВОИС

Стек проекта: `fast-api`, `postgreSQL`, `React.Native`, `Docker`, `RabbitMQ`

У нас есть [***рабочая MVP-версия (минимально работоспособная версия продукта)***](http://130.193.46.118), в виде приложения, которое обладает как удобным интерфейсом, так и достаточным функционалом, чтобы продемонстрировать основные аспекты решения задачи кейса. Приложение можно установить по [ссылке](http://130.193.46.118).

Спасибо организаторам за интересную задачу, мы будем рады продолжить сотрудничество!

# Техническое описание проекта
## Установка
В проекте используется микросервисная архитектура. Для установки проекта необходимо в корневой директории проекта выполнить команду `docker-compose up --build`. После этого, на локальном устройстве будет доступна серверная часть решения.
Если перейти на URL микросервиса по маршруту — `/docs`, откроется swagger-документация по проекту.

> Важно, что у вас должен быть установлен и запущен `Docker`.

После того, как установка всех необходимых зависимостей будет выполнена, вы сможете потестировать функционал локально

## Структура
Проект представляет собой монорепозиторий. Ниже структура директорий:
```
.
├── Makefile
├── README.md
├── back - backend проекта
│   ├── auth-service
│   ├── legal-service
│   ├── license-supervisor
│   └── upload-service
├── docker-compose.yaml
├── mobile - мобильный frontend проекта (react native)
│   ├── IOpenApp
├── infra
│   ├── __init__.py
│   ├── env
│   ├── metrics
│   ├── postgres
│   ├── runner
│   └── traefik
```
Исходный код серверной части — в папке `back`, исходный код мобильной части приложения — в папке `mobile`. Кроме того, данные по инфраструктурным вопросам в `infra`

Каждая директория по возможности содержит файл `Makefile` с базовыми командами и `.env` файл с переменными окружения

## Архитектура приложения
За основу проекта взят паттерн микро-сервисной ИТ архитектуры. Реализованы следующие сервисы: авторизации, сервис загрузок файлов, сервис для асинхронной проверки прав пользования музыкой, сервис для обновления данных о легальном контенте и т.д. 
Модели размещены отдельно и запускаются в docker-контейнерах в требуемом окружении.

# Дополнительные материалы
- [Предварительная дорожная карта и смета](https://drive.google.com/drive/folders/1EdO1RspZgb3N-MO1c8z-pxKboQSWwY4M?usp=sharing) общих затрат по разработке и внедрению на архитектуре банка - как минимальной, так и дополнительно масштабируемой версии проекта. Также здесь находятся предлагаемые модели монетизации.
- [Базовая архитектура проекта в визуальном виде](https://www.dropbox.com/s/zzulxm6jzfvns6u/structure.png?dl=0)