# Style

### PEP 8
https://www.python.org/dev/peps/pep-0008/

### Anaconda for Sublime Text
* Cmd + Shift + P to bring up the Command Palette
* Click `Package Control: Install Package`
* Search for `Anaconda` and click to install
* Make the following modifications to `Sublime Text -> Preferences -> Package Settings -> Anaconda -> Settings - User`
```
{
    "pep8_max_line_length": 100,
    "pep8_ignore": [
        "E402",
        "W503"
    ],
    "auto_formatting_timeout": 5
}
```
* Line length increased to 100 from the default of 79 which is still PEP 8 acceptable
* Ignore imports not at the top of the file to allow for adding to the import path
* Ignore line break occurred before a binary operator error because it contradicts the PEP 8 guide
* Need to increase auto formatting timeout for it to work

### Enumerated Fields
* If new values will be added frequently, create a new table holding all values for the field and link it with a foreign key. Otherwise, just store the value directly.
* Use `py/cnenums.py` to create variables for all field values and refer to the values using the variables in code.
```
class TableEnum():
    class Field():
        VALUE1 = "VALUE1"
        VALUE2 = "VALUE2"
        VALUE3 = "VALUE3"
```

### Line Breaks
* When breaking lines in function params, strings, and objects use one indent each line
* Function params and conditional expression clauses should either be all on one line or separated one on each line
```
res = function(
    var1,
    var2,
    var3
)

def long_function_name(
        var_one,
        var_two,
        var_three,
        var_four):
    print(var_one)

string = (
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
    "Sed non erat id elit porta finibus eget a elit. "
    "Maecenas ut vehicula ex, sed mollis arcu."
)

obj = {
    "field1": "value1",
    "field2": "value2",
    "field3": "value3"
}
```
* Line breaks in conditional expressions should be double indented so it doesn't line up with the body
```
if (this_is_one_thing
        and that_is_another_thing):
    do_something()
```

# Standards

### API
* Use `raise CNException("An error occurred", status_code)` for sending errors in an API endpoint
* Data input and output should be in snake_case

### Flex Forms
* When modifying schema fields, use:
```
helpers.set_schema_field(
    payload,
    ["key1", "key2", "key3"],
    value
)
```
* When modifying form fields, use:
```
form_modifications = [
    {
        "predicate": lambda item: (
            item.get("key") == "Key"
            and cond
        ),
        "operation": lambda item: func(item)
    },
    {
        "predicate": lambda item: (
            item.get("title") == "Title"
            and item.get("type") == "component"
        ),
        "operation": helpers.set_field(
            "condition",
            "false"
        )
    }
]
payload.change_many_form_values(form_modifications)
```
* When setting diff fields, use:
```
diff_fields = {
    "type": {
        "schema": ["schema1", "schema2"],
        "data": ["data1", "data2"],
        "form": ["form1", "form2"]
    }
}
helpers.set_diff(payload, update_schema, diff_fields, in_place=True)
```
