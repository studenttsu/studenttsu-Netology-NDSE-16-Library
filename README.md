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


Удаление записи по id
```
    db.books.deleteOne({
        '_id': ObjectId('563237a41a4d68582c2509da')
    })
```