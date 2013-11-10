Apple Inventory Monitor
=============

Apple is [shutting down](http://appleinsider.com/articles/13/11/06/apple-shuts-down-web-based-product-inventory-tracking-tool) inventory monitoring sites.  Here is some simple customizable code that will do it for you.

I made this script as a way to gift a new iPhone 5S for a friend.  Although iPhones were in very high demand, I got hers in less than a day.

With this script, you can see shipments come in realtime.  It's scary how quickly the phones get snapped up.

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
