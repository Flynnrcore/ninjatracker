# 🎵 Ninja Tracker 🎵

[![Maintainability](https://qlty.sh/badges/b6125dc0-85ac-41f3-8270-ae761025c432/maintainability.svg)](https://qlty.sh/gh/Flynnrcore/projects/ninjatracker)
[![GitHub Stars](https://img.shields.io/github/stars/Flynnrcore/ninjatracker?style=social)](https://github.com/Flynnrcore/ninjatracker/stargazers)
[![React](https://img.shields.io/badge/React-19-%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-%233178C6)](https://www.typescriptlang.org/)

**Персональный трекер музыкальных тренировок** для профессиональных музыкантов и любителей.
Отслеживайте прогресс, планируйте занятия и совершенствуйте мастерство.

<br/>
<a href='https://flynnrcore.github.io/ninjatracker/' target='_blank'><img src='https://i.postimg.cc/hjjqMV1z/temp-Image-QClbe-S.avif' border='0' alt='site view'/></a>
<br/>

## 🌟 Основные возможности

| Функция                | Описание                                    |
| ---------------------- | ------------------------------------------- |
| 🎯 **Тренировки**      | Создание и отслеживание занятий             |
| ⏱️ **Таймер+Метроном** | Встроенный инструмент для контроля времени  |
| 📊 **Аналитика**       | Визуализация прогресса (графики, отчеты)    |
| 🏷️ **Категории**       | Гибкая система типов тренировок             |
| 🎸 **Инструменты**     | Поддержка различных музыкальных направлений |

| 🔥 Ближайшие цели                         |
| ----------------------------------------- |
| Адаптивный дизайн для мобильных устройств |
| Личный кабинет пользователя               |
| Интеграция с бэкендом                     |

## 🛠 Технологический стек

<div align="center">
  
| Технология | Применение |
|------------|------------|
| <img src="https://cdn.worldvectorlogo.com/logos/react-2.svg" width="40"> **React 19** | Базовый фреймворк |
| <img src="https://cdn.worldvectorlogo.com/logos/typescript.svg" width="40"> **TypeScript** | Типизация кода |
| <img src="https://cdn.worldvectorlogo.com/logos/vitejs.svg" width="40"> **Vite** | Сборка проекта |
| <img src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg" width="40"> **Tailwind CSS** | Стилизация |
| <img src="https://shadcn.com/favicon.ico" width="40"> **Shadcn UI** | UI компоненты |

</div>

## 🚀 Быстрый старт

# 1. Клонируйте репозиторий

```bash
git clone git@github.com:Flynnrcore/ninjatracker.git
```

# 2. Установите зависимости

```bash
npm install
```

# 3. Запустите приложение

```bash
npm run dev
```

## 🚀 Деплой на GitHub Pages и Vercel

### Переменная окружения

Проект использует переменную `VITE_BASE_URL` для корректной работы роутинга и путей:
- Для **Vercel**: `VITE_BASE_URL=/`
- Для **GitHub Pages**: `VITE_BASE_URL=/ninjatracker/`

### Скрипты

- `npm run build:vercel` — билд для Vercel
- `npm run build:gh` — билд для GitHub Pages
- `npm run deploy:gh` — билд и деплой на GitHub Pages (использует пакет `gh-pages`)

### Деплой на Vercel
1. Подключите репозиторий к Vercel.
2. В настройках проекта добавьте переменную окружения:
   - `VITE_BASE_URL` = `/`
3. Build Command: `npm run build:vercel` (или просто `npm run build`)
4. Output Directory: `dist`

### Деплой на GitHub Pages
1. Убедитесь, что установлен пакет `gh-pages` (`npm i -D gh-pages`).
2. Выполните команду:
   - `npm run deploy:gh`
3. Проект будет доступен по адресу: `https://<ваш-логин>.github.io/ninjatracker/`

### Важно
- Для GitHub Pages в проекте настроен файл `404.html` с редиректом для SPA.
- Для Vercel никаких дополнительных настроек не требуется.
