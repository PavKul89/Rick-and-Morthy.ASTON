Предметная область: Приложение поиска фильмов
Используемое API: KinopoiskAPI


ОСНОВНОЙ ФУНКЦИОНАЛ
Регистрация и авторизация пользователя.
Избранные фильмы. У зарегистрированного пользователя есть возможность добавлять и удалять фильмы из избранного.
Поиск по названию фильма.
История поиска фильмов.


Реализация требований
- [x] Реализованы требования функционала.
- [x] Для хранения данных используется LocalStorage
  ### REACT
- [x] [Пишем функциональные компоненты](import { useSelector } from 'react-redux'

export function useAuth() {
  const { email, token, id } = useSelector((state) => state.user)
  return {
    isAuth: !!email,
    email,
    token,
    id,
  }
}) с хуками:
- [x] Есть рендеринг списков
- [x] Реализована форма
- [x] Есть применение ConextAPI
- [x] Есть применение предохранителя
- [x] Кастомные хуки
- [x] Использование PropTypes
- [x] Поиск не должен триггерить много запросов debounce
- [x] Есть применение Lazy+Suspense
REDUX
- [x] Используем Modern Redux with Redux Toolkit
- [x] Используем слайсы
- [x] Кастомная middleware
- [x] Используем RTK Query
- [x] Используем Transforming Responses

2 УРОВЕНЬ
- [x] Использование Firebase
