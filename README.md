# 🎵 Ninja Tracker 🎵

[![Maintainability](https://qlty.sh/badges/b6125dc0-85ac-41f3-8270-ae761025c432/maintainability.svg)](https://qlty.sh/gh/Flynnrcore/projects/ninjatracker)
[![GitHub Stars](https://img.shields.io/github/stars/Flynnrcore/ninjatracker?style=social)](https://github.com/Flynnrcore/ninjatracker/stargazers)
[![React](https://img.shields.io/badge/React-19-%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-%233178C6)](https://www.typescriptlang.org/)

**Персональный трекер музыкальных тренировок** для профессиональных музыкантов и любителей.
Отслеживайте прогресс, планируйте занятия и совершенствуйте мастерство.

<br/>
<a href='https://ninjatracker.vercel.app' target='_blank'><img src='https://i.postimg.cc/hjjqMV1z/temp-Image-QClbe-S.avif' border='0' alt='site view'/></a>
<br/>

## 🌟 Основные возможности

| Функция                | Описание                                    |
| ---------------------- | ------------------------------------------- |
| 🎯 **Тренировки**      | Создание и отслеживание занятий             |
| ⏱️ **Таймер+Метроном** | Встроенный инструмент для контроля времени  |
| 📊 **Аналитика**       | Визуализация прогресса (графики, отчеты)    |
| 🏷️ **Категории**       | Гибкая система типов тренировок             |
| 🎸 **Инструменты**     | Поддержка различных музыкальных направлений |

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

## ⚙️ Технические особенности

- **Современный стек:** React 19, TypeScript, Vite, Tailwind CSS, Shadcn UI.
- **Контекст авторизации:** Используется React Context для управления состоянием авторизации пользователя.
- **Безопасность аутентификации:**
  - Токены доступа хранятся в httpOnly cookies — это защищает от XSS-атак, так как JS-код не может получить доступ к токену.
  - Защита от CSRF реализована через соответствующие заголовки и настройки cookies.
  - Валидация форм и данных на клиенте и сервере.
- **Асинхронные запросы:** Используются кастомные React-хуки для работы с API и загрузки пользовательских данных.
- **Модульная архитектура:** Компоненты и страницы разделены по папкам, что облегчает масштабирование и поддержку.
- **UI/UX:** Используются современные UI-компоненты и анимации для плавного пользовательского опыта.
- **Аналитика:** Визуализация статистики тренировок с помощью кастомных графиков.
- **Мобильная адаптивность:** Интерфейс оптимизирован для работы на мобильных устройствах.
- **Ленивая загрузка:** Критические компоненты подгружаются по мере необходимости для ускорения старта приложения.
- **Обработка ошибок:** Реализованы fallback-компоненты и страницы ошибок для повышения стабильности.

> Подробнее о безопасности: все чувствительные данные передаются только по HTTPS, а ключевые операции защищены серверной валидацией.

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
