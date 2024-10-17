const axios = require("axios");
const fs = require("fs");
const { convertDataToCsv } = require("../utils/dataToCsv");
const { createMultipleHotels } = require("../daos/hotel");

const url = "https://www.tripadvisor.com.vn/data/graphql/ids";

const headers = {
  accept: "*/*",
  "accept-language": "en-US,en;q=0.9,vi;q=0.8",
  "content-type": "application/json",
  cookie:
    "cookie: TASameSite=1; TAUnique=%1%enc%3A6h4qdYXlBJKPRnpxHe4cd3S0TtsW%2By45AuwxWVSWWum6f%2BVTGkO6kGdun0CwbQ%2FQNox8JbUSTxk%3D; TASSK=enc%3AANo%2BEhnhGa10vBLnQs%2BHhotQpWV6jjTTnQ3qKNrpZwN9e6C%2Bj%2Bcs6YDbICqgG%2FY2R%2BqLOIDoHRYS1nqWzdTVnMnLZEI9FBqJBaL4H88F3Jq4yAu2C75sOAOqcBbfU1ThfQ%3D%3D; TART=%1%enc%3Al76Cf1qb5KYigylQ4btkHDcwWpWbrRUsxdMI43CQ%2FIlI9r3g1BbaNOy9xPDq3hHLwIxOoU9XJqM%3D; __hstc=54942388.175c10595132bd147436a82887e1d4dd.1728108747071.1728108747071.1728108747071.1; hubspotutk=175c10595132bd147436a82887e1d4dd; __hs_cookie_cat_pref=1:true_2:true_3:true; _ga_84DPMD7WH8=GS1.1.1728108733.1.1.1728109129.60.0.0; _ga=GA1.1.1293347454.1728108735; _gcl_au=1.1.797806773.1728109151; pbjs_sharedId=2dffa8ae-954f-40f1-9af8-68d3fbfc3177; pbjs_sharedId_cst=zix7LPQsHA%3D%3D; _lc2_fpi=b140173de591--01j9dna25ak6wb2ppjragprp4c; _lc2_fpi_meta=%7B%22w%22%3A1728109152426%7D; TATravelInfo=V2*AY.2024*AM.10*AD.18*DY.2024*DM.10*DD.25*A.2*MG.-1*HP.2*FL.3*DSM.1728177796252*RS.1; AMZN-Token=v2FweIBXcENPRDVUUDdQZWErYTJFN0xjcTltUmVocjJMMk03MjViUWpvOG92ZWFJYnNpQ3ErYlJBSkJuQjM4VTlIaUZINlhxSmpaK2dmbzRVaVE5M0M3eEZQQVA0d2xKTzEvK3d5cVdpSFhNSTVNR0pkNWdMSUI5S1NYK1U3WmFFaXNIa2JrdgFiaXZ4HDc3Kzk2TFd4YlhkWFVPKy92ZSsvdmUrL3ZRST3/; pbjs_unifiedID=%7B%22TDID%22%3A%227de04cc6-2fd2-4947-a966-b04d404e80b1%22%2C%22TDID_LOOKUP%22%3A%22TRUE%22%2C%22TDID_CREATED_AT%22%3A%222024-09-06T16%3A57%3A56%22%7D; pbjs_unifiedID_cst=zix7LPQsHA%3D%3D; _lr_env_src_ats=true; TADCID=VFRomBX_UdJ-CWilABQCrj-Ib21-TgWwDB4AzTFpg4DMAWOb83aAnqfTaI_hNWpH7Ll_9ZLyaowtzBWwz0mIUFm7HXF-n_wxnMw; TAAUTHEAT=oLmR-3eaaLtmF0bdABQCS_DXENAPSyOjZ55LXtF4ZECjAZhmL6Y7GpdzZIqTWjz6RFpepOgGR6aVc_zPhHGsZaeoI-51xohDzJWmdRYBfbV5b7CmxfANKfawhL_uPeDitqLKIqknEiz01ll89EJG-rxfZpFRiSstoW7Xcw9s-1SX3p2nEeBA_-6yxE1PMg8bmDTrQZBMM4JqUihUiN2A5-bVpYh4MAbb_nhR; TASID=B232336DBCB874C023FACA5A1E1B0D02; ServerPool=B; PMC=V2*MS.47*MD.20241005*LD.20241009; _li_dcdm_c=.tripadvisor.com; _lr_sampling_rate=100; pbjs_li_nonid=%7B%7D; pbjs_li_nonid_cst=zix7LPQsHA%3D%3D; TATrkConsent=eyJvdXQiOiJTT0NJQUxfTUVESUEiLCJpbiI6IkFEVixBTkEsRlVOQ1RJT05BTCJ9; TAReturnTo=%1%%^2FShowForum-g293923-i9984-Halong_Bay_Quang_Ninh_Province.html; roybatty=TNI1625^!AFvdxuhYK3W%2BKNTUTlCx%2BqBubTwB6qQAGUoPJeHEFMOnHho7PULG7wQU89%2BlV7cG9JG1ZOdqelcm5Brvrvw6VAppyiI6e72Zi6TRB3nuD1FffxO8UnjaEnOOKXK6bPPK9zptNFhdBniE2yeOOusF1r0A9UOAPrrCk2BiW8rKSeZoJedvgKhOizzXc%2FFu9Cb22Q%3D%3D%2C1; TAUD=LA-1728134369695-1*RDD-1-2024_10_05*ARDD-99170460-2024_10_18.2024_10_25*FO-330434457-HAN*FD-330434458-HAN*ARC-330543581*LG-331142612-2.1.F.*LD-331142619-2024.10.18.2024.10.25; PAC=APliCi9dDuykUnV1AIy_qgn4CREszX14fTaT408TJ_e3rgMJR-svtZEUDgiKaLdmxisxKQwyl7CLMUehi6PlfwUi7sRmsdT2bGm5nY46CH7RFOc_zHhA7E6DWtriAC7_Y5jm6XsK-Uhq-2tozcG2MzCcZDHXf5PT_5PyG9S709bgdwSd9rqmJaSk1bDyMGQEXZC4JZRG5pKOTD-wXXVjXRy0zEKSh0iMeqBmjc4icwjCiwMe0snqSLxeMKfuUIsybTuyC4zRmgyWuAwTZJATlFd2FgzpVQ-MLafvK-oKrdMofIoom5logQrgQLp_csu-jvmSWJrJYc8EFGXKD-o9wE8%3D; VRMCID=%1%V1*id.10568*llp.%2FAttraction_Review-g667467-d1177582-Reviews-Cox_s_Bazar_Beach-Cox_s_Bazar_Chittagong_Division%5C.html*e.1729071307107; OptanonConsent=isGpcEnabled=0&datestamp=Wed+Oct+09+2024+09%3A35%3A07+GMT%2B0700+(Indochina+Time)&version=202405.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=3F517A84DA5531D1A1C5157D7EC8DAA0&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1&AwaitingReconsent=false; _gcl_aw=GCL.1728441308.null; datadome=G3lUkp~96W4TC_~WAUCaLapbloSEtbuzo_HCfo9dQutw6GoTG0Mpk67CEBaf4TGx7Tkmdo4sj12TdtD9D2ijZtZY~ZQHjg_8mqav1RZurGDjlA1enZCNFATo_aLb15xA; __vt=q1GfjTzGHsgmsN7dABQCjdMFtf3dS_auw5cMBDN7STCp5cStKRxonJsVFP2lmiKImqvNmcjp1MwxL68kB2fmcNqbZJy3HvyIS0nmS48CaNdpo5-wy8bvDB6XpQwc_51jPEdcW4navhuSpFpUQQfPfNqrugN5FLK8zwQMhUBZQuucJvuuHmcj7eZuKkkXJf6f1q45q6PWJD7v_uebydU9BrP_u6BJ01F9Xudjes3t-22vZNVchxMjg8PdVKGUeY76S50c4Rw9Aeg_VEl4GikPK4mxDX1mEcY2uE3Nzee4LcVYCiNzxnWi-w; __gads=ID=4927cd62741422e7:T=1728134351:RT=1728468051:S=ALNI_MaaZkpU5BhjtUlnU7xnhp1B-f3e5g; __gpi=UID=00000f35d6b2fb6b:T=1728134351:RT=1728468051:S=ALNI_MZQ9VSrE9XM474DY9YsLVxBjOZPCw; __eoi=ID=643c76a60fdf29c3:T=1728134351:RT=1728468051:S=AA-AfjbhJqbkeG3Q8onChG5AtZ5m; ab.storage.deviceId.6e55efa5-e689-47c3-a55b-e6d7515a6c5d=%7B%22g%22%3A%229a323b0e-1c06-3e5c-98ea-383d14a19720%22%2C%22c%22%3A1728109155416%2C%22l%22%3A1728442863834%7D; ab.storage.userId.6e55efa5-e689-47c3-a55b-e6d7515a6c5d=%7B%22g%22%3A%22MTA%3A3F517A84DA5531D1A1C5157D7EC8DAA0%22%2C%22c%22%3A1728206627498%2C%22l%22%3A1728442863834%7D; _ga_QX0Q50ZC9P=GS1.1.1728438738.8.1.1728442864.47.0.0; ab.storage.sessionId.6e55efa5-e689-47c3-a55b-e6d7515a6c5d=%7B%22g%22%3A%22e92c83f4-70aa-0439-3ddf-754867d2b255%22%2C%22e%22%3A1728442880517%2C%22c%22%3A1728442863833%2C%22l%22%3A1728442865517%7D; TASession=V2ID.B232336DBCB874C023FACA5A1E1B0D02*SQ.61*LS.Hotels*HS.recommended*ES.popularity*DS.5*SAS.popularity*FPS.oldFirst*TS.3F517A84DA5531D1A1C5157D7EC8DAA0*FV.T*FA.1*DF.0*TRA.true*LD.264936*EAU.z; SRT=TART_SYNC; datadome=vClie3PdN18IPHrhh8mYGly7Wt~MXzUGnSi2d0paT~1Nl8hRJvsHtSDxo9yQ6X7LpdWv4W2tOSD5SpJu~N_fsXyot1wKYJcKdSnjGV3RF9O0BxQQbrC1w9Uvd8_F__dd; __vt=-AA_YBsz7nPa5hn-ABQCjdMFtf3dS_auw5cMBDN7STCq2UblSLO4XA5g_167lxZtXllNYHJvl7FZivcZ_Z3EVCPCaNwfJ5_sFSeeD4wIKPqd2If7uVx5pxYsrN70KGV7Mg6bK2Cy-0sq458Sx34NCRhSlYmT0yFS0zuw0huLSPVnzEYAMjwjQ2X6WWnflwR6_aTBpwiJnrDpYUZhaUWZ1HqWybx116bkAM2mF5J0vMdRzW9koeqnUDlieyMYQnk6bsQtDaIut8FnyeRS6DQm1i2lLI3lX6Z2g2aNPP0RVkEZdfcysFVecA",
  origin: "https://www.tripadvisor.com",
  priority: "u=1, i",
  referer: "https://www.tripadvisor.com/Hotels-g293924-oa30-Hanoi-Hotels.html",
  "sec-ch-device-memory": "8",
  "sec-ch-ua":
    '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
  "sec-ch-ua-arch": '"x86"',
  "sec-ch-ua-full-version-list":
    '"Google Chrome";v="129.0.6668.90", "Not=A?Brand";v="8.0.0.0", "Chromium";v="129.0.6668.90"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-model": '""',
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "same-origin",
  "sec-fetch-site": "same-origin",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
};

const getPayloadData = (numOffset) => {
  const data = [
    {
      variables: {
        geoId: 293924,
        blenderId: null,
        boundingBox: null,
        centerAndRadius: null,
        travelInfo: null,
        currency: "USD",
        pricingMode: null,
        filters: {
          selectTravelersChoiceWinner: false,
          selectTravelersChoiceBOTBWinner: false,
          minRating: null,
          neighborhoodsOrNear: null,
          priceRange: null,
          amenities: null,
          brands: null,
          classes: null,
          styles: null,
          hoteltypes: null,
          categories: null,
          anyTags: null,
          hotelowners: null,
        },
        offset: numOffset,
        limit: 30,
        sort: "BEST_VALUE",
        clientType: "DESKTOP",
        viewType: "LIST",
        productId: "Hotels",
        pageviewId: "LIT^@37dm01NLAuCYqtF9887p",
        sessionId: "B232336DBCB874C023FACA5A1E1B0D02",
        amenityLimit: 5,
        route: {
          page: "HotelsFusion",
          params: {
            pagee: "30",
            geoId: 293924,
            contentType: "hotel",
            webVariant: "HotelsFusion",
          },
        },
        userEngagedFilters: false,
        loadPoiThumbnail: false,
        loadLocationSEOData: true,
        loadLocationInfoData: false,
        loadNearbyPointOfInterestPlaceType: false,
        metaMarketingQueryString: "",
        loadReviewSubratingAvgs: false,
        showLowestPrice: false,
        polling: false,
        tertiaryOffers: false,
        includePhotoSizes: false,
        isMapView: false,
        requestNumber: 1,
      },
      extensions: {
        preRegisteredQueryId: "952d4855baa31f16",
      },
    },
  ];
  return data;
};

const writeToTxt = ({ name, data }) => {
  fs.writeFile(name, data, (err) => {
    if (err) {
      console.error("Error writing to file", err);
    } else {
      console.log("File written successfully");
    }
  });
};

const getListHotelsData = async () => {
  let dataListHotel = [];
  const fields = [
    "hotelResultKey",
    "locationId",
    "location",
    "resultDetail",
    "hotelHighlightLink",
  ];
  for (let i = 0; i < 90; i += 30) {
    try {
      const response = await axios.post(url, getPayloadData(i), headers);
      const rawData = response.data[0].data.list.results;
      dataListHotel = dataListHotel.concat(rawData);
      console.log("success offset", i, "---total data:", dataListHotel.length);
    } catch (e) {
      console.log("error", i);
    }
  }
  // remove hotel sponsor data
  dataListHotel = dataListHotel.filter((hotel) => {
    if (
      hotel.resultDetail?.merchandisingLabels?.length >= 1 &&
      hotel.resultDetail.merchandisingLabels[0]?.id === "SPONSORED"
    )
      return false;

    return true;
  });

  createMultipleHotels(dataListHotel);
  convertDataToCsv({ fields, data: dataListHotel });
  return dataListHotel;
};

const crawlHotelsData = async () => {
  const dataCrawl = getListHotelsData();
  return dataCrawl;
};

module.exports = { crawlHotelsData };
