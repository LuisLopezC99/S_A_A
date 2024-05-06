-- Roles del sistema
INSERT INTO `s_a_a`.`tab_role`
(`name`)
VALUES
('admin');

INSERT INTO `s_a_a`.`tab_role`
(`name`)
VALUES
('secretaria');

INSERT INTO `s_a_a`.`tab_role`
(`name`)
VALUES
('departamento');

INSERT INTO `s_a_a`.`tab_role`
(`name`)
VALUES
('alcaldia');

INSERT INTO `s_a_a`.`tab_role`
(`name`)
VALUES
('externo');

-- Usuarios Necesarios

INSERT INTO s_a_a.tab_role
(name)
VALUES
('externo');

INSERT INTO s_a_a.tab_user
(name,
email,
password,
role_id,
enabled,
FirstTime)
VALUES
("externo",
"externo@externo",
"123",
5,
0,
0);

-- Operations

INSERT INTO `s_a_a`.`tab_operations` (`id`, `name`, `description`) VALUES ('1', 'Create Users', 'Permission to create users');
INSERT INTO `s_a_a`.`tab_operations` (`id`, `name`, `description`) VALUES ('2', 'Update Users', 'Permission to update users');
INSERT INTO `s_a_a`.`tab_operations` (`id`, `name`, `description`) VALUES ('3', 'Create Agreements', 'Permission to create agrements');
INSERT INTO `s_a_a`.`tab_operations` (`id`, `name`, `description`) VALUES ('4', 'Read all agreements', 'Permission to read all agreements');
INSERT INTO `s_a_a`.`tab_operations` (`id`, `name`, `description`) VALUES ('5', 'Update Agreements', 'Permision to update agreements');
INSERT INTO `s_a_a`.`tab_operations` (`id`, `name`, `description`) VALUES ('6', 'Create Sessions', 'Permission to create sessions');
INSERT INTO `s_a_a`.`tab_operations` (`id`, `name`, `description`) VALUES ('7', 'Read Sessions', 'Permission to read sessions');
INSERT INTO `s_a_a`.`tab_operations` (`id`, `name`, `description`) VALUES ('8', 'Update Sessions', 'Permission to update sessions');

-- Roles Operations

INSERT INTO `s_a_a`.`tab_role_operations` (`role_id`, `operation_id`) VALUES ('1', '1');
INSERT INTO `s_a_a`.`tab_role_operations` (`role_id`, `operation_id`) VALUES ('1', '2');
INSERT INTO `s_a_a`.`tab_role_operations` (`role_id`, `operation_id`) VALUES ('2', '3');
INSERT INTO `s_a_a`.`tab_role_operations` (`role_id`, `operation_id`) VALUES ('2', '4');
INSERT INTO `s_a_a`.`tab_role_operations` (`role_id`, `operation_id`) VALUES ('2', '5');
INSERT INTO `s_a_a`.`tab_role_operations` (`role_id`, `operation_id`) VALUES ('2', '6');
INSERT INTO `s_a_a`.`tab_role_operations` (`role_id`, `operation_id`) VALUES ('2', '7');
INSERT INTO `s_a_a`.`tab_role_operations` (`role_id`, `operation_id`) VALUES ('2', '8');
INSERT INTO `s_a_a`.`tab_role_operations` (`role_id`, `operation_id`) VALUES ('3', '5');
INSERT INTO `s_a_a`.`tab_role_operations` (`role_id`, `operation_id`) VALUES ('4', '5');



