exports.up = function (knex) {
	return knex.schema.createTable("art_works", (table) => {
		table.increments("id").primary();
		table.integer("registry_id");
		table.string("title");
		table.integer("artists_id");
		table.string("artists_names");
		table.text("artist_statement");
		table.string("type");
		table.string("status");
		table.string("site_name");
		table.string("address");
		table.string("primary_material");
		table.string("url");
		table.string("photo_url");
		table.string("photo_url_jpg");
		table.string("ownership");
		table.string("neighbourhood");
		//table.string("geom");
		table.bigInteger("lat");
		table.bigInteger("lon");
		// table.specificType("geom", "integer ARRAY"); //
		table.string("geo_local_area");
		table.text("work_description");
		table.string("photo_credits");
		table.integer("installation_year");
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("art_works");
};
