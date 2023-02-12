/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = function (knex) {
  return knex("tarifler")
    .insert([
      {
        tarif_adi: "Spagetti Bolonez Yapımı",
      },
    ])
    .then((res) => {
      return knex("adimlar").insert([
        {
          adim_sirasi: 1,
          adim_talimati: "Büyük bir tencereyi orta ateşe koyun",
          tarif_id: 1,
        },
        {
          adim_sirasi: 2,
          adim_talimati: "Zeytinyağı ve salça ekleyin",
          tarif_id: 1,
        },
        {
          adim_sirasi: 3,
          adim_talimati: "1 paket makarna ekleyin",
          tarif_id: 1,
        },
      ]);
    })
    .then((res) => {
      return knex("malzemeler").insert([
        {
          malzeme_adi: "zeytinyağı",
          birim: "litre",
        },
        {
          malzeme_adi: "salça",
          birim: "kaşık",
        },
        {
          malzeme_adi: "fiyonk makarna",
          birim: "paket",
        },
      ]);
    })
    .then((res) => {
      return knex("adimlar_malzemeler").insert([
        {
          adim_id: 2,
          malzeme_id: 1,
          miktar: 0.014,
        },
        {
          adim_id: 3,
          malzeme_id: 3,
          miktar: 1,
        },
        {
          adim_id: 2,
          malzeme_id: 2,
          miktar: 1,
        },
      ]);
    });
};