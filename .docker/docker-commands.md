1) Стягиваем образ busybox

`docker pull busybox`

3) Вывод всех контейнеров

`docker ps`

4) Логи контейнера с именем pinger

`docker logs -f -t pinger`

5) Запуск второй раз Pinger

`dokcer start pinger`

6) Вывод всех контейнеров

`docker ps`

9) Удаление контейнера Pinger

`docker rm -f pinger`

10) Удаление образа busybox

`docker rmi busybox`