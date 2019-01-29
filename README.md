# BaltimoreTechWebsite

This website is statically generated using Jekyll.

To edit the website locally:

1. Get Ruby running on your computer
2. Install bundler `gem install bundler`
3. Clone this repository
4. Change directory to cloned repo directory and run `bundle install`

Running website locally:

1. bundle exec jekyll serve
2. http://localhost:4000/

_Consider replace favicon.ico with your company icon._

# Google Maps API

To replace Google Maps API key, open **\_config.yml**

> google_maps_api: [insert your key here without the braces]

You will need to enable both **Maps JavaScript API** and **Geocoding API**.

# JSON/YML files

There are a number of data files that populate the content of the site. The JSON files and their expected formats/inputs are described here.

## Events: \_data/events/{year}/{month}/{name}.yml

```
start: "2019-01-24T14:15:00Z"
end: "2019-01-29T15:45:00Z"
location: "City Garage, Baltimore"
title: "Your event title"
type: "class | meetup | event"
summary: "Describe your event..."
link: "https://link-to-your-event.com"

```

## Organizations: \_data/organizations/{name}.yml

```
image: fearless.png
name: Fearless
location: Southeast Baltimore
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
picture: people_1.jpg
resume_url: "https://link-to-resume.com"
```

## Upcoming events: \_data/upcoming-events.json

```
{
  "id": "1",
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

Update your social media urls and text here

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
