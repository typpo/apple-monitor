Apple Inventory Monitor
=============

Here's some simple customizable code that will let you monitor realtime Apple inventory in your area.  Watch for alerts in your console or have it text you when phones become available.

## Setup and Usage

`npm install` to install dependencies.  Then, `node apple.js zipcode [phone_number]`.

## Examples

`node apple.js 94043` to monitor stores within driving distance from Mountain View.

`watch -n 30 "node apple.js 94043"` to check every 30 seconds.

Output:

    $ node apple.js 94043
    >> phone available: iphone 5s silver verizon 16gb @ Apple Store, Palo Alto

## MIT License

Copyright (c) 2013 Ian Webster (ianww.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
