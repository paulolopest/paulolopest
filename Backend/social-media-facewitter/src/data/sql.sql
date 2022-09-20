-- Active: 1660597275950@@35.226.146.116@3306@vaughan-21712944-paulo-lopes
DESCRIBE facewitter_users;

ALTER TABLE facewitter_users ADD nickname VARCHAR(255) NOT NULL UNIQUE AFTER name;

ALTER TABLE facewitter_users DROP COLUMN nickname;