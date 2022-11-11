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
    FOREIGN KEY (user_id) REFERENCES facewitter_users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE facewitter_follows ADD Foreign Key (user_id) REFERENCES facewitter_users(id) ON DELETE CASCADE;

DESCRIBE facewitter_follows;

-- ---------------------------------------------------------------------------------------

CREATE TABLE facewitter_posts (
   id VARCHAR(255) NOT NULL PRIMARY KEY,
   user_id VARCHAR(255) NOT NULL,
   image BLOB,
   content VARCHAR(255),
   created_at VARCHAR(255) NOT NULL,
   FOREIGN KEY (user_id) REFERENCES facewitter_users(id) ON DELETE CASCADE
);

ALTER TABLE facewitter_posts DROP COLUMN created_at;

ALTER TABLE facewitter_posts ADD created_at BIGINT NOT NULL AFTER content;

SELECT * FROM facewitter_posts;
DESCRIBE facewitter_posts;
DROP TABLE facewitter_posts;

-- ---------------------------------------------------------------------------------------

CREATE TABLE facewitter_comments (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    post_id VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES facewitter_posts(id) ON DELETE CASCADE 
);

DROP TABLE facewitter_comments;
DESCRIBE facewitter_comments;

SELECT * FROM facewitter_comments;

ALTER TABLE facewitter_comments DROP COLUMN created_at;
ALTER TABLE facewitter_comments ADD created_at BIGINT NOT NULL AFTER content;

ALTER TABLE facewitter_comments ADD Foreign Key (user_id) REFERENCES facewitter_users(id) ON DELETE CASCADE;


-- ---------------------------------------------------------------------------------------

CREATE TABLE facewitter_blockList (
    user_id VARCHAR(255) NOT NULL,
    expires_in DATE NOT NULL,
    token VARCHAR(256) NOT NULL
);

DROP TABLE `facewitter_blockList`;

SELECT * FROM `facewitter_blockList`;

--  --------------------------------------------------------------------------------------
CREATE TABLE facewitter_posts_likes (
    user_id VARCHAR(255) NOT NULL,
    post_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES facewitter_posts(id) ON DELETE CASCADE
);
ALTER TABLE facewitter_posts_likes ADD Foreign Key (user_id) REFERENCES facewitter_users(id) ON DELETE CASCADE;

SELECT * FROM facewitter_posts_likes;

DROP TABLE facewitter_posts_likes;

-- ----------------------------------------------------------------------------------------

CREATE TABLE facewitter_comments_likes (
    user_id VARCHAR(255) NOT NULL,
    comment_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (comment_id) REFERENCES facewitter_comments(id) ON DELETE CASCADE
);

SELECT * FROM facewitter_comments_likes;

DROP TABLE facewitter_comments_likes;

ALTER TABLE facewitter_comments_likes ADD Foreign Key (user_id) REFERENCES facewitter_users(id) ON DELETE CASCADE;


-- ----------------------------------------------------------------------------------------
CREATE TABLE facewitter_shares (
    user_id VARCHAR(255) NOT NULL,
    post_id VARCHAR(255) NOT NULL,
    created_at BIGINT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES facewitter_posts(id) ON DELETE CASCADE
);

ALTER TABLE facewitter_shares ADD Foreign Key (user_id) REFERENCES facewitter_users(id) ON DELETE CASCADE;

DROP TABLE facewitter_shares;

DESCRIBE facewitter_shares;