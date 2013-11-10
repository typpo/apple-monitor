Apple Inventory Monitor
=============

Apple inventory monitoring sites have received cease-and-desists.  In my experience, they also cache too aggressively.  Here is a customizable open-source solution.

I made this script as a way to gift a new iPhone 5S for a friend.  Although iPhones were in very high demand, I got hers in less than a day.

With this script, you can see shipments come in realtime.  It's scary how quickly the phones get snapped up.

## Setup

`npm install` to install dependencies.

## Usage

`node apple.js zipcode [phone_number]`

eg.

`node apple.js 94043` to monitor stores within driving distance from Mountain View.

`watch -n 30 "node apple.js 94043"` to check every 30 seconds.
