const axios = require("axios");
const fs = require("fs");
const hotelDaos = require("../daos/hotel");
const hotelReviewDaos = require("../daos/reviewHotel");
const { convertDataToCsv } = require("../utils/dataToCsv");
const callApi = require("../utils/callApi");
const hotel = require("../models/hotel");

const url = "https://www.tripadvisor.com.vn/data/graphql/ids";

const headers = {
  accept: "*/*",
  "accept-language": "vi-VN,vi;q=0.9",
  "content-type": "application/json",
  cookie:
    "TADCID=148YEs3pMJLXAwvfABQCrj-Ib21-TgWwDB4AzTFpg4DQeuT8kgyTvnLGr1Y96hToTxp5Blqf3bv9VHJvU7wb6OexfTXeeyuYS8o; TASameSite=1; TAUnique=%1%enc%3AiJdnJcRcpovoBMcx%2F%2BnMzVjg6G61ITK%2BDgsCbeDqErJx8dOFpRT5QqlTTL25TK4iNox8JbUSTxk%3D; __vt=9v1wmFbV5SHRUPV3ABQCjdMFtf3dS_auw5cMBDN7STCuGpAnhNuIfJwKHWEqK8oYeQR7OVZhCQzbrGjOfXQKk8ajaQbVrNXWPN_wbMIaM3vaC6PmG9pfuNVVfqil_DRPGzr8q_RL5CsE7hvlik2Ed7luVcg; TASSK=enc%3AACCGayAHYp2uxzKUUo377%2FBBR3%2FRWfH%2BTakybrQjAwNW2bFt%2B3vroFZoZwLKzRRqxPUK0ReuJTfGJbK%2FcbukVVxmoS0%2B1dkNqPVtrJknBBtQsY11XAF7crhdokOPTXmt%2Fw%3D%3D; SRT=TART_SYNC; ServerPool=B; PMC=V2*MS.41*MD.20241009*LD.20241009; TART=%1%enc%3Al76Cf1qb5KYsE4CmLm5SuYhvD4ou0nWFhBQ4ftLnvCxFNjHIOWLjwQy4xV7UCLpBsLmhmuuL53M%3D; TATravelInfo=V2*A.2*MG.-1*HP.2*FL.3*RS.1; TASID=852D65A2D140474093650D4F58DD4870; TATrkConsent=eyJvdXQiOiJTT0NJQUxfTUVESUEiLCJpbiI6IkFEVixBTkEsRlVOQ1RJT05BTCJ9; PAC=ACacXfmqJux72X5JzzAvmsNt42dQCCWL2ZiihbbpzbuJEiuhjS9yDIau3Gi3JCRUJWwFg0SSk_OGt29Tyf6Da5DxxJk0ihkxtGpZOmb5OV3odSyU3Ks-C5vLjs86QxefsSRF5QbgthDQ7MCOCibmGNn-iAMfOmD0kCQfVVbJaw9qpis7EsmlO2AxwEnq0kZi8SAVcjA5ae7CWr6D-dAW0KA-_To5NOwzubXqWt_0S8xv; _gcl_au=1.1.475903296.1728507440; _ga=GA1.1.186934307.1728507440; pbjs_sharedId=1f8a7fbc-7024-4929-924b-b0079ad8148c; pbjs_sharedId_cst=zix7LPQsHA%3D%3D; _li_dcdm_c=.tripadvisor.com; _lc2_fpi=b140173de591--01j9sh4tx6ef0y2km6htpaksj4; _lc2_fpi_meta=%7B%22w%22%3A1728507440039%7D; __gads=ID=60ca5518060e2424:T=1728532641:RT=1728532641:S=ALNI_MYnTaZELgRyUSROE-j6K0WGg22DCw; __gpi=UID=00000f27aeabf567:T=1728532641:RT=1728532641:S=ALNI_MYkoB5jwOHkcf0ROB5-Y_WhAAcTnQ; __eoi=ID=dd519b99ad9b2e46:T=1728532641:RT=1728532641:S=AA-Afjaq2efFgnC58Y2JvGo3AXUd; _lr_sampling_rate=100; _lr_retry_request=true; _lr_env_src_ats=false; pbjs_unifiedID=%7B%22TDID%22%3A%2291e7dc2e-7369-4543-b4fd-011e5e96989b%22%2C%22TDID_LOOKUP%22%3A%22FALSE%22%2C%22TDID_CREATED_AT%22%3A%222024-10-10T03%3A57%3A27%22%7D; pbjs_unifiedID_cst=zix7LPQsHA%3D%3D; pbjs_li_nonid=%7B%7D; pbjs_li_nonid_cst=zix7LPQsHA%3D%3D; ab.storage.deviceId.6e55efa5-e689-47c3-a55b-e6d7515a6c5d=%7B%22g%22%3A%2272d32065-43be-bbd5-d075-0bc2da93b292%22%2C%22c%22%3A1728507439146%2C%22l%22%3A1728507487956%7D; TAUD=LA-1728532686155-1*RDD-1-2024_10_10*LG-25095-2.1.F.*LD-25096-.....; _gcl_aw=GCL.1728507513.null; TASession=V2ID.852D65A2D140474093650D4F58DD4870*SQ.6*LS.Hotel_Review*HS.recommended*ES.popularity*DS.5*SAS.popularity*FPS.oldFirst*FA.1*DF.0*TRA.true*LD.27424393*EAU._; _ga_QX0Q50ZC9P=GS1.1.1728507439.1.1.1728507525.34.0.0; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Oct+10+2024+03%3A58%3A52+GMT%2B0700+(Indochina+Time)&version=202405.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=101b7cc2-20c4-4aa0-86ee-8cc7645e3f28&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1&AwaitingReconsent=false; ab.storage.sessionId.6e55efa5-e689-47c3-a55b-e6d7515a6c5d=%7B%22g%22%3A%2219561ed6-2afa-cffb-143a-8e4fa80b972d%22%2C%22e%22%3A1728507553311%2C%22c%22%3A1728507532137%2C%22l%22%3A1728507538311%7D; datadome=tmCRhYTkFy0yNfWxzxoNsNYof_ioI69Sa2HnJwypmqafCY0CAqQIb4fmuShBDbuy9_NMVeQiC0wIiX1a5iOdvEeE_fVJ17CibqseOCfk1oLZgzdWalOUs9JDogOZv2Tq; datadome=vClie3PdN18IPHrhh8mYGly7Wt~MXzUGnSi2d0paT~1Nl8hRJvsHtSDxo9yQ6X7LpdWv4W2tOSD5SpJu~N_fsXyot1wKYJcKdSnjGV3RF9O0BxQQbrC1w9Uvd8_F__dd; __vt=I16aLUogLF7Y-25BABQCjdMFtf3dS_auw5cMBDN7STCuLE6X1EXaHW95FnSnwxyQm02EKatpg1tluvHSHnL7qyoFvqhmrGjU3MP-Th1SFDc2tiIsXPSGnIzva_fqJp_xi7EQz2qmIYQgx_HwYZpgKf-CB7M",
  origin: "https://www.tripadvisor.com",
  priority: "u=1, i",
  referer:
    "https://www.tripadvisor.com/Hotel_Review-g293924-d27424393-Reviews-or50-Eliana_Premio_Hanoi_Hotel-Hanoi.html",
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

const getPayloadReview = ({ hotelId, limit, offset }) => {
  const payload = [
    {
      variables: {
        hotelId: hotelId,
        limit: limit, // 0->20
        offset: offset,
        filters: [
          {
            axis: "LANGUAGE",
            selections: ["vi"],
          },
        ],
        language: "vi",
      },
      extensions: {
        preRegisteredQueryId: "b8bc339a61f4ea2e",
      },
    },
  ];
  return payload;
};

const getTotalReviewHotel = async (hotelId) => {
  const response = await callApi({
    method: "POST",
    url,
    headers,
    data: getPayloadReview({ hotelId, limit: 1, offset: 1 }),
  });

  return response?.[0]?.data?.reviewsProxyGetReviewListPageForLocation?.[0]
    ?.totalCount;
};

const getReviewEachHotel = async (hotelId) => {
  const totalVnReview = await getTotalReviewHotel(hotelId);

  let dataReviews = [];
  let offsetReviewsFail = [];
  for (let i = 0; i < totalVnReview; i += 10) {
    try {
      const response = await callApi({
        method: "POST",
        url,
        headers,
        data: getPayloadReview({ hotelId, limit: 10, offset: i }),
      });
      const dataReview =
        response?.[0]?.data?.reviewsProxyGetReviewListPageForLocation?.[0]
          ?.reviews;
      dataReviews = dataReviews.concat(dataReview);
    } catch (e) {
      offsetReviewsFail.push(i);
    }
  }

  while (offsetReviewsFail.length > 0) {
    try {
      const response = await callApi({
        method: "POST",
        url,
        headers,
        data: getPayloadReview({
          hotelId,
          limit: 10,
          offset: offsetReviewsFail[0],
        }),
      });
      const dataReview =
        response?.[0]?.data?.reviewsProxyGetReviewListPageForLocation?.[0]
          ?.reviews;
      dataReviews = dataReviews.concat(dataReview);
      offsetReviewsFail.shift();
    } catch (e) {
      console.log({ offsetReviewsFail }, { hotelId });
    }
  }

  await hotelReviewDaos.createMultipleHotelReview(dataReviews);

  console.log(
    "totalVnReview",
    totalVnReview,
    "dataReviews",
    dataReviews.length
  );
  return dataReviews;
};

const crawlReviewsHotel = async () => {
  const locationIds = await hotelDaos.findListLocationIds();

  let dataReviewsTotal = [];
  let locationIdsCallFail = [];

  for (let i = 0; i < locationIds.length; i++) {
    try {
      const dataReviews = await getReviewEachHotel(locationIds[i]);
      dataReviewsTotal = dataReviewsTotal.concat(dataReviews);
      console.log("crawl in", i, "total locations", locationIds.length);
    } catch (e) {
      locationIdsCallFail.push(locationIds[i]);
    }
  }

  while (locationIdsCallFail.length > 0) {
    try {
      const dataReviews = await getReviewEachHotel(locationIdsCallFail[0]);
      dataReviewsTotal = dataReviewsTotal.concat(dataReviews);
      locationIdsCallFail.shift();
      console.log(
        "re crawl in",
        locationIdsCallFail[0],
        "list location fail",
        locationIdsCallFail
      );
    } catch (e) {
      console.log({ locationIdsCallFail });
    }
  }

  const fields = [
    "id",
    "reviewDetailPageWrapper",
    "location",
    "createdDate",
    "publishedDate",
    "provider",
    "userProfile",
    "rating",
    "publishPlatform",
    "title",
    "language",
    "originalLanguage",
    "translationType",
    "roomTip",
    "tripInfo",
    "additionalRatings",
    "text",
    "username",
    "locationId",
    "mcid",
    "mtProviderId",
    "photos",
    "helpfulVotes",
    "labels",
    "alertStatus",
    "submissionDomain",
  ];
  console.log("dataReviewsTotal", dataReviewsTotal.length);
  convertDataToCsv({ fields, data: dataReviewsTotal });

  return dataReviewsTotal;
};

module.exports = { crawlReviewsHotel };
