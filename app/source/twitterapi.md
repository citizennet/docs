# Twitter API documentatation

Twitter Campaigns
=========

Container for running ad campaigns on Twitter


### Getting A Twitter Campaign

##### `GET` _/twitter/campaigns/:id_

###### Returns a campaign object :

    {
    	"userId": 2583,
    	"updatedAt": "2015-12-07 18:34:13",
    	"bidUnit": null,
    	"id": 111094,
    	"createdAt": "2015-12-07 18:34:13",
    	"dataSources": null,
    	"dailyBudgetAmountLocalMicro": 100,
    	"bidAmountLocalMicro": "100",
    	"deliveryStatusUpdatedAt": null,
    	"deliveryStatus": null,
    	"platform": "twitter",
    	"objective": "TWEET_ENGAGEMENTS",
    	"deletedAt": null,
    	"status": null,
    	"targetingStatus": null,
    	"bidType": "MAX",
    	"tags": [],
    	"twCampaignId": null,
    	"startTime": "2015-12-08 18:34:02",
    	"groupId": 148569,
    	"categories": null,
    	"totalBudgetAmountLocalMicro": 100,
    	"endTime": "2015-12-18 18:34:04",
    	"name": "Sanket test creative",
    	"standardDelivery": 1,
    	"admin": {
    		"targeting_options": {
    			"behaviors": [],
    			"interests": [],
    			"campaign_engagement": [],
    			"tailored_audiences": [],
    			"gender": [],
    			"locations": [],
    			"platforms": [],
    			"followers_of_users": [],
    			"phrase_keywords": [],
    			"age_buckets": []
    		}
    	},
    	"chargeBy": null,
    	"advertiserDomain": null,
    	"optimization": "DEFAULT"
    }


### Creating A Twitter Campaign

##### `POST` _/twitter/campaigns_

###### Returns a new campaign object.


*Required Params*

* `name`
* `groupId`

### Updating A Twitter Campaign

##### `PUT` _/twitter/campaigns/:id_

###### Returns an updated campaign object.


### Deleting A Twitter Campaign

##### `DELETE` _/twitter/campaigns/:id_

###### 200 OK - "true"

### Get the Creatives for a Twitter Campaign

##### `GET` _/twitter/campaigns/:campaignId/creatives_

###### Returns a list of twitter creatives.

### Get the  Ads for a campaign

##### `GET` /twitter/campaigns/:campaignId/ads_

###### Returns a list of twitter ads.

Twitter Line Items
=========

Container for line items in Twitter campaign

### Getting A Twitter Line Item

##### `GET` _/twitter/lineItems/:id_

###### Returns a line item object :

    {
    	"campaignId": 111089,
    	"updatedAt": "2015-12-07 13:29:37",
    	"bidUnit": null,
    	"id": 283106,
    	"createdAt": "2015-12-04 13:23:50",
    	"tags": [],
    	"bidAmountLocalMicro": null,
    	"targetingCriteria": {
    		"behaviors": [{
    			"id": "lfrn",
    			"name": "Vehicle price: $30k to $40k"
    		}],
    		"interests": [{
    			"id": "20034",
    			"name": "Sports/Skiing"
    		}],
    		"campaign_engagement": [],
    		"tailored_audiences": [{
    			"id": "vrf",
    			"name": "when_the_game_stands_tall_hifr_tailored_1"
    		}, {
    			"id": "wuz",
    			"name": "bn_espn_top_100"
    		}],
    		"gender": [{
    			"id": 1,
    			"name": "Male"
    		}],
    		"locations": [{
    			"id": "b6b8d75a320f81d9",
    			"name": "Portland OR, USA",
    			"location_type": "CITY"
    		}],
    		"platforms": [{
    			"id": "1",
    			"name": "Android"
    		}],
    		"followers_of_users": [{
    			"screen_name": "aplusk",
    			"id": 19058681,
    			"name": "ashton kutcher"
    		}],
    		"phrase_keywords": [{
    			"id": "Kelly Clarkson",
    			"name": "Kelly Clarkson"
    		}],
    		"age_buckets": [{
    			"id": "AGE_18_TO_24",
    			"name": "18-24"
    		}]
    	},
    	"platform": "twitter",
    	"deletedAt": null,
    	"status": "PAUSED",
    	"bidType": null,
    	"twLineItemId": "3t86v",
    	"name": "Line Item Test",
    	"totalBudgetAmountLocalMicro": null,
    	"chargeBy": null,
    	"productType": "PROMOTED_TWEETS",
    	"placements": "ALL_ON_TWITTER"
    }


### Creating A Twitter Line Item

##### `POST` _/twitter/lineItems_

###### Returns a new line item object.


*Required Params*

* `name`
* `campaignId`

### Updating A Twitter Line Item

##### `PUT` _/twitter/lineItems/:id_

###### Returns an updated line item object.

### Deleting A Twitter Line Item

##### `DELETE` _/twitter/lineItem/:id_

###### 200 OK - "true"

### Get the  Ads for a Line Item

##### `GET` /twitter/lineItems/:line_item_id/ads_

###### Returns a list of twitter ads.

Twitter Creatives
=========

The creative for a twitter campaign/request.
These are tweets that will be promoted by the campaign.

###### Fields :

* `objectId` : The id of the tweet to promote
* `tags` : List of tags applied to the creative
* `typeName` : Type of Creative
* `tweet` : JSON containing data about the tweet
* `campaignId` : The id of the campaign which the creative is being applied to.
* `requestId` : The id of request the creative is applied to.

### Getting A Twitter Creative

##### `GET` _/twitter/creatives/:id_

###### Returns a creative object :

    {
	"objectId": "674420753878507520",
	"tags": [],
	"campaignId": 111094,
	"typeName": "Tweet",
	"tweet": {
		"previewCreatedAt": "2015-12-08 20:31:20",
		"promotedOnly": 1,
		"screenId": 217078325,
		"tweetId": "674420753878507520",
		"preview": [
		            {"platform": "web", 
		            "preview": "<blockquote class=\"twitter-tweet\" data-width=\"450\"><p lang=\"da\" dir=\"ltr\">Hearthstone Trolden !!<a href=\"https://t.co/XzOs3eOUKP\">https://t.co/XzOs3eOUKP</a></p>&mdash; Sanket (@ss81089) <a href=\"https://twitter.com/ss81089/status/694697089985437698\">February 3, 2016</a></blockquote>\n<script async src=\"//platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>"
		            }],
		"accountId": "18ce53wgm4r",
		"id": 114,
		"createdAt": "2015-12-09 02:50:12"
	},
	"platform": "twitter",
	"updatedAt": "2015-12-08 18:50:16",
	"deletedAt": null,
	"id": 130756,
	"createdAt": "2015-12-08 18:50:16"
    }

### Creating A Twitter Creative

##### `POST` _/twitter/creatives_

Required Fields :

* `objectId` : Id of the tweet (object) to be promoted. Optionally can also be passed in the tweet object viz `tweet`: { `tweet_id` : tweet_id } . 
* One of the following is required :
  * `campaignId` : Id of the twitter campaign the creative is to be added to.
  * `requestId` : Id of the request this creative is tied to.

Optional : 

* `skip_ad_generation` : Parameter to add creative but not generate ads ( Required in some cases)

###### Returns a new twitter creative object.

### Updating A Twitter Creative

##### `PUT` _/twitter/creatives/:id_

Supported fields:

* `campaignId`
* `objectId` or `tweet`.`tweet_id`

###### Returns an updated creative object.

### Deleting A Twitter Creative

##### `DELETE` _/twitter/creatives/:id_

###### 200 OK - "true"

### Get creatives for a request

##### `GET` _/twitter/creatives/request/:request_id_

###### Returns the creatives for a request.

### DELETE creatives for a request

##### `DELETE` _/twitter/creatives/request/:request_id_

###### 200. OK - "true"

Twitter Ads
===========

The ads or "promoted_tweets" for a twitter campaign.
These are the promoted tweets that connect the targeting (line item) and creative in the campaign.

###### Fields :

* `lineItemId` : The id of the Line Item under which the ad will run.
* `creativeId` : The id of the creative (tweet)  which is used to run the ad.
* `twAdId` : Id of the ad on twitter.
* `status` : Status of the Ad [READY,ACTIVE, PAUSED, DELETED]
* `approval_status` : Status indicating whether the Ad was approved or not
* `try_count` : Number of times we tried to upload the ad.
* `creative` : Expanded creative inline.

### Getting A Twitter Ad

##### `GET` _/twitter/ads/:id_

###### Returns a ad object :

    {
    "status": "READY",
    "adsetName": "Affinity Interests (79) > Cassadee Pope > 13-24 female",
    "campaignId": 2,
    "twAdId": null,
    "updatedAt": "2015-11-24 19:30:49",
    "creativeId": 130683,
    "id": 989425,
    "createdAt": "2015-11-24 19:25:09",
    "name": "Ad (27) - (130683)",
    "approvalStatus": null,
    "creative": {
      "platform": "twitter",
      "objectId": "583045072142270464",
      "tags": [],
      "campaignId": 19,
      "typeName": "Tweet",
      "tweet": {
        "previewCreatedAt": "2016-02-03 16:19:26",
        "promotedOnly": 1,
        "screenId": null,
        "tweetId": "583045072142270464",
        "preview": [
          {
            "platform": "web",
            "preview": "<blockquote class=\"twitter-tweet\" data-width=\"450\"><p lang=\"en\" dir=\"ltr\"><a href=\"https://twitter.com/Quora\">@Quora</a> .. Q : Why is Quora down ? <br> Want Answers 1000+</p>&mdash; Sanket (@ss81089) <a href=\"https://twitter.com/ss81089/status/583045072142270464\">March 31, 2015</a></blockquote>\n<script async src=\"//platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>"
          }
        ],
        "accountId": "18ce53xy5bu",
        "id": 272,
        "createdAt": "2016-02-03 16:19:26"
      },
      "requestId": null,
      "updatedAt": "2015-11-19 15:11:36",
      "deletedAt": null,
      "id": 130683,
      "createdAt": "2015-06-04 15:19:04"
    },
    "platform": "twitter",
    "lineItemId": 27,
    "campaignName": "Twiiter Ads Testing Campaign",
    "tryCount": 0,
    "deletedAt": null
    }

### Creating A Twitter Ad

This process is done automatically when LineItems ( targeting ) or Creative ( Tweets) are added / updated.

##### `POST` _/twitter/ads_

Required Fields :

* `lineItemId` : Id of the Line Item.
* `creativeId` : Id of the Creative.

###### Returns a new twitter ad object.

### Updating A Twitter Ad

##### `PUT` _/twitter/ad/:id_

Supported fields:

* `status`
* `lineItemId`
* `creativeId`

###### Returns an updated ad object.

### Deleting A Twitter Ad

##### `DELETE` _/twitter/ads/:id_

###### 200 OK - "true"

Twitter Autocomplete
====================

###### The Query string options are passed to Twitter , these are convenience wrappers for twitter endpoints.  

### Get Twitter targeting categories

##### `GET` _/twitter/targeting/categories_

###### Documentation :
https://dev.twitter.com/ads/reference/get/targeting_criteria/interests

##### `GET` _/twitter/targeting/locales_

###### Documentation : 
https://dev.twitter.com/ads/reference/get/targeting_criteria/languages

##### `GET` _/twitter/targeting/adgeolocation_

###### Documentation : 
https://dev.twitter.com/ads/reference/get/targeting_criteria/locations

### Get Twitter account custom audiences

##### `GET` _/socialAccounts/:id/twitterAdAccounts/:adsAccountId/targeting/customAudiences_

###### Documentation : 
https://dev.twitter.com/ads/reference/get/accounts/%3Aaccount_id/tailored_audiences

### Get Twitter Reach Esitimate

##### `GET` _/socialAccounts/:id/twitterAdAccounts/:adsAccountId/targeting/reachEstimate_

###### Documentation : 
https://dev.twitter.com/ads/reference/get/accounts/%3Aaccount_id/reach_estimate

##### `GET` _/twitter/groups/:groupid/targeting/:targetingtype_

###### Documentation :
Targeting types supported :
  * interests
  * languages
  * locations
  * behaviors
  * platform

Children Counts
==============

### Get the count of child elements within a container
e.g. the number of campaigns in a group, the number of ad sets in a list of campaigns, etc.

#### Twitter
##### `GET` _/twitter/childrenCounts_

#### Facebook
##### `GET` _/groups/childrenCounts_

Query String Parameters
-----------------------

*Required*
* `groupId`

*Optional*
* `campaignId` - a colon delimited list of campaign ids
* `adSetId` - a colon delimited list of ad set ids

###### Returns a JSON object in the format:
    {
      "campaigns": 10,
      "adSets": 24,
      "ads": 45
    }

Twitter Users
================

### Search for twitter users 

#### `GET` _/twitter/users_

* `q` : Query string to search for user on twitter

###### Returns a list of matching users 

### Get twitter user from screenName or userId

#### `GET` _/twitter/user_

* `screenName` 
* `userId`

###### Returns the corresponding twitter user.

Pagination 
==========
Twitter supports cursor based pagination, 
The following `GET` endpoints support pagination :

* `GET` /twitter/tweets

Paging parameters :

* `paging` : Indicates using paging
* `cursor` : Cursor used to paginate through result pages. Will be empty when there are no more results

###### Returns a results along with pagination information :

    {
    "paging" :
      { 
      "cursor" : 5453556666777
      },
    "data" :[  ]
    }

Tweets 
======

### Create a Tweet

#### `POST` _twitter/tweets_

Required : 

* `status` : Text of the tweet

Optional :

* `asUserId` : Publish the tweet as the specified user
* `mediaIds` : Comma separated list of media ids ( Images ) Eg : 65534375343324000
* `videoId` :  When publishing video , this the media Id of the video being uploaded to twitter
  * Can be existing twiter video id  Eg : 21ea3ccd-b344-45fb-a93f-5e74689db2b1
  * Can be media id associated with new unpublished video Eg : 65534344343434000
* `videoTitle` : Title for the associated video 
* `videoDescription` : Short description about the video 
* `videoCta` : The call to action type on the video
* `videoCtaValue` : The actual text of the call to action
* `promotedOnly` : Indicate whether the tweet is a promoted only tweet or organic
* `card` : JSON field containing card params.
  Attach a card to the tweet. 
  * Create a new card :
    * Website : https://dev.twitter.com/ads/reference/post/accounts/%3Aaccount_id/cards/website
  * Use Existing card :
    * id : CitizenNet Id of the Twitter Card is required.

###### Returns the published tweet along with preview.

### Get a published Tweet 

#### `GET` _/twitter/tweets/:tweet_id

* `campaignId` or `socialAccountId` or `groupId` is needed

###### Returns the Tweet along with a preview.

### Get a list of Tweets 

#### `GET` _/twitter/tweets_

Required :

* `campaignId` or `socialAccountId` and `accountId` 

Optional :

* Supports pagination

###### Returns the Tweet along with a preview.
