Metrics
=======

## Inputs

### Requested Fields

 * `ids` _Comma-separated list_ ids from `metrics` table.
 * `dimension` _Comma-sparated list_ ids from `metrics` table.  Stats will be aggregated among unique sets of dimensions.

### Campaigns

 * `company_id` _Comma-separated list_ companies
 * `group_id` _Comma-separated list_ groups
 * `campaign_id` _Comma-separated list_ campaigns

#### Campaign Selection

 * `group_end_after` _timestamp_ Groups with a campaign with stop date after unix timestamp
 * `group_start_after` _timestamp_ Groups with a campaign with start date after unix timestamp
 * `group_start_soon` _timestamp_ Groups with a campaign starting within given number of days
 * `group_status` 

Value | Groups with Campaign...
------|-------------------------
_running_, _nowrunning_ | start date before current time, stop date after current time
_endingtoday_ | stop date between beginning and end of current day
_mostrecent_ | stop date within last 7 days
_missingcreative_ | No creative objects linked
_havealerts_ | start date in past, stop any time after 1 month ago (Appears to be broken)
_startingsoon_, _upcoming_ | start date after current time, and within 7 days
_deleted_ | deleted
_all_ | not deleted

* `campaign_status`

Value |  Campaigns...
------ | --------
_all_ | All
_notexpired_ | Have not reached stop date, or have stats
_running_ | Current time between start and stop date, with stats, and not paused
_upcoming_ | Start time in future
_not running_ | Current time between start and stop, with no stats
_expired_ | All (appears broken)

### Filtering

 * `filters` JSON-encoded array of filters
 
 #### Filter
 
  * `id` | Single id from `metrics` table
  * `only_include` | _Array_ Include any records matching any items in list
  * `partial_exclude` | _Array_ Exclude any records matching only items in list (Items without values not specified in list)
  * `any_exclude` | _Array_ Exclude any record matching any itmes in list

### Date Range

 * `start_date` _Timestamp_
 * `stop_date` _Timestamp_
 * `weekstart` _sun_ (default), _mon_

### Cache Control

 * `clearcache` Delete cache for this call (other callers will not get cached results, useful if broken)
 * `update` Refresh cache for this call, and request stats be updated for specified groups
 * `refreshcache` Update cache without deleting existing cache (other callers will still get cache before updated)
 * `forcecache` Enforce a cache be written for this call, even if fast

### Other/Debugging

 * `timeout` Amount of time to wait for Stats API
 * `forcespark` Force use of Spark database
 * `disablespark` Disable use of Spark database
 * `nofill` Do not fill in missing times (with time dimension) when empty
 * `human` Return header with stat name instead of `metrics` table id
 * `humantime` Return time dimension human-readable instead of timestamp

### Notes

 * Timestamps are in seconds since epoch

## Output

### CSV Format

 * Header line with each `ids` and `dimension`
 * Data lines corresponding, one for each unique set of dimensions
 * List and Object data JSON-formatted

### Notes
 * Timestamps are in milliseconds since epoch
