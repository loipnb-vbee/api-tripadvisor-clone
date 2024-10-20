const restaurantDaos = require("../daos/restaurant");
const { convertDataToCsv } = require("../utils/dataToCsv");
const callApi = require("../utils/callApi");

const url = "https://www.tripadvisor.com.vn/data/graphql/ids";

const cookie =
  "TADCID=QiOcY5aG82pb9VnAABQCrj-Ib21-TgWwDB4AzTFpg4DR_zah0g8GjkwHdi2yq8JlZQ1mE2fjdBEdMjPVAKGGSia7c2ONGHfEQ0E; TASameSite=1; TAUnique=%1%enc%3AFCIJLVGI5PqcYJv3F58IcqNEnaIHHSGzuNwujT9YhMZNyhb1gZxEoBDfg9r80XwANox8JbUSTxk%3D; __vt=u2W11Viwc0fs6K4GABQCjdMFtf3dS_auw5cMBDN7STCvn0oOCEv87Nffhi7Pnrgqt2SW3UOOQ-EtPUXqgbJQP6Bb92IqfP2AYkrNLumZUb--KuFLIexwd0wEzJnCf0Y2KvVkuU5wCpDg3AmpblVyudK_; TASSK=enc%3AAEn5MO71DPTWNZVjkct0xLlPUWiJyP4bSOob%2F%2FH%2Br%2FsflMsPTRIYKgxIQ9XHCWLqvHLerlbB0JTrONdfEO%2FRUVK0fEfwdaQGTA2jX9XKCKfDX99xtCcGZquaD4y0dascgA%3D%3D; SRT=TART_SYNC; ServerPool=R; PMC=V2*MS.86*MD.20241010*LD.20241010; TART=%1%enc%3Al76Cf1qb5Kb4Z6xp5sq5SPEgdo2dUYKITEwT6hUbS5gv5Z5b%2BWCt3U9889dxYq84t6PHzGcgs5w%3D; TATravelInfo=V2*A.2*MG.-1*HP.2*FL.3*RS.1; TAUD=RDD-1728556007783-2024_10_10; TASID=799924DAF7174363853154512428EB8D; TATrkConsent=eyJvdXQiOiJTT0NJQUxfTUVESUEiLCJpbiI6IkFEVixBTkEsRlVOQ1RJT05BTCJ9; ab.storage.deviceId.6e55efa5-e689-47c3-a55b-e6d7515a6c5d=%7B%22g%22%3A%2215710543-cdff-268e-5594-e51afa7d6cc4%22%2C%22c%22%3A1728555985206%2C%22l%22%3A1728555985206%7D; TASession=V2ID.799924DAF7174363853154512428EB8D*SQ.2*LS.Restaurants*HS.recommended*ES.popularity*DS.5*SAS.popularity*FPS.oldFirst*FA.1*DF.0*TRA.true*LD.293924*EAU._; PAC=ALUyg9gwSrFk3wIk-C6lf7CqLJnFwDcsE9gr4oCeaWxo107GrNluicDAaPBktP-q3ydBbTEEC6biIZ8aseimEz59r7XjuKXcq9zNDWAvc14mcEzM5ZUNDBx6YPFbeUYljYGzjq7f656v-zqCqz1pYbqc9KEs75jyJ5VP--xKrJvi; _gcl_aw=GCL.1728555985.null; _gcl_au=1.1.605136022.1728555985; _ga=GA1.1.1826757619.1728555986; pbjs_sharedId=e1690a24-e471-4391-8ef1-72d9c8e4f727; pbjs_sharedId_cst=zix7LPQsHA%3D%3D; _li_dcdm_c=.tripadvisor.com.vn; _lc2_fpi=28c87295fd99--01j9tzeavpbprfr74fdntjv84j; _lc2_fpi_meta=%7B%22w%22%3A1728555985783%7D; ab.storage.sessionId.6e55efa5-e689-47c3-a55b-e6d7515a6c5d=%7B%22g%22%3A%222913f830-c598-08a8-2b4f-998f9ff9dee2%22%2C%22e%22%3A1728556001601%2C%22c%22%3A1728555985203%2C%22l%22%3A1728555986601%7D; __gads=ID=eaee7416a6cc66bd:T=1728556011:RT=1728556011:S=ALNI_MZBwVTTSHz5WgCq4UTX7MgOA6F9_Q; __gpi=UID=00000f3cece555f0:T=1728556011:RT=1728556011:S=ALNI_MYKevB1fpUpm6uwsdI49_lWbh9BaA; __eoi=ID=df1e66984d57eb0a:T=1728556011:RT=1728556011:S=AA-AfjZjDHNxsyNPaHt5-9Eewi3q; _lr_sampling_rate=100; _lr_retry_request=true; _lr_env_src_ats=false; pbjs_unifiedID=%7B%22TDID%22%3A%222a5a9677-393c-4a1e-987b-786a87871197%22%2C%22TDID_LOOKUP%22%3A%22FALSE%22%2C%22TDID_CREATED_AT%22%3A%222024-10-10T10%3A26%3A58%22%7D; pbjs_unifiedID_cst=zix7LPQsHA%3D%3D; pbjs_li_nonid=%7B%7D; pbjs_li_nonid_cst=zix7LPQsHA%3D%3D; datadome=0DvE4E1BRSwe_p97Gj6M5JPCNLh5P5v_M6TbyeOlt9FnY7jVqg_WqE4e7xQ7neJs~DsqyNyWrnaIPLXSVBHbrXgq7Y1vKcCvfS0F_vjJA_6tgJJRThh1pvM9kJAlNpsN; _ga_QX0Q50ZC9P=GS1.1.1728555985.1.0.1728555997.48.0.0; __vt=wvvKEwVucYf7pJ9MABQCjdMFtf3dS_auw5cMBDN7STCvrP5gX5dPabfmMgahhtB-gXdU2a8c5IGfuRpR3lxNUJPqN3dyAHj9XND12vVWmBnSkqUJysefCWMool5ii95wFiH7IGfHbRLPfTwBkYfh0DgR";

const headers = {
  accept: "*/*",
  "accept-language": "vi-VN,vi;q=0.9",
  "content-type": "application/json",
  cookie: cookie,
  origin: "https://www.tripadvisor.com.vn",
  priority: "u=1, i",
  referer: "https://www.tripadvisor.com.vn/Restaurants-g293924-oa30-Hanoi.html",
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

const getPayloadRestaurants = (offset) => {
  const payload = [
    {
      variables: {
        limit: 30,
        racRequest: null,
        route: {
          page: "Restaurants",
          params: {
            geoId: 293924,
            offset: String(offset),
          },
        },
        additionalSelections: [
          {
            facet: "ESTABLISHMENT_TYPES",
            selections: ["10591"],
          },
        ],
      },
      extensions: {
        preRegisteredQueryId: "8d8e5fae60f5d8c3",
      },
    },
  ];
  return payload;
};

const getListRestaurantsData = async () => {
  let listRestaurants = [];
  let offsetFail = [];
  const fields = [
    "locationId",
    "name",
    "detailPageRoute",
    "location",
    "menu",
    "offers",
    "cuisines",
    "establishmentTypes",
    "priceTypes",
    "openHours",
    "reviewSummary",
    "thumbnail",
    "taLocation",
    "reviewSnippetsV2",
    "storyboardStatus",
    "isPremium",
    "isLocalChef",
  ];
  for (let i = 0; i < 90; i += 30) {
    try {
      const response = await callApi({
        method: "POST",
        url,
        headers,
        data: getPayloadRestaurants(i),
      });
      const rawData = response[0].data.response.restaurants;
      listRestaurants = listRestaurants.concat(rawData);
    } catch (e) {
      offsetFail.push(i);
    }
  }

  while (offsetFail.length > 0) {
    console.log({ offsetFail });
    try {
      const response = await callApi({
        method: "POST",
        url,
        headers,
        data: getPayloadRestaurants(offsetFail[0]),
      });
      const rawData = response[0].data.response.restaurants;
      listRestaurants = listRestaurants.concat(rawData);
      offsetFail.shift();
    } catch (e) {
      console.log(e);
    }
  }
  // remove hotel sponsor data
  listRestaurants = listRestaurants.filter(
    (restaurant) => restaurant?.isSponsoredListing !== true
  );

  await restaurantDaos.createMultipleRestaurants(listRestaurants);
  convertDataToCsv({ fields, data: listRestaurants });
  return listRestaurants;
};

const crawlRestautantsData = async () => {
  const dataCrawl = await getListRestaurantsData();
  return dataCrawl;
};

module.exports = { crawlRestautantsData };
