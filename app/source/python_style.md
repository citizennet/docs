## PEP 8
https://www.python.org/dev/peps/pep-0008/

## Anaconda for Sublime Text
* Cmd + Shift + P to bring up the Command Palette
* Click `Package Control: Install Package`
* Search for `Anaconda` and click to install
* Make the following modification to `Sublime Text -> Preferences -> Package Settings -> Anaconda -> Settings - User`
```
{
    "pep8_max_line_length": 100,
    "pep8_ignore": [
        "E402"
    ],
    "auto_formatting_timeout": 5
}
```
* Line length increased to 100 from the default of 79 which is still PEP 8 acceptable
* Ignore imports not at the top of the file to allow for adding to the import path
* Need to increase auto formatting timeout for it to work

## Enumerated Fields
* If new values will be added frequently, create a new table holding all values for the field and link it with a foreign key. Otherwise, just store the value directly.
* Use `py/cnenums.py` to create variables for all field values and refer to the values using the variables in code.
```
class TableEnum():
    class Field():
        VALUE1 = "VALUE1"
        VALUE2 = "VALUE2"
        VALUE3 = "VALUE3"
```
## Line Breaks
* When breaking lines in function params, strings, and objects use one indent each line
* Function params and conditional expression clauses should either be all on one line or separated one on each line
```
res = function(
    var1,
    var2,
    var3
)

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
