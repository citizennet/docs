# Other API calls

## Company Invoicing Contact Information

    https://citizennet.com/api/misc/companyinvoice/ID

GET

    {
      "first_name": "John", 
      "last_name": "Doe", 
      "email": "billing@example.com", 
      "organization": "Company Name", 
      "work_phone": "", 
      "home_phone": "", 
      "mobile": "310-555-1212", 
      "fax": "", 
      "p_street1": "", 
      "p_street2": "", 
      "p_city": "", 
      "p_state": "", 
      "p_code": "", 
      "p_country": "", 
      "s_street1": "", 
      "s_street2": "", 
      "s_city": "", 
      "s_state": "", 
      "s_code": "", 
      "s_country": "", 
      "language": "en", 
      "currency_code": "USD"
    }

(primary and secondary addresses)

POST - Update any field

## Company Credit Card Information

    https://citizennet.com/api/misc/companycreditcard/ID

GET

    {
      "object": "customer", 
      "delinquent": false, 
      "created": 1405984159, 
      "description": "test card", 
      "livemode": false, 
      "subscriptions": {
        "has_more": false, 
        "total_count": 0, 
        "object": "list", 
        "data": [], 
        "url": "/v1/customers/cus_4RjM7Bf8C3KHti/subscriptions"
      }, 
      "email": "vince@citizennet.com", 
      "default_card": "card_14IpwB4CUN5nHckRq3Guh17d", 
      "currency": null, 
      "account_balance": 0, 
      "cards": {
        "has_more": false, 
        "total_count": 1, 
        "object": "list", 
        "data": [
          {
            "customer": "cus_4RjM7Bf8C3KHti", 
            "address_line2": null, 
            "cvc_check": "pass", 
            "exp_month": 8, 
            "funding": "credit", 
            "name": "John Doe", 
            "address_line1_check": null, 
            "country": "US", 
            "brand": "Visa", 
            "object": "card", 
            "address_state": null, 
            "address_city": null, 
            "last4": "4242", 
            "address_line1": null, 
            "fingerprint": "jRxktEp9SxL4aSw7", 
            "address_zip_check": null, 
            "exp_year": 2016, 
            "address_country": null, 
            "id": "card_14IpwB4CUN5nHckRq3Guh17d", 
            "address_zip": null
          }
        ], 
        "url": "/v1/customers/cus_4RjM7Bf8C3KHti/cards"
      }, 
      "discount": null, 
      "id": "cus_4RjM7Bf8C3KHti", 
      "metadata": {}
    }


POST

    description - Account Sescription
    email - Email
    name - Cardholder Name
    number - Card Number
    exp_year - Expiration Year
    exp_month - Expiration Month
    cvc - CVC

DELETE

    true

## Bulk campaign creation

    https://citizennet.com/api/misc/bulkupload

### POST fields

 - csv - CSV file of campaigns
 - socialaccountid - Citizenet Social Account Id
 - adsaccountid - Facebook Ad Account
 - takecommission - 1 if budget should be reduced by commission rate
 - commission - Percentage to reduce budgets
 - testing - Route request to development server

### POST return

Array of campaigns as returned from Campaign API with additional fields:

 - lineno - corresponding line of CSV file.
 - error - error creating campaign.  If this exists, campaign failed.
 - warnings - Campaign created succesfully, but take a look at these warnings.

### CSV File Details

    https://citizennet.com/api/misc/bulkupload/doc

### CSV File Example

    https://citizennet.com/api/misc/bulkupload/example

## Google Geolocation Data

    GET https://citizennet.com/api/v2/backend/locationAutocomplete?location=

Accepts a location string, makes a call to Google Places Autocomplete service, and returns
the response in the format:

    {
      status: "OK",
      predictions: [
        {
         "description" : "Paris, France",
         "id" : "691b237b0322f28988f3ce03e321ff72a12167fd",
         "matched_substrings" : [
            {
               "length" : 5,
               "offset" : 0
            }
         ],
         "place_id" : "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
         "reference" : "CjQlAAAA_KB6EEceSTfkteSSF6U0pvumHCoLUboRcDlAH05N1pZJLmOQbYmboEi0SwXBSoI2EhAhj249tFDCVh4R-PXZkPK8GhTBmp_6_lWljaf1joVs1SH2ttB_tw",
         "terms" : [
            {
               "offset" : 0,
               "value" : "Paris"
            },
            {
               "offset" : 7,
               "value" : "France"
            }
         ],
         "types" : [ "locality", "political", "geocode" ]
        },
        ...additional results
      ]
    }

For more detailed information, visit the documentation at https://developers.google.com/places/web-service/autocomplete

    GET https://citizennet.com/api/v2/backend/geocodeFromId?id=

Accepts a `place_id` from Google Places API, makes a call to Google Places Details Service, and returns the response
in the format:

    {
       "html_attributions" : [],
       "result" : {
          "address_components" : [
             {
                "long_name" : "48",
                "short_name" : "48",
                "types" : [ "street_number" ]
             },
             {
                "long_name" : "Pirrama Road",
                "short_name" : "Pirrama Road",
                "types" : [ "route" ]
             },
             {
                "long_name" : "Pyrmont",
                "short_name" : "Pyrmont",
                "types" : [ "locality", "political" ]
             },
             {
                "long_name" : "NSW",
                "short_name" : "NSW",
                "types" : [ "administrative_area_level_1", "political" ]
             },
             {
                "long_name" : "AU",
                "short_name" : "AU",
                "types" : [ "country", "political" ]
             },
             {
                "long_name" : "2009",
                "short_name" : "2009",
                "types" : [ "postal_code" ]
             }
          ],
          "formatted_address" : "48 Pirrama Road, Pyrmont NSW, Australia",
          "formatted_phone_number" : "(02) 9374 4000",
          "geometry" : {
             "location" : {
               "lat" : -33.8669710,
               "lng" : 151.1958750
             }
          },
          "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
          "id" : "4f89212bf76dde31f092cfc14d7506555d85b5c7",
          "international_phone_number" : "+61 2 9374 4000",
          "name" : "Google Sydney",
          "place_id" : "ChIJN1t_tDeuEmsRUsoyG83frY4",
          "scope" : "GOOGLE",
          "alt_ids" : [
             {
                "place_id" : "D9iJyWEHuEmuEmsRm9hTkapTCrk",
                "scope" : "APP"
             }
          ],
          "rating" : 4.70,
          "reference" : "CnRsAAAA98C4wD-VFvzGq-KHVEFhlHuy1TD1W6UYZw7KjuvfVsKMRZkbCVBVDxXFOOCM108n9PuJMJxeAxix3WB6B16c1p2bY1ZQyOrcu1d9247xQhUmPgYjN37JMo5QBsWipTsnoIZA9yAzA-0pnxFM6yAcDhIQbU0z05f3xD3m9NQnhEDjvBoUw-BdcocVpXzKFcnMXUpf-nkyF1w",
          "reviews" : [
             {
                "aspects" : [
                   {
                      "rating" : 3,
                      "type" : "quality"
                   }
                ],
                "author_name" : "Simon Bengtsson",
                "author_url" : "https://plus.google.com/104675092887960962573",
                "language" : "en",
                "rating" : 5,
                "text" : "Just went inside to have a look at Google. Amazing.",
                "time" : 1338440552869
             },
             {
               "aspects" : [
                  {
                     "rating" : 3,
                     "type" : "quality"
                  }
                 ],
                "author_name" : "Felix Rauch Valenti",
                "author_url" : "https://plus.google.com/103291556674373289857",
                "language" : "en",
                "rating" : 5,
                "text" : "Best place to work :-)",
                "time" : 1338411244325
             },
             {
               "aspects" : [
                  {
                     "rating" : 3,
                     "type" : "quality"
                  }
                 ],
                "author_name" : "Chris",
                "language" : "en",
                "rating" : 5,
                "text" : "Great place to work, always lots of free food!",
                "time" : 1330467089039
             }
          ],
          "types" : [ "establishment" ],
          "url" : "http://maps.google.com/maps/place?cid=10281119596374313554",
          "vicinity" : "48 Pirrama Road, Pyrmont",
          "website" : "http://www.google.com.au/"
       },
       "status" : "OK"
    }

## Reach Estimates for the Influencer Tool

    https://citizennet.com/api/v2/backend/audienceReach

GET

*Required Params (one of the following must be specified in the call)*

* `keyword`  - If no other parameters are passed in, all reach in the US for a keyword will be returned
* `fbpages` - If no other parameters are passed in, all reach in the US for the facebook page will be returned

*Optional Params (any combination of the following params may be passed in, along with one of the required params)*

* `gender`   - Reach will be limited by gender (options are `male` and `female`)
* `age`  - Reach will be limited to the specified age range
* `countries` - Reach will be limited to specified list of two letter country codes. If not specified, the default will be set to `US`. 
* `languages` - Reach will be limited based on the specified languages, written out in English

*Example Call (this will return the reach for the keyword "Superman" for males between the ages of 20 and 35 that speak Spanish in the US and UK)*

    GET https://citizennet.com/api/v2/backend/audienceReach?keyword=superman&gender=male&age=20-35&languages=Spanish&countries=US,GB

*Response*

    {
      "reach": 94000, 
      "reach_percentage": 0.08545454545454545
    }

###BATCH CALLS for Audience Reach

    https://citizennet.com/api/v2/batch

POST

*Post Data*

* `batch` - Specify this key with an array of objects that contain the audienceReach endpoint and params

*Objects to Specify inside `batch` key*

* `endpoint` - The URL for the endpoint with the params you would like data on
* `method` - For the audienceReach endpoint, this should always be set to `GET`
* `id` - This can be any string of characters. It will be returned with the response to indicate which call yields which results

*Example Batch Call (this will return the total reach for the facebook page "Superman" as well as the data broken down by gender)*

    POST https://citizennet.com/api/v2/batch

  Post Data:

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
          "endpoint":"backend/audienceReach?fbpage=superman&gender=male&access_token=:access_token”,
          ”method":"GET"
        }
      ]
    }

*Example Results*

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

For more detailed information, visit the documentation at https://developers.google.com/places/web-service/details