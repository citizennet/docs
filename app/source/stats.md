
# Stats API

    https://citizennet.com/api/stats/

All responses are in JSON.  API responses are GZIP if requested by client.

## Responses

400 Bad Request: Unsuccessful API call

401 Unauthorized: Not authorized to use API

    {
      "status": "error",
      "errors": [
        {
         ...
        }
      ]
    }

200 OK: Successful Api call

    {
       "status": "success",
       "meta": [
        {
           { “Some meta data, descriptions, counts” }
        }
       "data": [
        {
          { The data you were looking for }
        }
      ]
    }

## Authentication

There are three ways to authenticate

 - access_token=XXXX - [Citizennet API Token](/settings/api)
 - dash cookie - returned from an interactive login to citizennet.com.  Preferred method for web apps.
 - userid=XXXX (Citizennet Devlopers only)

To test your access, GET

    https://citizennet.com/api/verify_credentials
    




# Batched Results

To get multiple data sets in a single call, requests can be batched. This is done with passing a JSON-encoded array of requests in the batch POST paramater (can be either *multipart/form-data* or *application/x-www-form-urlencoded*).

    curl \
        -F 'access_token=…' \
        -F 'batch=[{"relative_url":"/time/facebookads/campaign/1","name":"First"},{"relative_url":"/time/fbinsights/1/page_impressions/lifetime"}]' \
        https://citizennet.com/api/stats/batch

The results will be returned as an array of results, in the order requested in the JSON batch object.

    [
      {
        "code": 200,
        "headers":[ { "name": "Content-Type", "value": "application/json" } ], 
        "body": {"data": [{...}]},
        "name": "First"
      },
      {
        "code": 200,
        "headers":[ { "name":"Content-Type", "value":"application/json"} ],
        "body": {"data": [{...}]},
        "name": "Unnamed"
      }
    ]





# Metrics API

    https://citizennet.com/api/metrics

The Metrics API is a wrapper around the Stats API, merging results and
returning data in a CSV format.

##Groups
Comma-separated list of groups to query

    ?group_id=1,2,3

##IDs
Comma-separated list of metrics to query.  Can add `_change_7` to get percentage change over specified days.

    ?ids=23,34,56

##Dimensions
Comma-separated list of metrics used for grouping

    ?dimension=56,46,345

##Date Range
Epoch Seconds

    ?start_date=1388707246&stop_date=1389916834

##Update Data
Re-query to the source (Facebook, etc.) for the latest data.  This is slow

    ?update=1

##Refresh Cache
Update the existing Metrics API intermediate cache with Citizennet's latest additional data

    ?refreshcache=1


##Clear Cache
Wipe out the Metcrics API intermediate cache and return Citizennet's newest copy of the data from Stats API

    ?clearcache=1

##Filling empty dimensions
For smaller results, dimensions without data will not be auto-filled

    ?nofill=1

##Pre-Cache
To warm the cache for future requests

    ?precache=1

##Human
Return named column headers and human-readable dates

    ?human=1





# Query String Parameters

## Limit
Limit the number of results returned.  If omitted, all records are returned.

    ?limit=25

## Skip
Paginate the results returned.  If omitted, all records are returned.

    ?skip=25

## Date Range
Filters results based on a given date or date range.  Seconds since epoch.

    ?dates=1352359716:1353396516 	data between two dates
    ?dates=1353396516:			data from this date
    ?dates=:1352359716			data until this date

## Sort
Sort the result set by a given field before returning it. If omitted, defaults to desc.
{ asc, desc }

    ?sort=clicks:desc

## Group By
Sum the data set based on a particular field.  Setting this on a time query will convert the request to a Batched Results query for each of the specified group valid for the query.  A second field can be added e.g. `fbcreative:creative`.

    ?group_by=campaign
              subcampaign
              group
              ad
              creative
              fbcreative
              targeting
              label
              targetingtype

## Fields
In grouped queries, should a group with no data be returned?

    ?includeempty=1

## Fields
Returns a specific subset of stats that includes only the fields specified.  If not specified all results be returned.  Items nested inside a mapping can be pulled out with dot notation

    ?fields=clicks:impressions:frequency:actions.like

## Filter
Filter results by appling an operator and value to specific field in each
row.  Format is `field:operator:value`.  Operators can be `eq, ne, gt, gte,
ge, lt, lte, le` on numeric values, or `strin` on string values.  Multiple
filter values will all be used.

    ?filter=impressions:gt:3000

## Dollars
Return financial data as dollars instead of cents.  (Warning!  Data only, campaign configuration parameters will be returned as-is (cents)).

    ?dollars=1

## Highcharts
Return the specified fields (required) as high-charts compatible arrays.  x (time in miliiseconds), y (field value), name (field name)

    ?highcharts=1

##Pretty
Returns the data set pretty printed for easy display.  Adds tabs / whitespace in the JSON.

    ?pretty=true

## Real-time
If applicable, refresh the stats from the source before returning data.

    ?update=true

## Flatten
Certain stats (textclass, facebookadplacement), have fully-contained subsections per entry.  This will pull these out individually, to give a separate, top-level entry per-timestamp for each logical unit of data.

    ?flatten=true

## No Metadata
Disable returning metadata associated with each stats entry (Name, Label, etc...)

    ?nometa=true





# Table Based Data

This end point returns mostly lifetime based stats. (good for tables)

    https://citizennet.com/api/stats/table/

## Methods

### Facebook Ads

Stats on Facebook Ad Campaigns run by Citizennet.

    /facebookads
      /company/:id
      /group/:id
      /campaign/:id
      /subcampaign/:id
      /ad/:id

### Facebook Ad Placement

Stats on Facebook Ad Campaigns run by Citizennet broken down by placement.

    /facebookadplacement/
      /company/:id
      /group/:id
      /campaign/:id
      /subcampaign/:id
      /ad/:id

### Facebook Age/Gender

Stats on Facebook Ad Campaigns run by Citizennet broken down by age & gender.

    /facebookagegender/
      /company/:id
      /group/:id
      /campaign/:id
      /subcampaign/:id
      /ad/:id

### Facebook Post Data

Citizennet's cached stats on individual Facebook Posts.

    /fbpostdata/
      /group/:id
      /campaign/:id
      /subcampaign/:id

### Facebook Insights

Citizennet's cached Facebook Insights stats.

    /fbinsights/
      /group/:id/:insightid
      /fbpage/:id/:insightid

### Demographics

Citizennet's demographic stats

    /demographics/
      /group/:id
      /subcampaign/:id

### Keyword Stats

    /keywordstats
      /group/:id
      /campaign/:id
      /subcampaign/:id
      /creative/:id

### Campaign Log

    /campaignlog/
      /campaign/:id
      /subcampaign/:id

### Audience Map

    /audiencemap/group/:id

### Targeting Groups

    /targetinggroups/group/:id

### CitizenNet City Populations

    /cncitypop

### Audience Reports

    /audiencereports/
      /campaign/:id





# Time Based Data

This end point returns data as a time series of data points. (good for graphing)

    https://citizennet.com/api/stats/time/


## Extra Query Params

### Window
Can be applied to stats that are calculated in a certain time window such as CTR.  Units is days.

    ?window=28

### Period
Time interval that should be applied to stat result set. If omitted, default is native period of that stat.
{ week, day, hour, lifetime }

    ?period=day

### Day-over-day
Return stats showing percentage change over specified number of days.  Requires period.

    ?daychange=7

### Time Zone
Time Zone that Period stats should be split upon.  Defaults to Pacific Time.  Give in Olson normalized name.

    ?timezone=US/Eastern

## Methods

### Facebook Ads

Stats on Facebook Ad Campaigns run by Citizennet.

    /facebookads
       /company/:id
       /group/:id
       /campaign/:id
       /subcampaign/:id
       /fbcreative/:id
       /creative/:id
       /targetinggroup/:id
       /ad/:id

### Facebook Ad Placement

Stats on Facebook Ad Campaigns run by Citizennet broken down by placement.

    /facebookadplacement/
      /company/:id
      /group/:id
      /campaign/:id
      /subcampaign/:id
      /ad/:id

### Facebook Age/Gender

Stats on Facebook Ad Campaigns run by Citizennet broken down by age & gender.

    /facebookagegender/
      /company/:id
      /group/:id
      /campaign/:id
      /subcampaign/:id
      /ad/:id

### Facebook Insights

Citizennet's cached Facebook Insights stats.

    /fbinsights/fbpage/:pageid/:insightid

### Keyword historical stats

Counts, analytics of keyword tweets/posts.

    /kwhistory/:kw

### Facebook Page historical stats

Counts, analytics of posts/likes for a Facebook Page.

    /fbhistory/:fb

### Text Classifier

    /textclass/subcampaign/:id

## Examples

Facebook Insights

    https://citizennet.com/api/stats/time/fbinsights/fbpage/115973688451232/posts
    https://citizennet.com/api/stats/time/fbinsights/fbpage/115973688451232/124225111074767/post_impressions/lifetime


