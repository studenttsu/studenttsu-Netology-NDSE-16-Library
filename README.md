1) В директории .docker на основе `.env.example` создаём `.env`

2) запускаем приложения через docker-compose
   `docker-compose -f ./.docker/docker-compose.yml up -d --build`
   
либо отдельно запустить инфраструктуру командой
   `docker-compose -f ./.docker/docker-compose-infra.yml up -d`
   
и запустить само приложение library-app (не забыть создать .env файл)
   `npm start`

