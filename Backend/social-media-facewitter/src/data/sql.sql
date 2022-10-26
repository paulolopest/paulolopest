-- Active: 1660597275950@@35.226.146.116@3306@vaughan-21712944-paulo-lopes
DESCRIBE facewitter_users;

ALTER TABLE facewitter_users ADD nickname VARCHAR(255) NOT NULL UNIQUE AFTER name;

ALTER TABLE facewitter_users DROP COLUMN nickname;

SELECT * FROM facewitter_users;
-- ---------------------------------------------------------------------------------------
DROP TABLE facewitter_follows;

CREATE TABLE facewitter_follows (
    user_id VARCHAR(255) NOT NULL,
    followed_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES facewitter_users(id),
    FOREIGN KEY (followed_id) REFERENCES facewitter_users(id)
);

DESCRIBE facewitter_follows;

-- ---------------------------------------------------------------------------------------

CREATE TABLE facewitter_posts (
   id VARCHAR(255) NOT NULL PRIMARY KEY,
   user_id VARCHAR(255) NOT NULL,
   image BLOB,
   content VARCHAR(255),
   likes INT DEFAULT 0,
   created_at VARCHAR(255) NOT NULL,
   FOREIGN KEY (user_id) REFERENCES facewitter_users(id)
);

ALTER TABLE facewitter_posts DROP COLUMN likes;

SELECT * FROM facewitter_posts;
DESCRIBE facewitter_posts;
DROP TABLE facewitter_posts;

-- ---------------------------------------------------------------------------------------

CREATE TABLE facewitter_comments (
    id VARCHAR(255) PRIMARY KEY,
    post_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    likes INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES facewitter_users(id),
    FOREIGN KEY (post_id) REFERENCES facewitter_posts(id)
);

DROP TABLE facewitter_comments;
DESCRIBE facewitter_comments;

SELECT * FROM facewitter_comments;

ALTER TABLE facewitter_comments DROP COLUMN created_at;
ALTER TABLE facewitter_comments ADD created_at VARCHAR(255) NOT NULL AFTER content;

-- ---------------------------------------------------------------------------------------

CREATE TABLE facewitter_blockList (
    user_id VARCHAR(255) NOT NULL,
    expires_in DATE NOT NULL,
    token VARCHAR(256) NOT NULL
);

DROP TABLE `facewitter_blockList`;

SELECT * FROM `facewitter_blockList`;

--  --------------------------------------------------------------------------------------
CREATE TABLE facewitter_likes (
    user_id VARCHAR(255) NOT NULL,
    post_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES facewitter_posts(id)
);

SELECT * FROM facewitter_likes;

DROP TABLE facewitter_likes;

-- ----------------------------------------------------------------------------------------

CREATE TABLE facewitter_comments_likes (
    user_id VARCHAR(255) NOT NULL,
    comment_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (comment_id) REFERENCES facewitter_comments(id)
);

SELECT * FROM facewitter_comments_likes;

DROP TABLE facewitter_comments_likes;