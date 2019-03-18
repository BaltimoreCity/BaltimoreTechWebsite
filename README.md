# BaltimoreTechWebsite

Baltimore Tech is a community resource that enables businesses and individuals to connect online and drive offline interactions. Our team creates programming and infrastructure needed to develop, grow and support Baltimore's innovation community. Baltimore Tech is powered by Betamore, a non-profit whose mission is to make Baltimore a leading global entrepreneurship destination and Fearless, a full stack digital services firm in Baltimore.

# Installation

This website is statically generated using Jekyll.

To edit the website locally:

1. Get Ruby running on your computer
2. Install bundler `gem install bundler`
3. Clone this repository
4. Change directory to cloned repo directory and run `bundle install`

Running website locally:

1. `bundle exec jekyll serve`
2. Visit http://localhost:4000/

# Google Maps API

To replace Google Maps API key, open **\_config.yml**

> google_maps_api: [insert your key here without the braces]

You will need to enable both **Maps JavaScript API** and **Geocoding API**. In most cases you can enter the long/lat coordinates directly to avoid using **Geocoding API**

# Workflow

Steps to get started working on this project

1. Fork the repository from [here](https://github.com/BaltimoreCity/BaltimoreTechWebsite)
2. Make a branch for the feature you'll be working on
3. Make changes and add messages for your commits
4. Issue a pull request with description of the changes to get it merged into the base

# Location format for geocoding

The suggested location format for geocoding is as follow

`House Number, Street Direction, Street Name, Street Suffix, City, State, Zip, Country`

However something as simple as `City Garage, Baltimore` should work fine as well.

# JSON/YML files

There are a number of data files that populate the content of the site. The JSON files and their expected formats/inputs are described here.

## Meetups: \_data/meetups/{slug}.yml

To add a meetup, create a named **yml** file with the following structure and drop it under \_data/meetups/, the url field is used to fetch future events for the meetup automatically into the site later on.

**Meetup data structure**

```
name: Baltimore Black Techies Meetup
url: https://www.meetup.com/Baltimore-Black-Techies-Meetup/
description: |-
  Black + Techie = Us. We're HYPED to host Baltimore's first Black coding meet up! Join us every Thursday at Impact Hub Baltimore (10 E North Ave) to learn and code with others. Whether you're an experienced coder or ready to take your first course, we invite you to join us.
```

## Events: \_data/events/{year}/{month}/{name}.yml

Normally events are imported from meetup.com using records in meetups folder. To add an event manually, create a named **yml** file with the following structure and drop it under \_data/events/ followed
by the event happening date year(YYYY)/month(M).

`Type` should be either one of `class` | `meetup` | `event`

**Event data structure**

```
local_date: "2019-01-24"
local_time: "15:45"
venue:
  address_1: 7050 Hi Tech Drive, Suite 102
  city: Hanover
  country: us
  id: 25082635
  lat: 39.19224548339844
  localized_country_name: USA
  lon: -76.72801971435547
  name: Onyx Point
  repinned: true
  state: MD
  zip: '21206'
name: "Your event title"
type: "meetup"
description: "Describe your event..."
link: "https://link-to-your-event.com"
visibility: public
```

## Organizations: \_data/organizations/{name}.yml

To add an organization, create a named **yml** file with the following structure and drop it under `\_data/organizations`.
You are advised to drop the `logo/image` to `/uploads/orgs folder`. The recommended image size is no less than 100x100 in pixel.

**Organization data structure**

```
image: /uploads/fearless.png
name: Fearless
location: Southeast Baltimore, Baltimore
coordinate:
  lat: 39.2700572
  lng: -76.599672
description:
  "We're constantly pushing the envelope so that we don’t just stay ahead
  of the tech industry: we drive it forward. Fearless was founded in 2009 to be a
  different kind of digital services company, so we’ve made it our mission to do more
  than just build software. We create tools that empower users and change lives. We're
  committed to building software with a soul, so we don't measure our success just
  in profits, but by our impact."
url: "https://org-homepage.com"

```

## Peoples: \_data/peoples/{first_character_of_name}/{name}.yml

To add a person profile, create a named **yml** file with the following structure and drop it under `\_data/peoples/first_character_of_name`.
You are advised to drop the pictures to `/uploads/peoples/img` and resume to `/uploads/peoples/resume`. The recommended image size is no less than 160x160 in pixel.

`Type` should be either one of `full-time` | `part-time` | `remote`

**People data structure**

```
display_name: FanArtReview Reviews
first_name: FanArtReview
last_name: Reviews
name: Calvin Han
type: full-time
profession: Full-Stack Developer | Photographer
education: B.E. in Engineering from Johns Hopkins University
skills:
  - React
  - Javascript
  - HTML5 / CSS3
  - SQL
  - Heroku
  - Ruby on Rails
  - jQuery
  - Git
picture: "/uploads/peoples/img/calvin-han.png"
resume_url: "/uploads/peoples/resume/calvin-han.pdf"
general info:
  bio: Product designer who prefers the command line.
  location: Baltimore City
  neighborhood: Fells Point
  name: Alan Clark
links:
  twitter: https://twitter.com/Adam_McClard
  facebook: http://www.facebook.com/ORiGO.GAMES
  github: http://github.com/aclarkk
  linkedin: http://www.linkedin.com/in/adammcclard
  website: http://www.or1go.com
```

## Social links: \_data/socials.json

Update your social media links and description in `_data/socials.json`

```
{
  "url": "https://facebook.com",
  "icon": "fab fa-facebook-f",
  "text": "Friend us on Facebook to find out about the latest news, community events, jobs and upcoming training opportunities"
}
```

## Navs : \_data/navs.json

These data are used to render navigation menu. Most likely you won't need to edit this file.

```
{
  "path": "/explore",
  "title": "Explore"
}
```
