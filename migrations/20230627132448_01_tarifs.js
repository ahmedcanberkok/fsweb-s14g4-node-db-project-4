/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("tarif", t=> {
        t.increments("tarif_id")
        t.string("tarif_adi").notNullable()
        t.timestamp("kayit_tarihi").notNullable().defaultTo(knex.fn.now())
        
    })
    .createTable("adimlar", t=> {
        t.increments("adim_id")
        t.integer("adim_sirasi").notNullable()
        t.string("adim_talimati").notNullable()
        t.integer("tarif_id").references("tarif_id").inTable("tarif")
        .onDelete("CASCADE") //RESRİCT //cascade kullanırsak ilişkili adimlarla ilişkili olanlarda silinir.
    })
    .createTable("icindekiler", t=> {
        t.increments("icindekiler_id")
        t.string("icindekiler_adi").notNullable()
    })
    .createTable("icindekiler_adimlar",t => {
        t.increments("icindekiler_adimlar_id")
        t.decimal("miktar").notNullable()
        t.integer("icindekiler_id").references("icindekiler_id").inTable("icindekier")
        t.integer("adim_id").references("adim_id").inTable("adimlar")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("icindekiler_adimlar")
                    .dropTableIfExists("icindekiler")
                    .dropTableIfExists("adimlar")
                    .dropTableIfExists("tarif")
};
