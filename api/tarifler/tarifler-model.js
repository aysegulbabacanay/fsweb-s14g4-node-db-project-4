const db = require("../../data/db-config");

exports.getTarifId = async (tarif_id) => {
  const rows = await db("tarifler as ta")
    .leftJoin("adimlar as ad", "ta.tarif_id", "ad.tarif_id")
    .leftJoin("adimlar_malzemeler as adm", "ad.adim_id", "adm.adim_id")
    .leftJoin("malzemeler as ma", "adm.malzeme_id", "ma.malzeme_id")

    //select ile çıktıyı nasıl istediğimizi yazarız.
    .select(
      "ta.tarif_adi",
      "ta.tarif_id",
      "ta.kayıt_tarihi",
      "ad.adim_id",
      "ad.adim_sirasi",
      "ad.adim_talimati",
      "ma.malzeme_id",
      "ma.malzeme_adi",
      "ma.birim",
      "adm.miktar")
    .where("ta.tarif_id", tarif_id);

  const result = {
    tarif_id: rows[0].tarif_id,
    tarif_adi: rows[0].tarif_adi,
    kayit_tarih: rows[0].kayıt_tarihi,
    adimlar: [],
  };
  rows.forEach((row) => {
    const adim = {
      adim_sirasi: row.adim_sirasi,
      adim_id: row.adim_id,
      adim_talimati: row.adim_talimati,
      icindekiler: [],
    };
    // ilk defa gelen adım malzeme yok
    if (!row.malzeme_adi) {
      result.adimlar.push(adim);
    }
    // ilk defa gelen adım malzeme var
    else if (!result.adimlar.find((ilkadim) => ilkadim.adim_id === row.adim_id)) {
        adim.icindekiler.push({
        icindekiler_id: row.malzeme_id,
        icindekiler_adi: row.malzeme_adi,
        miktar: row.miktar,
        birim: row.birim,
      });
      result.adimlar.push(adim);
    }

    // eski adım malzeme var
    else {
      result.adimlar.find((eskiadim) => eskiadim.adim_id === row.adim_id)
        .icindekiler.push({
          icindekiler_id: row.malzeme_id,
          icindekiler_adi: row.malzeme_adi,
          miktar: row.miktar,
          birim: row.birim,
        });
    }
  });
  return result;
};