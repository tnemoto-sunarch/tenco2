-- database: ./tenco2.db

-- --------------------------------------------------------
-- checklist
-- --------------------------------------------------------
INSERT INTO checklist VALUES('hkfdajhoiehw','〇〇のチェックリスト','0',0,NULL,NULL,1,'2024-08-17 07:02:38','tnemoto','根本翼','2024-08-17 07:02:38','tnemoto','根本翼');
INSERT INTO checklist VALUES('hkfdajhoiehb','●●のチェックリスト','0',0,NULL,NULL,2,'2024-08-17 07:03:27','tnemoto','根本翼','2024-08-17 07:03:27','tnemoto','根本翼');
INSERT INTO checklist VALUES('hkfdajhoieha','△△のチェックリスト','0',0,NULL,NULL,3,'2024-08-17 07:03:27','tnemoto','根本翼','2024-08-17 07:03:27','tnemoto','根本翼');

-- --------------------------------------------------------
-- checklist_user
-- --------------------------------------------------------
delete from checklist_user;
INSERT INTO checklist_user VALUES(null,'hkfdajhoiehw','伊藤社長','0',NULL,1,'2024-08-17 07:33:23','tnemoto','根本翼','2024-08-17 07:33:23','tnemoto','根本翼');
INSERT INTO checklist_user VALUES(null,'hkfdajhoiehw','浅見','0',NULL,2,'2024-08-17 07:33:23','tnemoto','根本翼','2024-08-17 07:33:23','tnemoto','根本翼');
INSERT INTO checklist_user VALUES(null,'hkfdajhoiehw','佐々木','0',NULL,3,'2024-08-17 07:33:23','tnemoto','根本翼','2024-08-17 07:33:23','tnemoto','根本翼');

INSERT INTO checklist_user VALUES(null,'hkfdajhoiehb','伊藤社長','0',NULL,1,'2024-08-17 07:33:23','tnemoto','根本翼','2024-08-17 07:33:23','tnemoto','根本翼');
INSERT INTO checklist_user VALUES(null,'hkfdajhoiehb','浅見','0',NULL,2,'2024-08-17 07:33:23','tnemoto','根本翼','2024-08-17 07:33:23','tnemoto','根本翼');
INSERT INTO checklist_user VALUES(null,'hkfdajhoiehb','佐々木','0',NULL,3,'2024-08-17 07:33:23','tnemoto','根本翼','2024-08-17 07:33:23','tnemoto','根本翼');

INSERT INTO checklist_user VALUES(null,'hkfdajhoieha','伊藤社長','0',NULL,1,'2024-08-17 07:33:23','tnemoto','根本翼','2024-08-17 07:33:23','tnemoto','根本翼');
INSERT INTO checklist_user VALUES(null,'hkfdajhoieha','浅見','0',NULL,2,'2024-08-17 07:33:23','tnemoto','根本翼','2024-08-17 07:33:23','tnemoto','根本翼');
INSERT INTO checklist_user VALUES(null,'hkfdajhoieha','佐々木','0',NULL,3,'2024-08-17 07:33:23','tnemoto','根本翼','2024-08-17 07:33:23','tnemoto','根本翼');

-- --------------------------------------------------------
-- checklist_reg_user
-- --------------------------------------------------------
delete from checklist_reg_user;
INSERT INTO checklist_reg_user VALUES('dsafdsaffffa','伊藤社長','1',1,'2024-08-17 07:33:23','tnemoto','根本翼','2024-08-17 07:33:23','tnemoto','根本翼');
INSERT INTO checklist_reg_user VALUES('dsafdsaffffb','浅見','1',2,'2024-08-17 07:33:23','tnemoto','根本翼','2024-08-17 07:33:23','tnemoto','根本翼');
INSERT INTO checklist_reg_user VALUES('dsafdsaffffc','佐々木','1',3,'2024-08-17 07:33:23','tnemoto','根本翼','2024-08-17 07:33:23','tnemoto','根本翼');

