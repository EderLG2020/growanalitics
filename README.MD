nodejs 22.19.0

CREATE USER 'prisma'@'localhost' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON growanalitics.* TO 'prisma'@'localhost';
FLUSH PRIVILEGES;


GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;


