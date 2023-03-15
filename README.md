1) В директории .docker на основе `.env.example` создаём `.env`

2) запускаем приложения через docker-compose
   `docker-compose -f ./.docker/docker-compose.yml up -d --build`
   
либо отдельно запустить инфраструктуру командой
   `docker-compose -f ./.docker/docker-compose-infra.yml up -d`
   
и запустить само приложение library-app
   `npm start`


Вставка двух записей книг
```
    db.books.insertMany([
        {   
            title: 'Book 1',
            description: '',
            authors: ''
        },
        {   
            title: 'Book 2',
            description: '',
            authors: ''
        }
    ])
```

Поиск документа с заголовком Book 1
```
    db.books.find({
        title: 'Book 1'
    })
```
