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
- [x] Пишем функциональные компоненты 
- [x] Есть рендеринг списков https://github.com/PavKul89/Rick-and-Morthy.ASTON/blob/f5fdab9e7f2b09a4001fef794a41ae2bfddd0b7d/src/components/Posts.jsx#L63-L75
- [x] Реализована форма https://github.com/PavKul89/Rick-and-Morthy.ASTON/blob/5e97e791b76b26d2d4577118d9ff8bd3096419a9/src/components/Form/Form.jsx#L1-L46
- [x] Есть применение ContextAPI https://github.com/PavKul89/Rick-and-Morthy.ASTON/blob/5b47c26bac330ef5a88379863e6692a328822e8a/src/context/FavoritesContext.jsx#L1-L35
- [x] Есть применение предохранителя https://github.com/PavKul89/Rick-and-Morthy.ASTON/blob/995042d66896a07c99146a68ee398d7018eded91/src/components/Posts.jsx#L76C1-L78C3
- [x] Кастомные хуки https://github.com/PavKul89/Rick-and-Morthy.ASTON/blob/395e11b5d9e738e783f159ee36e05029dd252697/src/hooks/useFetchCharacter.js#L1-L22
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
