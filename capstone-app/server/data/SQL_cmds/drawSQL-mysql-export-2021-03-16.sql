CREATE TABLE `users_demo`(
    `id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `email_verified_at` DATETIME NULL,
    `password` VARCHAR(255) NOT NULL,
    `remember_token` VARCHAR(255) NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `phone_number` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `profile_image` VARCHAR(255) NOT NULL,
    `favourites` INT NOT NULL
);
ALTER TABLE
    `users_demo` ADD PRIMARY KEY `users_demo_id_primary`(`id`);
ALTER TABLE
    `users_demo` ADD UNIQUE `users_demo_email_unique`(`email`);
CREATE TABLE `rooms`(
    `id` INT NOT NULL,
    `home_type` VARCHAR(255) NOT NULL,
    `room_type` VARCHAR(255) NOT NULL,
    `total_occupancy` INT NOT NULL,
    `total_bedrooms` INT NOT NULL,
    `total_bathrooms` INT NOT NULL,
    `summary` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `has_tv` TINYINT(1) NOT NULL,
    `has_kitchen` TINYINT(1) NOT NULL,
    `has_air_con` TINYINT(1) NOT NULL,
    `has_heating` TINYINT(1) NOT NULL,
    `has_internet` TINYINT(1) NOT NULL,
    `price` INT NOT NULL,
    `published_at` DATETIME NOT NULL,
    `owner_id` INT NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `latitude` DOUBLE(8, 2) NOT NULL,
    `longitude` DOUBLE(8, 2) NOT NULL
);
ALTER TABLE
    `rooms` ADD PRIMARY KEY `rooms_id_primary`(`id`);
CREATE TABLE `reservations`(
    `id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `room_id` INT NOT NULL,
    `start_date` DATETIME NOT NULL,
    `end_date` DATETIME NOT NULL,
    `price` INT NOT NULL,
    `total` INT NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL
);
ALTER TABLE
    `reservations` ADD PRIMARY KEY `reservations_id_primary`(`id`);
CREATE TABLE `media`(
    `id` INT NOT NULL,
    `model_id` INT NOT NULL,
    `model_type` VARCHAR(255) NOT NULL,
    `file_name` VARCHAR(255) NOT NULL,
    `mime_type` VARCHAR(255) NULL
);
ALTER TABLE
    `media` ADD PRIMARY KEY `media_id_primary`(`id`);
CREATE TABLE `reviews`(
    `id` INT NOT NULL,
    `reservation_id` INT NOT NULL,
    `rating` INT NOT NULL,
    `comment` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `reviews` ADD PRIMARY KEY `reviews_id_primary`(`id`);
CREATE TABLE `art_work`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(255) NOT NULL,
    `year_of_installation` INT NOT NULL,
    `sitename` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `url_photo` VARCHAR(255) NOT NULL,
    `registry_id` INT NOT NULL,
    `primary_material` VARCHAR(255) NOT NULL,
    `ownership` VARCHAR(255) NOT NULL,
    `artists` VARCHAR(255) NOT NULL,
    `artists_url` VARCHAR(255) NOT NULL,
    `site_address` VARCHAR(255) NOT NULL,
    `photo_credit` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `neighbourhood` VARCHAR(255) NOT NULL,
    `neighbourhood_calc` INT NOT NULL,
    `location_on_site` VARCHAR(255) NOT NULL,
    `geom` POINT NOT NULL
);
ALTER TABLE
    `art_work` ADD PRIMARY KEY `art_work_id_primary`(`id`);
CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `favourites` INT NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    `location_created_at` POINT NOT NULL,
    `location_current` POINT NOT NULL,
    `profile_image` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `users` ADD PRIMARY KEY `users_id_primary`(`id`);
ALTER TABLE
    `users` ADD PRIMARY KEY `users_favourites_primary`(`favourites`);
CREATE TABLE `neighbourhood`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `geom` POLYGON NOT NULL
);
ALTER TABLE
    `neighbourhood` ADD PRIMARY KEY `neighbourhood_id_primary`(`id`);
CREATE TABLE `cherry_blossoms`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `coordinates` POINT NOT NULL
);
ALTER TABLE
    `cherry_blossoms` ADD PRIMARY KEY `cherry_blossoms_id_primary`(`id`);
CREATE TABLE `public_washrooms`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `summer_hours` VARCHAR(255) NOT NULL,
    `winter_hours` VARCHAR(255) NOT NULL,
    `geom` POINT NOT NULL
);
ALTER TABLE
    `public_washrooms` ADD PRIMARY KEY `public_washrooms_id_primary`(`id`);
CREATE TABLE `favourites`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `art_work` INT NOT NULL,
    `visited` TINYINT(1) NOT NULL
);
ALTER TABLE
    `favourites` ADD PRIMARY KEY `favourites_id_primary`(`id`);
ALTER TABLE
    `favourites` ADD UNIQUE `favourites_user_id_unique`(`user_id`);
CREATE TABLE `art_registry`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `art_work_name??` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `art_registry` ADD INDEX `art_registry_art_work_name??_index`(`art_work_name??`);
ALTER TABLE
    `art_registry` ADD PRIMARY KEY `art_registry_id_primary`(`id`);
CREATE TABLE `drinking_fountains`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `in_operation` VARCHAR(255) NOT NULL,
    `geom` POINT NOT NULL
);
ALTER TABLE
    `drinking_fountains` ADD PRIMARY KEY `drinking_fountains_id_primary`(`id`);
CREATE TABLE `password_reset`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL
);
ALTER TABLE
    `password_reset` ADD PRIMARY KEY `password_reset_id_primary`(`id`);
CREATE TABLE `artists`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` INT NOT NULL,
    `contact_url` INT NOT NULL
);
ALTER TABLE
    `artists` ADD PRIMARY KEY `artists_id_primary`(`id`);
ALTER TABLE
    `rooms` ADD CONSTRAINT `rooms_published_at_foreign` FOREIGN KEY(`published_at`) REFERENCES `users_demo`(`id`);
ALTER TABLE
    `reservations` ADD CONSTRAINT `reservations_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users_demo`(`id`);
ALTER TABLE
    `reservations` ADD CONSTRAINT `reservations_room_id_foreign` FOREIGN KEY(`room_id`) REFERENCES `rooms`(`id`);
ALTER TABLE
    `reviews` ADD CONSTRAINT `reviews_reservation_id_foreign` FOREIGN KEY(`reservation_id`) REFERENCES `reservations`(`id`);
ALTER TABLE
    `media` ADD CONSTRAINT `media_model_id_foreign` FOREIGN KEY(`model_id`) REFERENCES `reviews`(`id`);
ALTER TABLE
    `media` ADD CONSTRAINT `media_model_id_foreign` FOREIGN KEY(`model_id`) REFERENCES `rooms`(`id`);
ALTER TABLE
    `art_work` ADD CONSTRAINT `art_work_neighbourhood_calc_foreign` FOREIGN KEY(`neighbourhood_calc`) REFERENCES `neighbourhood`(`id`);
ALTER TABLE
    `favourites` ADD CONSTRAINT `favourites_art_work_foreign` FOREIGN KEY(`art_work`) REFERENCES `art_work`(`id`);
ALTER TABLE
    `art_registry` ADD CONSTRAINT `art_registry_art_work_name??_foreign` FOREIGN KEY(`art_work_name??`) REFERENCES `art_work`(`id`);