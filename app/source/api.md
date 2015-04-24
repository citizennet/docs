The Basics
==========

Getting started with the CitizenNet API

Authentication
--------------


### Access Token

Send your access token with each request as part of the request header.

`Authorization: Token YOUR_ACCESS_TOKEN`

You may also alternatively send it via a query param.

`?access_token=YOUR_ACCESS_TOKEN`

###### **401 - Unauthorized** is returned if an invalid auth token is used.

Access tokens have a default expiration time of 30 minutes. This time will be bumped back to 30 minutes each
subsequent time a successful call is made with it.

### Authorization

Use HTTP [HTTP Basic Authentication](http://en.wikipedia.org/wiki/Basic_access_authentication) to first obtain an access token.

Example Header:
`Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==`

**request a new access token**
##### `POST` _/users/authenticate_

###### **200 OK** - returns your user object with access token


**invalidate access token**
##### `POST` _/users/logout_

###### **200 OK** - "user logged out"


### SSL

Requests to the CitizenNet API should always be made via an https request.

`https://citizennet.com/api/v2/...`

API Responses
-------------

The API only makes use of only three HTTP status codes. An object with a more
descriptive key `message` will be returned with any error responses.  An
`error_code` is also returned for matching more specific error conditions.

* `200 - OK: Everything worked as expected`
* `400 - Client Error: Often missing a required parameter`
* `500 - Server Error: something is wrong on CitizenNet’s end`

Successful calls return a JSON object:

    {
      "status": 200
      "message": "You Updated Things!"
    }
    
Errors return a JSON object:

    {
      "status": 400
      "error": "A description of the error",
    }

JSON data object keys will be camel cased and objects will be title cased.

    {
      "id": 55,
      "campaignName": "This is a Name",
      "Group": {
        "id": 10
        "groupName": "My Group Name"
      }
    }

Query String Parameters
-----------------------

These parameters can be applied to any API call to modify the resulting data set.


### Limit

`?limit=10`

Limit the number of results returned to `10`.

When omitted, the default is set to `25`.

### Skip

`?skip=50`

Return results starting at the 50th item in the data set.

Use this parameter to paginate through a lengthy list of results.

### Paging Data

`?paging=true`

Return pagination meta data for building pagination controls. API results are placed into a new key `data`
and pagination metadata is returned in a new key `paging`.

Example:

    {
      "data": ...,
      "paging": {
          "count": 181,
          "last": 61,
          "limit": 3,
          "skip": 1
        }
    }

### Dates

Limit results based on date.

`?dates=1352359716:1353396516`

Return results between two timestamps

`?dates=1352359716:`

Return results starting at timestamp 1352359716

`?dates=:1353396516`

Return results up until the timestamp 1353396516


### Fields

Return only the data fields you need for a given request. This is very helpful in limiting the
size of your requests.

`?fields=name:startDate:budget`

Return only the name, startDate, and budget fields.


Users
=====

Users only have access to other users in their own company.

### Getting One User

##### `GET` _/users/:id_

###### Returns a single user object

### Getting Currently Authenticated User


##### `GET` _/me_

###### Returns a single user object

### Getting All Users For A Company

##### `GET` _/users_

###### Returns a list of user profile objects for a company

_Admins may get users from other companies_


### Updating A User

##### `PUT` _/users/:id_

###### Returns the updated user profile object


### Changing a User Password

##### `POST` _/users/:id/password_

* `oldPassword` - the current users password
* `newPassword` - the desired new password

###### 200 OK - "user password has been updated"


### Inviting A User (Creating)

##### `POST` _/users/invite_

* `email` - where to send invite
* `defaultRoles` - list of roles to assign user

###### Returns a new user profile object


### Deleting A User

##### `DELETE` _/users/:id_

_Users are only soft-deleted in the system_

###### `user has been deleted`


Companies
=========

Top level container for all Facebook ad products


### Getting A Company

##### `GET` _/companies/:id_

###### returns a company object.

###### `invoicingType` - Invoicing method

    `1` - Credit card.  1 invoice per campaign, charged on stripe a few days later

| **Monthly**                                | 1 invoice per group | 1 invoice per company |
|--------------------------------------------|---------------------|-----------------------|
| **full spend of campaign ending in month** | `2`                 | `5`                   |
| **spend of campaigns within month**        | `3`                 | `4`                   |



### Getting All Companies (_admin only_)

##### `GET` _/companies_

###### Returns all companies


Social Accounts
---------------

### Getting Social Accounts For A Company

##### `GET` _/companies/:id/socialAccounts_

###### Returns a list of social accounts

### Getting Social Accounts For One User
##### `GET` _/users/:id/socialAccounts_

###### Returns a list of social accounts

### Getting Social Accounts For Currently Authenticated User
##### `GET` _/me/socialAccounts_

###### Returns a list of social accounts


### Creating Accounts

##### `POST` _/companies/:id/socialAccounts_

###### Returns new social account object


### Updating Accounts

##### `PUT` _/socialAccounts/:id_

###### Returns a updated of social account object


### Deleting Accounts

##### `DELETE` _/socialAccounts/:id_

######  `social account has been deleted`


Ads Accounts
------------

##### `GET` _/socialAccounts/:id/adAccounts_

###### Returns a list of ad account objects

_Note: may return a 400 error if the call to Facebook is not successful_


##### `GET` _/socialAccounts/:id/hasAdsAccountAccess/:adsAccountId_

###### Returns a boolean value if social account has access to the ads account

    {
      "status": 200
      "message": true
    }


Offsite Tracking Pixels
-----------------------

### All Pixels
##### `GET` _/socialAccounts/:id/adAccounts/:id/offsitepixels_

###### Returns a list of tracking pixel objects

### A Single Pixel
##### `GET` _/socialAccounts/:id/adAccounts/:id/offsitepixels/:id_

###### Returns a single tracking pixel object


User Relationships (admin only)
-------------------------------

Allows a user to access and be a part of multiple companies.

### Creating Relationships

##### `POST` _/users/:id/relationships_

###### Returns new relationship object

### Deleting Relationships

##### `DELETE` _/users/:id/relationships/:id_

###### "relationship deleted"


### Get All Relationships

##### `GET` _/relationships_

###### A list of all relationships


Groups
======

A container for grouping multiple campaigns together.


### Getting A Group

##### `GET` _/groups/:id_

###### Returns a group object.


### Creating A Group

##### `POST` _/groups_

*Required Params*

* `name`    - a name for your group

*Optional Params*

* `budget`  - a maximum budget for all campaigns in a group
* `admin`   - an array of other options

###### A new JSON group object


### Updating A Group

##### `PUT` _/groups/:id_

###### Returns the updated JSON group object.


### Deleting a Group

##### `DELETE` _/groups/:id_

###### 200 OK - "group has been deleted"

You may not delete groups that already contain campaigns. You will receive the following:

###### 400 ERROR - "can not delete a group that contains campaigns"


### Getting All Campaigns In A Group

##### `GET` _/groups/:id/campaigns_

###### Returns a list of all campaigns for a group.


### Getting All Groups For A Company

##### `GET` _/groups_

###### Returns an array of JSON group objects.


Query Params
------------

### Group Filters

##### `GET` _/groups?filter=:filterType_

*filterType*

* `all` All groups for a company (default)
* `recent` Campaigns that have ended in past 28 days or are scheduled to run in the future
* `current` Campaigns that are currently scheduled to be running

###### Returns a list of all campaigns for a group.


### Returning Stats

##### `GET` _/groups/:id?withStats=_

* `true` returns all available stat keys and values
* `key1:key2:key3` Colon delimited list of top-level stat keys to return values for

###### Returns a group object with a `stats` object


### Getting Tags

`?withTags=true`

###### Returns a list of campaigns each with a `tags` key


### With Allocated Budget

Returns the sum of all campaign budgets in this group.

`_?withAllocatedBudget=true`

###### Returns a group object with an `allocatedBudget` key

*Because this is an expensive operation, returns an error if you request more that 5 groups*


### Admin Overwrite

Skips checks and formatting when saving values to the admin key and just replaces the entire contents with the values passed into the `admin` key

`?rawAdmin=true`


### Delivery Status

Get the current delivery status of all the campaigns in a group

##### `GET` _/groups/:id/campaigns/status_

###### Returns a dictionary of status objects

    {
      "12345": {
        "delivering": false,
        "message": "campaign is PAUSED"
      },
      ...
    }


Campaigns
=========

Container for running ad campaigns on Facebook


### Getting A Campaign

##### `GET` _/campaigns/:id_

###### Returns a campaign object.


### Creating A Campaign

##### `POST` _/campaigns_

###### Returns a new campaign object.


*Required Params*

* `campaignName`
* `type`  - [See Facebook API documention on campaign objective](https://developers.facebook.com/docs/reference/ads-api/adcampaign)
* `socialAccountId`
* `adsAccountId`
* `budget`
* `startDate`
* `stopDate`
* `dataSources`  - list of facebook and twitter data sources

*Optional Params*

* `groupId`
* `admin`         - an array of other options


If a `groupId` is not provided, a new group will be created and the new campaign will be assigned to it.

The `socialAccountId` and `adsAccountId` fields are required only if the campaign will run on Facebook.


*Data Sources*

The `dataSources` param should be passed as a JSON-encoded list of objects.

example:

    [
      {
        "id": "140661225970012",
        "name": "CitizenNet",
        "type": "facebook",
        "url": https://...""
      },
      ...
    ]


### Updating A Campaign

##### `PUT` _/campaigns/:id_

###### Returns an updated campaign object.


### Deleting A Campaign

##### `DELETE` _/campaigns/:id_

###### 200 OK - "campaign deleted"


### Duplicating A Campaign

##### `POST` _/campaigns/:id/duplicate_

###### Returns a new campaign object duplicated from the given id.


### Getting All Campaigns

##### `GET` _/campaigns_

###### Returns a list of campaign objects

*By default only the first 50 campaigns will be returned.*


### Get All Sub Campaigns In A Campaign

Return sub campaign data along with campaign data.

##### `GET` _/campaigns/:id/subCampaigns_

###### Returns a list of all sub campaigns for a campaign.


Query Parameters
----------------

### Returning Deleted Campaigns

`?withDeleted=true`

By default campaigns that have been deleted are not included in results.


### Returning Stats

`?withStats=`

* `true` returns all available stat keys and values
* `key1:key2:key3` Colon delimited list of top-level stat keys to return values for

###### Returns an additional key called `stats`


### Campaign Status

`?withStatus=true`

###### Returns an additional key called `textStatus`


### Social Account Data

Return social account data along with campaign data.

`?withSocialAccount=true`

###### Returns an additional key called `SocialAccount`


### Disable Reclustering

Ensure that a campaign will not recluster and create new targeting after being updated.

`?disableClustering=true`


### Admin Overwrite

Skips checks and formatting when saving values to the admin key and just replaces the entire contents with the values passed into the `admin` key

`?rawAdmin=true`


Campaign Logs
-------------

##### `GET` _/campaigns/:id/logs_

###### Returns a list of log information


Campaign Messages
-----------------

### Getting Messages

_Messages are available to admins only._

##### `GET` _/campaigns/:id/messages_

###### Returns last 25 messages for a campaign


### Creating Messages

##### `POST` _/campaigns/:id/messages_

* `message` the message to be displayed on the campaign dashboard.
* `adminOnly` false - show to everyone, true - show only to other admin users (default).

###### Returns new message object


Refreshing A Campaign
---------------------

##### `POST` _/campaigns/:id/refresh_

###### 200 OK - "campaign and 2 sub campaigns are marked for refresh"

Stopping A Campaign
---------------------

Stop a campaign by setting the end date to now and setting th budget equal to its current spend

##### `POST` _/campaigns/:id/stop_

###### Returns the updated campaign JSON object


Campaign Tags
-------------

### Getting Campaign Tags

##### `GET` _/campaigns/:id?withTags=true_

###### Returns a campaign object with a `tags` key containing a list of tags


### Modifying Campaign Tags

##### `POST` _/campaigns_

##### `PUT` _/campaigns/:id_

`tags` - list of tag objects. This will replace any existing tags.

* `id` - Id of the tag (if not provided, a new tag will be created)
* `tagName` - Name of the tag

Example:

    "tags": [
      {
        "id": 12345
        "tagName": "My Tag Name"
      }
    ]

* _passing null to `tags` will clear all tags for that campaign_
* _not passing `tags` key will not modify any tags_


### Delivery Status

Get the current delivery status of all the sub campaigns in a campaign

##### `GET` _/campaigns/:id/subCampaigns/status_

###### Returns a dictionary of status objects

    {
      "12345": {
        "delivering": false,
        "message": "ad set is PAUSED",
        "errors":[{
          "id": 1,
          "subCampaignId": 2,
          "adId": 3,
          "errorDescId": 1577,
          "createdAt": "2014-09-19 10:40:33",
          "description": "Invalid Page Type FB Error Code : 1487126"
        },
        ...
      },
      ...
    }


Tracking Specs
--------------

### Modifying Tracking Specs

##### `POST` _/campaigns_

##### `PUT` _/campaigns/:id_

`trackingSpecs` - list of tracking specs. This will replace any existing specs.

* _passing null to `trackingSpecs` will clear all specs for that campaign_
* _not passing `trackingSpecs` key will not modify any specs

###### Returns a list of tracking specs

You may pass a text value in the `name` key to give a pixel a custom name

Example:

    [
       {
          "action.type": "offsite_conversion",
          "offsite_pixel": "33333",
          "name": "My Tracking Pixel"
       },
       {
          "action.type": "offsite_conversion",
          "offsite_pixel": "22222",
          "optimize": true
       }
    ]
    
    
### Campaign Migrations

##### `POST` _/campaigns/:id/migrate/{version}_

*Optional Params*

* `version`  - version to migrate campaign to (defaults to newest version)
    
    
Sub Campaigns
=============

A container for programmatically sub-grouping campaigns


### Getting A Sub Campaign

##### `GET` _/subCampaigns/:id_

###### Returns a sub campaign object


### Creating A Sub Campaign

##### `POST` _/subCampaigns_

*Required Params*

* `campaignId`
* `targetingTypeId`
* `startDate`
* `stopDate`

*Optional Params*

* `dataSources`  - list of facebook and twitter data sources
* `admin`         - an array of other options

###### Returns a new sub campaign object

*Data Sources*

The `dataSources` param should be passed as a JSON-encoded list of objects.

example:

    [
      {
        "id": "140661225970012",
        "name": "CitizenNet",
        "type": "facebook",
        "url": https://...""
      },
      ...
    ]


### Updating A Sub Campaign

##### `PUT` _/subCampaigns/:id_

###### Returns an updated sub campaign object


### Deleting A Sub Campaign

##### `DELETE` _/subCampaigns/:id_

###### 200 OK - "sub campaign deleted"


### Duplicating A Sub Campaign

##### `POST` _/subCampaigns/:id/duplicate_

*Optional Params*

* `campaignIds`  - A list of campaign ids. Copies sub campaign to each campaign in list

###### Duplicated sub campaign(s)


### Refreshing a Sub Campaign

##### `POST` _/subCampaigns/:id/refresh_

###### 200 OK - "sub campaign :id marked for refresh"


### Reclustering a Sub Campaign

##### `POST` _/subCampaigns/:id/recluster_

*Optional Params*

* `priority`  - default is `100`

###### 200 OK - "sub campaign :id marked for reclustering"


### Delivery Status

Get the current delivery status of all the ads in a sub campaign

##### `GET` _/subCampaigns/:id/ads/status_

###### Returns a dictionary of status objects

    {
      "12345": {
        "delivering": false,
        "message": "ad is PAUSED",
        "errors":[{
          "id": 1,
          "subCampaignId": 2,
          "adId": 3,
          "errorDescId": 1577,
          "createdAt": "2014-09-19 10:40:33",
          "description": "Invalid Page Type FB Error Code : 1487126"
        },
        ...
      },
      ...
    }


Creatives
=========

Facebook ad creatives


### Getting All Creatives

##### `GET` _/creatives_

###### Returns a list of JSON creative objects.


### Getting A Creative

##### `GET` _/creatives/:id_

###### Returns a JSON creative object.

Multiple ids can be passed in separated by a colon `id1:id2:id3`


### Making A New Creative

##### `POST` _/creatives_

###### Returns a new JSON creative object.


### Duplicating A Creative

##### `POST` _/creatives/:id/duplicate_

Optional

`campaignId` - the new creative will be associated with this new campaign id
`withoutAds` - if true disables generation of new ads if targeting is available.

###### Returns a new copy of the JSON creative object.


### Get all Creatives for a Campaign

##### `GET` _/campaigns/:id/creatives_

* `?withTags=true`  - return tag data in a `tags` key.

###### Returns a list of JSON creative objects.


### Get all Creatives for a Group

##### `GET` _/groups/:id/creatives_

* `?withTags=true`  - return tag data in a `tags` key.

###### Returns a list of JSON creative objects.


### Get A Creative Preview

##### `GET` _/creatives/preview/:key_

`key`   `{ad-type}_{object-id}_{ad-placement}.png`

###### Returns an image or HTML creative preview.


Query Params
------------

### Getting Preview By Hash

Pass `?fromHash=true` to lookup a preview by its hash value


Targeting
=========

Targeting Records
-----------------

### Getting Targeting

##### `GET` _/targeting/:id_

###### Returns a targeting object


### Creating Targeting

##### `POST` _/targeting_

* `campaignId` - required

###### Returns new targeting object


### Updating Targeting

##### `PUT` _/targeting/:id_

###### Returns updated targeting object


### Deleting Targeting

##### `DELETE` _/targeting/:id_

###### 200 OK - "Targeting deleted"


Targeting Groups
----------------

### Getting A Targeting Group

##### `GET` _/targeting/targetingGroups/:id_

###### Returns a targeting group object


### Creating A Targeting Group

##### `POST` _/targeting/targetingGroups_

- `subCampaignId` - or - `targetingId`  : required

###### Returns a new targeting group object


### Updating A Targeting Group

##### `PUT` _/targeting/targetingGroups/:id_

###### Returns an updated targeting group object


### Deleting A Targeting Group

##### `DELETE` _/targeting/targetingGroups/:id_

###### 200 OK - "Targeting group deleted"


<<<<<<< Updated upstream
### Duplicating A Targeting Group

##### `POST` _/targeting/targetingGroups/:id/duplicate_

###### Duplicated targeting group


### Copying A Targeting Group to Campaign(s)

##### `GET` _/targeting/targetingGroups/:id/moveToCampaigns/:comma-delimited-campaign-ids

###### 200 OK - (e.g.) "Importing targeting_group.id: 123456 to these campaigns: 789101,789102; _targeting group name_ to targeting_group.id 123457,_targeting group name_ to targeting_group.id 123458,"


=======
>>>>>>> Stashed changes
### Getting Targeting for a Group

##### `GET` _/groups/:id/targetings_

###### A targeting object and its targeting groups


### Getting Targeting for a Campaign

##### `GET` _/campaigns/:id/targetings_

###### A targeting object and its targeting groups


### Getting Targeting for a Sub Campaign

##### `GET` _/subCampaigns/:id/targetings_

###### A targeting object and its targeting groups


Autocomplete Data
-----------------

### Interest Categories

##### `GET` _/targeting/interests_

- `socialAccountId` : required
- `adsAccountId` : required

###### Returns a list of top-level interest objects


### Interest Search

##### `GET` _/targeting/interests/search_

- `socialAccountId` : required
- `adsAccountId` : required
- `term` : - interest to search for

###### Returns a list of interest objects


### Interest Validation

##### `GET` _/targeting/interests/validate_

- `campaignId`
- `interestList` : string to search for

###### Returns a list of objects

*Valid objects can be assumed to be a valid interest object*

Example:

    [
      {
        "name": "Japan",
        "valid": true,
        "id": 6003700426513,
        "audience_size": 68310258
      },
      {
        "name": "nonexistantkeyword",
        "valid": false
      }
    ]


### Top-Level Targeting Categories

##### `GET` _/targeting/categories_

- `socialAccountId` and `adsAccountId` ... OR ... `campaignId`

###### Returns a list of targeting category objects


### Searching Targeting Categories

##### `GET` _/targeting/categories/:class_

- `socialAccountId` and `adsAccountId` ... OR ... `campaignId`
- `class` : required

* A list of classes can be found in the [Facebook API documentation](https://developers.facebook.com/docs/reference/ads-api/partnercategories#browse-class)

###### Returns a list of targeting category objects


### Getting Locales (languages)

##### `GET` _/targeting/locales_

- `socialAccountId` and `adsAccountId` ... OR ... `campaignId`
- `term` : locale to search for

###### Returns a list of matching locale objects


### Getting Colleges

##### `GET` _/targeting/colleges_

- `socialAccountId` and `adsAccountId` ... OR ... `campaignId`
- `term` : college to search for

###### Returns a list of matching college objects


### Getting College Majors

##### `GET` _/targeting/collegeMajors_

- `socialAccountId` and `adsAccountId` ... OR ... `campaignId`
- `term` : locale to search for

###### Returns a list of matching college major objects


### Getting Workplaces

##### `GET` _/targeting/workplaces_

- `socialAccountId` and `adsAccountId` ... OR ... `campaignId`
- `term` : workplace to search for

###### Returns a list of matching workplace objects


### Getting Job Titles

##### `GET` _/targeting/adworkposition_

- `socialAccountId` and `adsAccountId` ... OR ... `campaignId`
- `term` : job title to search for

###### Returns a list of matching job title objects


### Getting Location Targeting

##### `GET` _/targeting/adgeolocation_

*Required Params*

- `term` : geo location to search for

*Optional Params*

- `location_types` : optional list of location type to filter for `city:region`

###### Returns a list of matching location objects


### Getting Location Targeting in Bulk

##### `GET` _/targeting/adgeolocation/bulk{list}_

- `list` : comma separated list of geo locations to search for

###### Returns a dictionary of valid and invalid objects

Example:  chicago is valid, masoidflisuadfpom is not

    {
       "chicago": {
          "key": "2438177",
          "name": "Chicago, Illinois",
          "type": "city",
          "supports_city": true,
          "supports_region": true,
          "region": "Illinois",
          "region_id": 3856,
          "country_code": "US"
       },
       "masoidflisuadfpom": false
    }

Custom Audiences
----------------

### Getting All Custom Audiences

##### `GET` _/targeting/customAudiences_

- `socialAccountId` : required
- `adsAccountId` : required

###### Returns a list of custom audience objects


### Getting One Custom Audience

##### `GET` _/targeting/customAudiences/:id_

- `socialAccountId` : required
- `adsAccountId` : required

###### Returns a list of custom audience objects


### Creating A Custom Audience

##### `POST` _/targeting/customAudiences_ 

- `socialAccountId` : required
- `adsAccountId` : required

###### Returns a new custom audience object


### Deleting One Custom Audience

##### `DELETE` _/targeting/customAudiences/:id_

- `socialAccountId` : required
- `adsAccountId` : required

###### 200 OK - "Audience :id has been deleted"


Targeting Reach
---------------

### Estimating Targeting Reach

##### `POST` _/targeting/reachEstimate_

- `socialAccountId` : required
- `adsAccountId` : required
- any number of valid Facebook targeting keys and values

###### Facebook estimated reach object

Returns

    {
      "users": 20000,
      "bid_estimations": [
        {
          "location": 3,
          "cpc_min": 30,
          "cpc_median": 50,
          "cpc_max": 70,
          "cpm_min": 30,
          "cpm_median": 50,
          "cpm_max": 70,
          "cpa_min": 298,
          "cpa_median": 498,
          "cpa_max": 660,
        }
      ],
      "estimate_ready": true,
      "imp_estimates": []
    }


Connection Objects
------------------

- `socialAccountId` and `adsAccountId` - or - `campaignId` : required

### Getting All Connection Objects

##### `GET` _/targeting/connectionObjects_

* `?limit`        Limit the number of results returned
* `?type`          Filter results by type `[page, application, events, place, domains]`
* `?clearCache`   Pass `true` to refresh cache from Facebook

###### list of Facebook connection objects


Ads
===

The combination of Creative and Targeting objects creates a Facebook ad

Basics
------


### Getting An Ad

##### `GET` _/ads/:id_

###### A single ad object


### Creating An Ad

##### `POST` _/ads_

* `subCampaignId` - ads must be attached to a sub campaign

###### Returns a new ad object


### Updating An Ad

##### `PUT` _/ads/:id_

###### Returns the updated ad object


### Deleting An Ad

##### `DELETE` _/ads/:id_

###### 200 OK -  "ad deleted"


Multiple Ads
------------

### Gettings All Ads For A Campaign

##### `GET` _/campaigns/:id/ads_

###### Returns a list of ad objects


### Gettings All Ads For A Sub Campaign

##### `GET` _/subCampaigns/:id/ads_

###### Returns a list of ad objects


Notifications
=============

Sends CitizenNet users a notification. Notifications exist in two forms:

- Sent as an email wrapped with the common CitizenNet email theme.
- Displayed in the users notifications center on the website.


Create A Notification
---------------------

##### `POST` _/notifications_ : generate a notification

Parameters
----------

### Required
- `notification_type` - You must specify a notification type for every notification to be sent. This allows for independent configuration of each type.
- One of the following ids:
    - `user_id` send to a single user
    - `company_id` send to everyone in a company
    - `campaign_id` send to everyone associated with a campaign
    - `group_id` send to everyone associated with a group Appropriate business members will also be bcc'd unless sending to a specific user_id.
- `data` - json object of notification display values
    - `heading`
    - `message`
    - `link`
    - `link_text`

Example

    {
      "notification_type": 1,
      "user_id": 123,
      "data": {
        "heading": "Report Generated",
        "message": "Your new report has been generated and ready to view",
        "link": "http://citizennet.com/myReport",
        "link_text": "View Report"
      }
    }

### Optional
- `to` - an array of email addresses These additional email addresses are merged into the TO field along with any other email addresses. If you want to copy yourself on notifications or send and email to a specific address use this field.
- `highlight_message` - If you pass in a campaign_id or group_id a simple formatted block of data with the group or campaign info will be displayed and the following variable will be available as a paragraph inside this block of data.

Notifications set to Admin Only will still send to addresses in the "to" field.

Example

    {
      "data": {
        "to": ["justin@citizennet.com"],
        "highlight_message": "Some addition al text inside a campaign or group block"
      }
    }

##### [How data is mapped to a notification](https://www.evernote.com/shard/s5/sh/ab0db813-c00a-4477-b4f7-28a7a4b9f65d/ee035ef23bb415cb30e559990aa95e54).


Notification Types
--------------------

Campaign types are defined in the MySql table `notification_type` and a record must be created in order to send a notification.
The `notification_type` that should be passed in every call is a primary key from this table.

A unique notification typically is a checksum of: `user_id + company_id + subject + notification_type_id + to + template_data`

By default unique notifications are only sent once. When the `repeat_email` field is `null` a notification will not be sent more than once, otherwise this value is the number of hours before allowing the same notification to be sent again. Notifications will be resent only if another API call is made for a unique notification. For instance, A cron that runs every 10 minutes and attempts to create a notification with an email_repeat of 6 hours will be sent on the first call. All calls after that will be ignored until 6 hours have passed, at which time the email will be resent.


Debugging
---------

Email addresses can be passed in the `debug` param and the notification will only be sent to those emails.

Example

    {
      "debug": ["justin@citizennet.com"]
    }
    
    

Tags
====

Get Tags
--------

##### `GET` _/tags_

Get all tags for the current user's company

### Query Params

- `companyId` super admins may pass a company id to get tags for any company

Get One Tag
-----------

##### `GET` _/tags/:id_

Get a single tag by id for the current user's company


Create a New Tag
----------------

##### `POST` _/tags_

### Query Params

- `tagName`


Update a Tag
------------
##### `PUT` _/tags/:id_

Update the name of a tag

### Params

- tagName

Delete a Tag
-------------------------
Delete a tag from an object

##### `DELETE` _/tags/relationship/:id_

Delete a tag by tag id



Tag Relationships
=================

Get Tag Relationships by Object Type
------------------------------------

##### `GET` _/tags/relationship?for=campaign|creative_

List all tag relationships for a given object type

### Query Params

- for (required) - can be either 'campaign' or 'creative'
- id (optional) - the id of an object, like a campaign id


Create Tag Relationship
-----------------------

##### `POST` _/tags/{tagIds}/relationship_

Relate a tag to a particular object. This will not create __duplicate__ tag relationships (i.e. applying the tag 'content' to the same object more than once).

### Params

- tagIds (required) - this can be a single tag id or a string of tag ids separated by colons. This allows you to apply multiple tags to an object in one request.
- objectId (required) - The id of the object you want to tag. For example, this would be the id of a campaign if you are tagging a campaign object.
- objectType (required) - For now, only __campaign__ and __creative__ are valid options


Update Tag Relationship
-----------------------

##### `PUT` _/tags/{tagIds}/relationship_

Update the tags applied to an object. This removes all existing tags from the object and then applies the new tagIds to the objectId

### Params

- objectId (required) - The id of the object you want to tag. For example, this would be the id of a campaign if you are tagging a campaign object.
- objectType (required) - For now, only __campaign__ and __creative__ are valid options


Metrics
=======

Returns CitizenNet metric information and descriptions


Get Groups
----------

##### `GET` _/metrics_ : returns a list of available metrics from CitizenNet

Returns an array of JSON metric objects.


Search
======

Search for data sources on varius platforms.


### Facebook Pages and Twitter Profiles

##### `GET` _/search_ : returns normalized results based on type

* `type`  - `facebook`, `twitter`, or `all`
* `q`     - string to search for

###### Returns an array of normalized JSON objects


### Response

Example:

    {
      "name": "CitizenNet",
      "link": "https://www.facebook.com/pages/CitizenNet/140661225970012",
      "likes": 3000,
      "category": "Local business",
      "is_community_page": true,
      "id": "140661225970012",
      "picture": "http://graph.facebook.com/140661225970012/picture?type=square",
      "type": "facebook",
      "popularity": 3
    }


### Universal Search

##### `GET` _/search/universal_

* `q`    - string to search for
* `type` - object type to search for `group, campaign, etc...` default: all

Search for multiple types: `?type=group:campaign`

###### Returns a dictionary of normalized JSON objects

Example:

    {
      "groups": [
        {
           "id": "1111",
           "name": "Zombies in America",
           "budget": "0",
           "companyId": "1",
           "createdAt": 2013-07-17 00:36:09
        }
       ],
       "campaigns": [
         {
            "groupName":"Zombies in America",
            "id":"2222",
            "campaignName":"Zombies in America",
            "groupId":"1111",
            "fbCampaignGroupStatus":"ACTIVE",
            "startDate":"2013-07-17 00:36:09",
            "stopDate":"2013-07-19 23:59:59"
         },
        ],
        ...
     }

_If admins exclude the companyId the endpoint will search across companies_


### Search All Users (admin only)

##### `GET` _/search/users_

* `q`    - string to search by username

###### Returns a list of user objects


### Refreshing The Cache

Refreshes the cache for most autocomplete data for a given access token.

##### `POST` _/search/clearCache_

- `socialAccountId` and `adsAccountId` - or - `campaignId` : required

###### 200 OK - "cache has been cleared"


Posts
=====

Facebook page posts.

### Searching For Posts

##### `GET` _/posts/search_

* `campaignId`

Optional

* `pageId`          - return posts from this facebook page id
* `postUrl`         - search for posts based on a facebook page url
* `videoId`         - return video post with this video id

###### A list of facebook page post objects


### Getting App Ad Posts Only

##### `GET` _/posts/search?appAd=true_

###### A list of facebook page post objects eligible to run as an app ad


### Getting A Post Via A Facebook URL

##### `GET` _/posts/search?postUrl=a-facebook-page-post-url_

###### A facebook page post object if found


### Publish Page Posts

##### `POST` _/posts/publish_

Required Fields:

* `pageId`- publish post to this facebook page id
* `campaignId` - campaign that has access to publish posts on the above pageId
* `type` - page post type
    - link
    - photo
    - video
    - mobile-install
    - mobile-engagement
    - desktop-install
    - desktop-engagement
    - status

* `message` - message text for the page post

Notes:
* `callToAction` - specific action call to action JSON (must have a "type" and "value" keys)
* `media` - image /video url not needed for _status_ posts, required for all other types.
* `scheduledPublishTime` - schedule posts for a later time.
* `targeting` - JSON containing targeting spec.
* `thumbnail` - Thumbnail image if required.
* `childAttachments` - Required for _multi-product_ posts

Example :

    [
        {
            "link": "http://lskdjf.com",
            "name": "name",
            "picture": "http://local.wildcat/uploads/1c91c50f962b0b97cb5ebf9ce3964e82.jpeg"
        },
        {
            "link": "http://asdfsadf.com",
            "name": "lame hipster",
            "picture": "http://local.wildcat/uploads/b38e8c6b913eae2ed554e932f3763e22.jpeg"
        }
    ]

Optional

* `published` - create a published/unpublished post (default unpublished)
* `thumbnail` - for video post

### Refresh Page Posts

##### `POST` _/posts/refresh_

* `campaignId` - campaign's access token will be used
* `pageId` or `postId`- cache all posts from the page / cache specified post

Optional

* `refreshAll` - refreshes all the page posts for that pageId
* `app` - refresh only app type posts for that pageId


Batch API Calls
===============

Send batched requests to the API, have them executed, and return a batched result.

##### `POST` _/batch_

* `?batch`  - JSON encoded array of requests to be executed

###### Returns an array of batch results


### Batch Request

* `id` - (optional) provide a unique id to identify each request. An id will be generated if not provided
* `method` - GET, POST, PUT, etc...
* `endpoint` - API endpoint for this request
* `body` - query string of params for POST and PUT requests

Example:

    [
       {
          "id": "unique-id-1",
          "method":"GET",
          "endpoint":"me"
       },
       {
          "id": "unique-id-2",
          "method":"POST",
          "endpoint":"campaigns",
          "body":"campaignId=12345&status=ACTIVE"
       }
    ]


### Batch Response

* `id` - unique id provided in request, or a generated id if not provided
* `status` - 200, 400, 500
* `body` - response content if there is one

Example:

    [
       {
         "id": "unique-id-1",
         "status": 200,
         "body": "{...}"
       },
       {
         "id": "unique-id-2",
         "status": 200,
         "body": "{...}"
       }
    ]
    
    
Reports
=======

##### `GET` _/reports_

Get reports based on query parameters. Parameters are received in the query string.

###### Must specify atleast one of :

* `campaignId` or
* `companyId` or
* `groupId`

###### The following parameters can be used to filter reports based on query params.

* `groupName` - Filter reports with group names like the query param.
* `campaignName` - Filter reports with campaign names like the query param.
* `name` - Filter reports with names like the query param.
* `status` - Can be used to filter reports by status "new" ,"completed" and "generating".
* `type` - Indicates type of report , can be one of the following types
   - Hunt and Refine
   - Project Mustang
   - Audience Report
   - Audience Map Report
   - Group Report
   - CampaignIO
   - Campaign Ad Report
   - Campaign Performance Report

###### Additional Features:

* `paging` - Paging is disabled by default. Refer to paging documentation for more details.
* `orderBy` - Indicates the column on which to sort on . After processing initial sort , reports are also sorted by report.updated_at DESC to show recent reports first.
* `orderDirection` - Indicates the direction of the sort "asc" or "desc". If orderBy is passed in defaults to ascending.
* `name` - Report name can be genralized for specific `types` using templates , refer to report_location table. If there are no templates , defaults to name on disk with underscores.

###### Example :

    [
    {
        "status": "completed",
        "typeId": 1,
        "generatedBy": "ml",
        "campaignId": 10,
        "campaignName": "Sample Campaign",
        "companyName": "Media Report",
        "startDate": null,
        "securityCode": "jbgbfloxo97n",
        "updatedAt": "2013-10-07 09:00:33",
        "displayName": null,
        "id": 12345,
        "createdAt": "2014-02-28 10:13:14",
        "subCampaignId": null,
        "name": "reportName.xls",
        "extension": "xls",
        "companyId": 33,
        "requestedBy": null,
        "reportSize": "9.50 KB",
        "stopDate": null,
        "groupId": 40365,
        "groupName": "Sample group",
        "location": "/home/reportName.xls",
        "type": "Hunt and Refine",
        "subCampaignName": null
    }
    ]

##### `POST` _/reports_

Create a new report.

###### Required fields:

* `companyId` or `groupid` or `campaignId`.
* `type`
* `status`

###### Notes : 
* Reports with status "completed" , must have a valid `type` , `name` and `extension`.
* `name` must match file name on disk.
* `displayName` can be used to store the name displayed to the user.

Response : Created report is returned.

##### `PUT` _/reports_/:id_

Update an existing report.

###### Required fields:
* `id` - id of the report to be updated.

Same validations for creating a report apply.

Response : Updated report is returned.

##### `DELETE` _/reports_/:id_

Delete an existing report.

###### Required fields:
* `id` - id of the report to be updated.

Response :

    {
    "status" : "success"
    }

##### `GET` _/reports/batch_

Batch download reports as a zip.Pass in params as query string.

###### Required fields:
* `reportIds` - List of ids that need to be downloaded as a zip.

Response :
* File with name Reports.zip will be downloaded, with the specified report files zipped.

Event Requests
==============

Requests
--------

### Getting Requests

##### `GET` _/requests/:id_

###### Returns the request object

##### `GET` _/requests_

Filter results:
* `type` - filter by `facebook` or `twitter`
* `requestStatusId` - filter by `requestStatusId`

Request Status Ids:
* 1 - `new`
* 2 - `approved`
* 3 - `created`
* 4 - `needs creative`
* 5 - `complete`
* 6 - `cancelled`

Multiple ids may be passed: `?requestStatusId=1:3:6`

Gets all the requests for a user

###### Returns a paginated list of request objects


### Creating A Request

##### `POST` _/requests_

* `type` - facebook, twitter
* `campaignTypeId` - Campaign flight
* `artistId` - Id of the campaign artist
* `venueId` - Id of the campaign venue
* `startDate` - start date of the campaign
* `stopDate` - stop date of the campaign
* `eventDate` - date of the marketing event
* `budget` - campaign budget
* `targeting` - JSON object of Facebook targeting
* `includesCommission` - 1: commission included in budget, ): not included in budget
* `additionalComments` - and addition text or notes

###### Returns the new request object

### Updating A Request

##### `PUT` _/requests/:id_

###### Returns the updated request object


### Deleting A Request

##### `DELETE` _/requests/:id_

###### `200` "request has been deleted"

### Getting Request Logs

##### `GET` _/requests/:id/logs_

###### Returns a list of JSON log objects


Request Users
-------------

### Getting Users

##### `GET` _/requests/users_

###### Returns a list of user objects

_Non admin users will only receive users within their own group._

##### `GET` _/requests/users/:id_

###### Returns a single user object


Request Roles
-------------

### Adding A Role

##### `POST` _/requests/users/roles_

* `userId`  - user id to apply role to
* `requestGroupId`- group id to assign user to
* `role` - role to apply to user* 

###### Returns a new roles object


### Deleting A Role

##### `DELETE` _/requests/users/roles/:id_

###### `200` - "request role has been deleted"


Request Groups
--------------

### Adding A Group

##### `POST` _/requests/users/groups_

* `name`  - name of the new group

###### Returns a new group object

### Updating A Group

##### `PUT` _/requests/users/groups/:id_

###### Returns the updated group object

Request Artists
---------------

### Getting Artists

##### `GET` _/requests/artists/:id_

###### Returns the artist object

##### `GET` _/requests/artists_

Gets all the artists

###### Returns a paginated list of artist objects

### Creating An Artist

##### `POST` _/requests/artists_

###### Returns the new artist object


### Updating An Artist

##### `PUT` _/requests/artists/:id_

###### Returns the updated artist object


### Deleting An Artist

##### `DELETE` _/requests/artists/:id_

###### `200` "artist has been deleted"


### Searching For An Artist

##### `PUT` _/requests/artists/search_

* `q` - the artist or string to search for

###### Returns a maximum of 50 matching artists


Request Campaign Types
----------------------

### Getting Campaign Types

##### `GET` _/requests/campaignTypes_

###### Returns a list of available campaign types


Schema Forms
----------------------

All endpoints will have this format:

    {
      "data": {}, 
      "forms": [{"type": "form", 
                 "key": <page>, 
                 "form": []}], 
      "schema": {"properties": {}, 
                 "required": []}, 
      "params": {}
    }

### Event Request Schema Form

##### `GET` _/backend/schemas/request_

* `requestIds`

Return the event request schema form.

### Campaign General Schema Form

##### `GET` _/backend/schemas/campaign_

* `groupId`
* `campaignIds`

Return the campaign schema form.

### Group Schema Form

##### `GET` _/backend/schemas/group_

Return the group schema form.

