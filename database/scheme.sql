-- database: ./tenco2.db

DROP TABLE checklist;
CREATE TABLE `checklist` (
    `id` TEXT PRIMARY KEY, 
    `name` TEXT, 
    `status` TEXT, 
    `open_count` INTEGER, 
    `open_date` TEXT, 
    `close_date` TEXT, 
    `order_num` INTEGER, 
    `create_date` TEXT DEFAULT (CURRENT_TIMESTAMP), 
    `create_user_id` TEXT, 
    `create_user_name` TEXT, 
    `update_date` TEXT DEFAULT (CURRENT_TIMESTAMP), 
    `update_user_id` TEXT, 
    `update_user_name` TEXT
);

DROP TABLE checklist_item;
CREATE TABLE `checklist_item` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT, 
    `checklist_id` TEXT, 
    `name` TEXT, 
    `status` TEXT, 
    `check_date` TEXT, 
    `order_num` INTEGER, 
    `create_date` TEXT DEFAULT (CURRENT_TIMESTAMP), 
    `create_user_id` TEXT, 
    `create_user_name` TEXT, 
    `update_date` TEXT DEFAULT (CURRENT_TIMESTAMP), 
    `update_user_id` TEXT, 
    `update_user_name` TEXT
);

DROP TABLE checklist_reg_item;
CREATE TABLE checklist_reg_item(
    `id` TEXT PRIMARY KEY, 
    `name` TEXT, 
    `status` TEXT, 
    `order_num` INTEGER, 
    `create_date` TEXT DEFAULT (CURRENT_TIMESTAMP), 
    `create_user_id` TEXT, 
    `create_user_name` TEXT, 
    `update_date` TEXT DEFAULT (CURRENT_TIMESTAMP), 
    `update_user_id` TEXT, 
    `update_user_name` TEXT
);

DROP TABLE login_user;
CREATE TABLE login_user(
    `id` TEXT PRIMARY KEY, 
    `name` TEXT,
    `type` TEXT,
    `status` TEXT, 
    `last_access_date` TEXT, 
    `create_date` TEXT DEFAULT (CURRENT_TIMESTAMP), 
    `create_user_id` TEXT, 
    `create_user_name` TEXT, 
    `update_date` TEXT DEFAULT (CURRENT_TIMESTAMP), 
    `update_user_id` TEXT, 
    `update_user_name` TEXT
);

