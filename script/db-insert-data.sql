CREATE TABLE  IF NOT EXISTS  user_test(
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(255),
    email varchar(255),
    password  varchar(255),
    date date
        )

INSERT INTO user_test(id,name,email,password,date) VALUE ('99','Amit Dhoju','amitdhoju@gmail.com','password','2019-09-25');