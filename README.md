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

You will need to enable both **Maps JavaScript API** and **Geocoding API**.

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

## Events: \_data/events/{year}/{month}/{name}.yml

To add an event, create a named **yml** file with the following structure and drop it under \_data/events/ followed
by the event happening date year(YYYY)/month(M).

`Type` should be either one of `class` | `meetup` | `event`

**Event data structure**

```
start: "2019-01-24T14:15:00Z"
end: "2019-01-29T15:45:00Z"
location: "City Garage, Baltimore"
title: "Your event title"
type: "meetup"
summary: "Describe your event..."
link: "https://link-to-your-event.com"
```

## Organizations: \_data/organizations/{name}.yml

To add an organization, create a named **yml** file with the following structure and drop it under `\_data/organizations`.
You are advised to drop the `logo/image` to `/uploads/orgs folder`. The recommended image size is no less than 100x100 in pixel.

**Organization data structure**

```
image: /uploads/fearless.png
name: Fearless
location: Southeast Baltimore, Baltimore
description:
  "We're constantly pushing the envelope so that we don’t just stay ahead
  of the tech industry: we drive it forward. Fearless was founded in 2009 to be a
  different kind of digital services company, so we’ve made it our mission to do more
  than just build software. We create tools that empower users and change lives. We're
  committed to building software with a soul, so we don't measure our success just
  in profits, but by our impact."
url: "https://org-homepage.com"

```

## Peoples: \_data/peoples/{name}.yml

To add a person profile, create a named **yml** file with the following structure and drop it under `\_data/peoples`.
You are advised to drop the pictures to `/uploads/peoples/img` and resume to `/uploads/peoples/resume`. The recommended image size is no less than 160x160 in pixel.

`Type` should be either one of `full-time` | `part-time` | `remote`

**People data structure**

```
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
```

## Upcoming events: \_data/upcoming-events.json

To edit upcoming events, edit json file located in `_data/upcoming-events.json`

`Type` should be either one of `class` | `meetup` | `event`

**Upcoming event data structure**

```
{
  "type": "meetup",
  "title": "Tech Meetup",
  "location": "Spark Baltimore",
  "date": "Tue, Oct 9th",
  "time": "6:00pm - 9:00pm",
  "summary": "The Baltimore Tech Meetup gathers the broader tech community for learning, networking and sharing. The meetup will serve as a roundup of the area's innovation scene and a meeting place to foster connections between entrepreneurs, developers, designers, founders, investors, companies, educators, technologists and other interested parties.",
  "link": "https://link-to-your-event.com"
}
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
