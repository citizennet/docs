Validation
==========

> Simple validation for classes using a trait and a .yml file

This process uses Propel validators behind the scene. Basic validator classes can be found in the propel plugin folder.
Put all custom validators in the `lib/cnClasses/ORM/` folder.

For more about propel validation: <http://propelorm.org/documentation/05-validators.html>


YML Configuration
-----------------

Validation rules are arranged by class and then column / property. Each property can have it's own set of validation rules.
**All values are expressed using camelCase**

    rules:

      class:
        column:
          required: true
          dataType: json

The validation rules consist of two parts separated by a colon

* validator rule class to use
* validator rule's value


Usage
-----

Add the trait to your class:

    use cnClasses\ORM\Validation;

Validate all fields in YML:

    $jerk = new Jerk();
    
    if(false === $jerk->isValid()) {
      echo $jerk->validationMessages();
    }

Validate a single field:

    $jerk->isValid(['fieldToValidate']);

Locations
---------

### YML
`lib/cnClasses/validation/validation.yml`

### Trait
`lib/cnClasses/ORM/validation.php`

### Validators
`lib/cnClasses/ORM/`



Logging
============

General purpose logger to log to rsyslog.

All msgs are logged to /var/log/symfony/all.log unless you configure rsyslog differently via /etc/rsyslog.d/symfony.conf

*note* debug level is noop, unless app is in verbose mode

Instructions:
--------------
Once you use the trait in your class:

`use CN\Log\Logger`

You can pass a string or sprintf style:

`$this->info('test');`

`$this->debug('test %d %d %s', 123, 456, '...');`