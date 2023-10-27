$(document).ready(function () {
  let $body = $("body");

  $(".search-button").on("click", function () {
    let country = $("input[name=country]").val();
    console.log(country);
    if (!country) {
      alert("Please Enter Country!");
      return false;
    }

    // $body.addClass("loading-ilustrasi");
    getDataCovid(country);
  });

  async function getDataCovid(country) {
    const url = `https://covid-193.p.rapidapi.com/statistics?country=${country}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ea85fa75bemshe16f70c27a0e7c1p14297cjsn4be0d5593afd",
        "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
      },
    };

    try {
      let response = await fetch(url, options);
      let result = await response.json();
      // await $body.removeClass("loading-ilustrasi");
      await setData(result);
    } catch (error) {
      console.error(error);
    }
  }

  function setData(data) {
    if (data.results > 0) {
      let datacovid = data.response[0];
      $("#negara").text("Country : " + datacovid.country);
      $(".totalCases").text(
        formatNumber(datacovid.cases.total) + " " + "Total Kasus"
      );
      $(".newCases").text(
        formatNumber(datacovid.cases.new) || "Tidak Ada Kasus Baru"
      );
      $(".activeCases").text(
        formatNumber(datacovid.cases.active) + " " + "Kasus Aktif"
      );
      $(".recoveredCases").text(
        formatNumber(datacovid.cases.recovered) + " " + "Sembuh"
      );
      $(".totalDeaths").text(
        formatNumber(datacovid.deaths.total) + " " + "Total Kematian"
      );
      $(".totalTests").text(
        formatNumber(datacovid.tests.total) + " " + "Total Tes"
      );
    } else {
      $("#date").hide();
      alert("Data Tidak Ditemukan");
    }
  }

  function formatNumber(number) {
    if (number === null) {
      return null;
    }
    return number.toLocaleString("id-ID");
  }
});
