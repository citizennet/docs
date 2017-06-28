# Influencer API Calls

## Authentication

Send your access token with each request as part of the request header.

`Authorization: Token YOUR_ACCESS_TOKEN`

You may also alternatively send it via a query param.

`?access_token=YOUR_ACCESS_TOKEN`

###### **401 - Unauthorized** is returned if an invalid auth token is used.

### SSL

Requests to the CitizenNet API should always be made via an https request.

`https://citizennet.com/api/v2/...`


## Reach Estimates


```
GET https://citizennet.com/api/v2/backend/audienceReach
```

*Required Params (one of the following must be specified in the call)*

* `keyword`  - If no other parameters are passed in, all reach in the US for a keyword will be returned
* `fbpages` - If no other parameters are passed in, all reach in the US for the facebook page will be returned

*Optional Params (any combination of the following params may be passed in, along with one of the required params)*

* `gender`   - Reach will be limited by gender (options are `male` and `female`)
* `age`  - Reach will be limited to the specified age range
* `countries` - Reach will be limited to specified list of two letter country codes. If not specified, the default will be set to `US`. 
* `languages` - Reach will be limited based on the specified languages, written out in English

**Example Call (this will return the reach for the keyword "Superman" for males between the ages of 20 and 35 that speak Spanish in the US and UK)**

```
GET https://citizennet.com/api/v2/backend/audienceReach?keyword=superman&gender=male&age=20-35&languages=Spanish&countries=US,GB
```

*Example Response*

```
{
  "reach": 94000, 
  "reach_percentage": 0.08545454545454545
}
```


## Batch Calls for Reach Estimates

```
POST https://citizennet.com/api/v2/batch
```


*Post Data*

* `batch` - Specify this key with an array of objects that contain the audienceReach endpoint and params

*Objects to Specify inside `batch` key*

* `endpoint` - The URL for the endpoint with the params you would like data on
* `method` - For the audienceReach endpoint, this should always be set to `GET`
* `id` - This can be any string of characters. It will be returned with the response to indicate which call yields which results

**Example Batch Call (this will return the total reach for the facebook page "Superman" as well as the data broken down by gender)**

```
POST https://citizennet.com/api/v2/batch
```

Post Data: 

```
{
  "batch": [
    {
      "id":"superman",
      "endpoint":"backend/audienceReach?fbpage=superman&access_token=:access_token”,
      ”method":"GET"
    },
    {
      "id":"male",
      "endpoint":"backend/audienceReach?fbpage=superman&gender=male&access_token=:access_token”,
      ”method":"GET"
    },
    {
      "id":"female",
      "endpoint":"backend/audienceReach?fbpage=superman&gender=female&access_token=:access_token”,
      ”method":"GET"
    }
  ]
}
```

*Example Response*

```
[
    {
        "status": 200,
        "body": {
            "reach": 1100000
        },
        "id": "superman"
    },
    {
        "status": 200,
        "body": {
            "reach": 820000
        },
        "id": "male"
    },
    {
        "status": 200,
        "body": {
            "reach": 290000
        },
        "id": "female"
    }
]
```

## Influencer Stats


```
GET/POST https://citizennet.com/api/v2/backend/influencerStats
```

This endpoint will return stats on a list of influencers, optionally compared against a _core_.

# JSON interface

The input should be a json object.  Output will be a list of objects.

* `metrics` - list of metrics to return (`remote_id` in `metrics` table)
* `dimensions` - list of dimensions to return (`remote_id` in `metrics` table)
* `keywords` - list of influencer arrays (influencer name, facebook page)
* `topics` - list of topics.  Influencers related to this will be found
* `topic_type` - Type of influencers to take from a topics search.
* `targeting_spec` - targeting spec (json) to apply to all stats
* `core_spec` - targeting spec (json) to apply to _core_ stats
* `coreinterest` - Interest to apply to _core_ stats
* `corefbpage` - Facebook page to apply to _core_ stats
* `age` - Applies to all stats
* `gender` - Applies to all stats

# CSV interface

Lists are comma-separated, output will be in CSV

* `ids` - List of metric ids
* `dimension` - List of metric ids
* `keywords` - List of url-encoded influencers (should still be url-encoded after first normal urldecoding)
* `fbpages` - List of facebook pages, corresponding with influencer names
* `targetingSpec` - targeting spec (json).  Core will be taken from `flexible_spec` and `custom_audeinces` within

**Example JSON Call**

```
POST https://citizennet.com/api/v2/backend/influencerStats
{
  "core_spec": {
    "flexible_spec": [
      {
        "custom_audiences": [
          {
            "time_updated": 1498514576,
            "account_id": "992682360780356",
            "name": "Step - Trailer 1 Completers",
            "permission_for_actions": {
              "can_see_insight": true,
              "can_edit": true,
              "supports_recipient_lookalike": false,
              "can_share": true,
              "subtype_supports_lookalike": true
            },
            "approximate_count": 249000,
            "id": "6082891836895",
            "subtype": "ENGAGEMENT",
            "operation_status": {
              "code": 200,
              "description": "Normal"
            },
            "delivery_status": {
              "code": 200,
              "description": "This audience is ready for use."
            },
            "data_surce": {
              "type": "EVENT_BASED",
              "sub_type": "ENGAGEMENT_EVENTS",
              "creation_params": "{\"prefill\":\"true\"}"
            },
            "description": ""
          }
        ]
      }
    ]
  },
  "metrics": [
    "rel_age_group_interest",
    "reach.male..false",
    "reach.female..false",
    "reachpct..13-18.false",
    "reachpct..18-24.false",
    "reachpct..25-34.false",
    "reachpct..35-44.false",
    "reachpct..45-54.false",
    "reachpct..55-64.false",
    "reach...false"
  ],
  "dimensions": [
    "influencer"
  ],
  "keywords": [
    [
      "20th Century Women",
      ""
    ],
    [
      "A Most Wanted Man (film)",
      null
    ],
    [
      "A24",
      null
    ],
    [
      "Alamo Drafthouse",
      null
    ],
    [
      "All Is Lost",
      null
    ]
  ],
  "targeting_spec": {
    "flexible_spec": [],
    "connections": [],
    "publisher_platforms": [
      "facebook"
    ],
    "geo_locations": {
      "countries": [],
      "location_types": [
        "home",
        "recent"
      ],
      "regions": [],
      "custom_locations": [],
      "zips": [],
      "cities": [],
      "geo_markets": []
    },
    "excluded_custom_audiences": [],
    "friends_of_connections": [],
    "excluded_connections": [],
    "device_platforms": [
      "desktop",
      "mobile"
    ],
    "user_os": [],
    "facebook_positions": [
      "feed"
    ],
    "genders": [],
    "exclusions": {},
    "locales": []
  }
}
```

*Example Response*

```
[
  {
    "age_group_interest": 0.004137931034482759, 
    "fbpage": "", 
    "influencer": "20th Century Women", 
    "interest": "20th Century Women", 
    "reach...false": 29000, 
    "reach.female..false": 29000, 
    "reach.male..false": 29000, 
    "reachpct..13-18.false": 0.00896551724137931, 
    "reachpct..18-24.false": 0.15517241379310345, 
    "reachpct..25-34.false": 0.25517241379310346, 
    "reachpct..35-44.false": 0.2206896551724138, 
    "reachpct..45-54.false": 0.16896551724137931, 
    "reachpct..55-64.false": 0.1103448275862069, 
    "rel_age_group_interest": 1.0
  }, 
  {
    "age_group_interest": 0.0, 
    "fbpage": null, 
    "influencer": "A Most Wanted Man (film)", 
    "interest": "A Most Wanted Man (film)", 
    "reach...false": 280, 
    "reach.female..false": 280, 
    "reach.male..false": 280, 
    "reachpct..13-18.false": 0.0, 
    "reachpct..18-24.false": 0.10714285714285714, 
    "reachpct..25-34.false": 0.25, 
    "reachpct..35-44.false": 0.14285714285714285, 
    "reachpct..45-54.false": 0.17857142857142858, 
    "reachpct..55-64.false": 0.17857142857142858, 
    "rel_age_group_interest": 0.0
  }, 
  {
    "age_group_interest": 0.0022340425531914895, 
    "fbpage": null, 
    "influencer": "A24", 
    "interest": "A24", 
    "reach...false": 94000, 
    "reach.female..false": 94000, 
    "reach.male..false": 94000, 
    "reachpct..13-18.false": 0.011702127659574468, 
    "reachpct..18-24.false": 0.2872340425531915, 
    "reachpct..25-34.false": 0.3829787234042553, 
    "reachpct..35-44.false": 0.19148936170212766, 
    "reachpct..45-54.false": 0.07553191489361702, 
    "reachpct..55-64.false": 0.023404255319148935, 
    "rel_age_group_interest": 0.5398936170212766
  }, 
  {
    "age_group_interest": 0.001142857142857143, 
    "fbpage": null, 
    "influencer": "Alamo Drafthouse", 
    "interest": "Alamo Drafthouse", 
    "reach...false": 140000, 
    "reach.female..false": 140000, 
    "reach.male..false": 140000, 
    "reachpct..13-18.false": 0.002785714285714286, 
    "reachpct..18-24.false": 0.06857142857142857, 
    "reachpct..25-34.false": 0.38571428571428573, 
    "reachpct..35-44.false": 0.36428571428571427, 
    "reachpct..45-54.false": 0.15714285714285714, 
    "reachpct..55-64.false": 0.04857142857142857, 
    "rel_age_group_interest": 0.2761904761904762
  }, 
  {
    "age_group_interest": 0.0, 
    "fbpage": null, 
    "influencer": "All Is Lost", 
    "interest": "All Is Lost", 
    "reach...false": 4300, 
    "reach.female..false": 4300, 
    "reach.male..false": 4300, 
    "reachpct..13-18.false": 0.09302325581395349, 
    "reachpct..18-24.false": 0.12790697674418605, 
    "reachpct..25-34.false": 0.23255813953488372, 
    "reachpct..35-44.false": 0.19767441860465115, 
    "reachpct..45-54.false": 0.1883720930232558, 
    "reachpct..55-64.false": 0.1511627906976744, 
    "rel_age_group_interest": 0.0
  }
]
```

**Example CSV Call**

```
GET https://citizennet.com/api/v2/backend/influencerStats?ids=3579%2C3671%2C3687%2C3707%2C3709%2C3711%2C3713%2C3715%2C3717%2C3655&dimension=3497&access_token=066df2708af310044cb8e4f039024cc64517bf8c2631565e53a6f60f04ad07e7&filters=%5B%7B%22hash%22%3A1613453028%7D%5D&targetingSpec=%7B%22device_platforms%22%3A%5B%22desktop%22%2C%22mobile%22%5D%2C%22publisher_platforms%22%3A%5B%22facebook%22%5D%2C%22facebook_positions%22%3A%5B%22feed%22%5D%2C%22geo_locations%22%3A%7B%22location_types%22%3A%5B%22home%22%2C%22recent%22%5D%7D%2C%22exclusions%22%3A%7B%7D%2C%22flexible_spec%22%3A%7B%22interests%22%3A%5B%7B%22id%22%3A%226003446117053%22%2C%22name%22%3A%22Maria+Semple%22%7D%5D%2C%22connections%22%3A%5B%5D%2C%22custom_audiences%22%3A%5B%5D%7D%7D&keywords=Moschino%2CPacSun%2CWet%2520Seal%2CA%25C3%25A9ropostale%2520(clothing)%2CUrban%2520Outfitters%2CRue21%2CForever%252021%2CCharlotte%2520Russe%2520(clothing%2520retailer)%2CMissguided%2CAmerican%2520Apparel%2CJuicy%2520Couture%2CFendi%2CHollister%2520Co.%2CPrimark%2CFrench%2520Connection%2520(clothing)%2CAmerican%2520Eagle%2520Outfitters%2CKohl%27s%2CValentino%2520SpA%2CBrooks%2520Brothers%2CMissoni%2CSears%2CNordstrom%2CJ.Crew%2CH%2526M%2CCalvin%2520Klein%2CASOS.com%2CMacy%27s%2COld%2520Navy%2CUniqlo%2CDiesel%2520(brand)%2CMango%2520(clothing)%2CTopshop%2CBloomingdale%27s%2CLevi%2520Strauss%2520%2526%2520Co.%2CGuess%2520(clothing)%2CPrada%2CBarneys%2520New%2520York%2CTopman%2CDolce%2520%2526%2520Gabbana%2CMiss%2520Selfridge%2CBergdorf%2520Goodman%2CArmani%2CRiver%2520Island%2Czara%2CLord%2520%2526%2520Taylor%2CSaks%2520Fifth%2520Avenue%2CClub%2520Monaco%2CT.J.Maxx%2CJ.%2520C.%2520Penney%2CPull%2520%2526%2520Bear%2CNew%2520Look%2520(company)%2CMarshalls%2CHugo%2520Boss%2CVersace%2CBershka%2CDorothy%2520Perkins%2CLacoste%2CGap%2520Inc.%2CRoberto%2520Cavalli%2CZara%2520(retailer)%2CNeiman%2520Marcus%2CRalph%2520Lauren%2520Corporation%2CDillard%27s%2CTed%2520Baker%2CBanana%2520Republic%2CErmenegildo%2520Zegna%2CAnn%2520Inc.%2CBebe%2520Stores%2CChico%27s%2520(clothing%2520retailer)%2CBulgari%2CDKNY%2CAbercrombie%2520%2526%2520Fitch&fbpages=&plannerId=2144
```

*Example Response*

```
3579,3671,3687,3707,3709,3711,3713,3715,3717,3655,3497
0.2427,93000,210000,0.0207,0.3667,0.4000,0.1467,0.0600,0.0220,300000,Moschino
0.1825,210000,370000,0.0930,0.6491,0.2807,0.0439,0.0193,0.0074,570000,PacSun
0.2080,10000,340000,0.0514,0.4571,0.3429,0.1229,0.0486,0.0251,350000,Wet Seal
,,,,,,,,,,AÃ©ropostale (clothing)
0.4739,130000,650000,0.0873,0.5190,0.3418,0.0899,0.0392,0.0152,790000,Urban Outfitters
0.2158,41000,480000,0.0830,0.4151,0.3585,0.1434,0.0547,0.0174,530000,Rue21
0.2680,150000,2400000,0.0808,0.5000,0.3654,0.0885,0.0338,0.0131,2600000,Forever 21
0.1891,11000,760000,0.0740,0.4416,0.4286,0.0935,0.0351,0.0092,770000,Charlotte Russe (clothing retailer)
,1100,35000,0.0333,0.3889,0.4444,0.1278,0.0472,0.0122,36000,Missguided
0.2955,550000,330000,0.0148,0.1932,0.3636,0.2386,0.1250,0.0557,880000,American Apparel
0.2080,44000,1300000,0.0608,0.3846,0.4077,0.1462,0.0608,0.0215,1300000,Juicy Couture
0.5893,140000,450000,0.0250,0.1300,0.3000,0.2667,0.1533,0.0717,600000,Fendi
0.1285,480000,1200000,0.3294,0.5882,0.2294,0.0941,0.0418,0.0082,1700000,Hollister Co.
0.3467,16000,100000,0.0708,0.3083,0.4167,0.1833,0.0642,0.0225,120000,Primark
0.5547,94000,200000,0.0213,0.1700,0.3067,0.2700,0.1533,0.0500,300000,French Connection (clothing)
0.1877,940000,3100000,0.0854,0.4146,0.2927,0.1415,0.0780,0.0293,4100000,American Eagle Outfitters
0.2389,870000,6500000,0.0149,0.1041,0.2568,0.2432,0.2027,0.1203,7400000,Kohl's
0.5426,45000,190000,0.0187,0.2391,0.3652,0.2348,0.1261,0.0313,230000,Valentino SpA
0.5032,200000,120000,0.0065,0.1419,0.2742,0.2097,0.1742,0.1226,310000,Brooks Brothers
0.7429,8800,130000,0.0038,0.0707,0.2071,0.2643,0.2429,0.1429,140000,Missoni
0.7045,1100000,2000000,0.0100,0.1097,0.2806,0.2355,0.1581,0.1290,3100000,Sears
0.4160,990000,7400000,0.0224,0.1765,0.3176,0.2353,0.1412,0.0788,8500000,Nordstrom
0.6455,260000,2600000,0.0166,0.1655,0.3448,0.2586,0.1379,0.0517,2900000,J.Crew
0.3152,550000,2600000,0.0406,0.2812,0.4375,0.1938,0.0500,0.0187,3200000,H&M
0.4091,350000,1100000,0.0480,0.2667,0.3067,0.2200,0.1267,0.0460,1500000,Calvin Klein
0.2340,260000,890000,0.0833,0.3417,0.4583,0.1167,0.0300,0.0117,1200000,ASOS.com
0.2687,1600000,10000000,0.0183,0.1500,0.2667,0.2167,0.1833,0.0917,12000000,Macy's
0.2262,190000,3800000,0.0138,0.1825,0.4000,0.3000,0.0875,0.0325,4000000,Old Navy
0.9244,230000,380000,0.1016,0.3333,0.4127,0.1587,0.0524,0.0222,630000,Uniqlo
0.3514,520000,230000,0.0270,0.2162,0.3649,0.2568,0.1162,0.0351,740000,Diesel (brand)
0.4727,13000,94000,0.0255,0.2364,0.4364,0.2000,0.0736,0.0236,110000,Mango (clothing)
0.4264,200000,810000,0.0390,0.2900,0.3900,0.2000,0.0910,0.0310,1000000,Topshop
0.4593,190000,1000000,0.0083,0.1167,0.3167,0.2667,0.1750,0.0750,1200000,Bloomingdale's
0.3640,1000000,1200000,0.0186,0.3091,0.4273,0.1500,0.0864,0.0368,2200000,Levi Strauss & Co.
0.2600,1300000,3600000,0.0542,0.3542,0.3333,0.1604,0.0792,0.0479,4800000,Guess (clothing)
0.4853,320000,870000,0.0142,0.1583,0.3083,0.2500,0.1583,0.0833,1200000,Prada
0.8758,120000,260000,0.0092,0.1579,0.2895,0.2342,0.1579,0.0921,380000,Barneys New York
0.6067,110000,5200,0.0608,0.5083,0.4417,0.0375,0.0074,0.0022,120000,Topman
0.3714,360000,1100000,0.0221,0.2071,0.3929,0.2357,0.1214,0.0421,1400000,Dolce & Gabbana
,160,4100,0.2558,0.2558,0.4186,0.1791,0.0767,0.0302,4300,Miss Selfridge
0.8036,19000,200000,0.0039,0.0818,0.3000,0.2455,0.1864,0.1273,220000,Bergdorf Goodman
0.2971,690000,750000,0.0186,0.2357,0.4000,0.2286,0.0929,0.0357,1400000,Armani
,7900,28000,0.1833,0.3611,0.3333,0.1528,0.0778,0.0389,36000,River Island
,6900,22000,0.0586,0.4138,0.4138,0.1448,0.0345,0.0076,29000,zara
0.5414,90000,640000,0.0086,0.1123,0.1918,0.1781,0.1918,0.1918,730000,Lord & Taylor
0.4955,360000,1400000,0.0065,0.0941,0.3059,0.2588,0.1765,0.1000,1700000,Saks Fifth Avenue
0.7172,16000,41000,0.0084,0.1897,0.4483,0.2241,0.0897,0.0345,58000,Club Monaco
0.2758,57000,2200000,0.0037,0.0426,0.3348,0.2870,0.2174,0.0826,2300000,T.J.Maxx
0.2800,610000,4600000,0.0192,0.1019,0.2692,0.2500,0.1904,0.1058,5200000,J. C. Penney
,570,1700,0.1435,0.5217,0.2957,0.1348,0.0435,,2300,Pull & Bear
,170,180,,,0.2286,0.3143,0.2286,0.0857,350,New Look (company)
0.3600,64000,1200000,0.0038,0.0438,0.3385,0.3231,0.2077,0.0515,1300000,Marshalls
0.4353,240000,190000,0.0100,0.1535,0.4419,0.2558,0.1140,0.0256,430000,Hugo Boss
0.2998,670000,1100000,0.0141,0.2235,0.4235,0.2294,0.1118,0.0347,1700000,Versace
1.0000,11000,41000,0.0750,0.4231,0.4038,0.1096,0.0346,0.0108,52000,Bershka
,280,10000,0.0130,0.1400,0.4400,0.2500,0.1400,0.0390,10000,Dorothy Perkins
0.2487,310000,150000,0.0215,0.2391,0.4348,0.2174,0.0739,0.0239,460000,Lacoste
0.4513,59000,470000,0.0164,0.1453,0.3774,0.2642,0.1208,0.0679,530000,Gap Inc.
0.7924,40000,170000,0.0105,0.1190,0.3571,0.3238,0.1667,0.0333,210000,Roberto Cavalli
0.5728,110000,570000,0.0362,0.2174,0.3768,0.2174,0.0957,0.0464,690000,Zara (retailer)
0.5720,160000,1300000,0.0031,0.0521,0.2071,0.2286,0.2000,0.1714,1400000,Neiman Marcus
,30,,,,,,,,40,Ralph Lauren Corporation
0.2506,98000,740000,0.0118,0.1133,0.2289,0.2169,0.1928,0.1446,830000,Dillard's
0.9905,44000,160000,0.0210,0.2286,0.3619,0.2476,0.1048,0.0333,210000,Ted Baker
0.3445,290000,1300000,0.0088,0.0375,0.3563,0.3312,0.2125,0.0406,1600000,Banana Republic
,53000,7700,0.0103,0.0567,0.1833,0.4000,0.2333,0.1033,60000,Ermenegildo Zegna
0.5943,82000,1300000,0.0079,0.0657,0.2929,0.2929,0.1929,0.0857,1400000,Ann Inc.
0.2956,59000,890000,0.0147,0.1579,0.4000,0.2211,0.0968,0.0632,950000,Bebe Stores
0.5812,120000,1600000,0.0212,0.0647,0.1000,0.1294,0.2000,0.2353,1700000,Chico's (clothing retailer)
0.3181,180000,680000,0.0060,0.1765,0.4235,0.2471,0.1106,0.0259,850000,Bulgari
0.2364,37000,620000,0.0098,0.1818,0.4242,0.2273,0.0985,0.0333,660000,DKNY
0.2160,400000,870000,0.0508,0.4692,0.3231,0.1154,0.0469,0.0131,1300000,Abercrombie & Fitch
```
