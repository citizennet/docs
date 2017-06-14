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
