exports.up = function (knex) {
	return knex.schema.createTable("art_works", (table) => {
		table.increments("id").primary();
		table.string("registry_id");
		table.string("title");
		table.string("artists_id");
		table.string("artists_names");
		table.string("artist_statement");
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
		table.string("geom");
		table.string("geo_local_area");
		table.string("work_description");
		table.string("photo_credits");
		table.string("installation_year");
	});
};

exports.down = function (knex) {
};
  return knex.schema.dropTable("art_works");
