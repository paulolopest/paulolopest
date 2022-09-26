-- Active: 1660597275950@@35.226.146.116@3306@vaughan-21712944-paulo-lopes
DESCRIBE facewitter_users;

ALTER TABLE facewitter_users ADD nickname VARCHAR(255) NOT NULL UNIQUE AFTER name;

ALTER TABLE facewitter_users DROP COLUMN nickname;

DROP TABLE facewitter_follows;

CREATE TABLE facewitter_follows (
    user_id VARCHAR(255) NOT NULL,
    followed_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES facewitter_users(id),
    FOREIGN KEY (followed_id) REFERENCES facewitter_users(id)
);

DESCRIBE facewitter_follows;

CREATE TABLE facewitter_posts (
   id VARCHAR(255) NOT NULL PRIMARY KEY,
   user_id VARCHAR(255) NOT NULL,
   image BLOB,
   description VARCHAR(255),
   likes INT DEFAULT 0,
   created_at DATE NOT NULL,
   FOREIGN KEY (user_id) REFERENCES facewitter_users(id)
);

CREATE TABLE facewitter_comments (
    post_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (user_id) REFERENCES facewitter_users(id),
    FOREIGN KEY (post_id) REFERENCES facewitter_posts(id)
);

DROP TABLE facewitter_comments;
DROP TABLE facewitter_posts;
