CREATE DATABASE IF NOT EXISTS growanalitics;
CREATE DATABASE IF NOT EXISTS growanalitics_shadow;

GRANT ALL PRIVILEGES ON growanalitics.* TO 'prisma'@'%';
GRANT ALL PRIVILEGES ON growanalitics_shadow.* TO 'prisma'@'%';

FLUSH PRIVILEGES;
