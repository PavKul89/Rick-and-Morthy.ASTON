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
- [x] Пишем функциональные компоненты с [function Button({ textColor, children, onClick, bgColor }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button]:
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
